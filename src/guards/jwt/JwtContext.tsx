import { createContext, useEffect, useReducer } from 'react';

import axios from 'src/utils/axios';
import { isValidToken, setSession } from './Jwt';

// ----------------------------------------------------------------------
export interface InitialStateType {
  isAuthenticated: boolean;
  isInitialized?: boolean;
  user?: any | null | undefined;
}

const initialState: InitialStateType = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};


const handlers: any = {
  INITIALIZE: (state: InitialStateType, action: any) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: InitialStateType, action: any) => {
    const { user, groups } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: InitialStateType) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state: InitialStateType, action: any) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state: InitialStateType, action: any) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext<any | null>({
  ...initialState,
  platform: 'JWT',
  signup: () => Promise.resolve(),
  signin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

function AuthProvider({ children }: { children: React.ReactElement }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {

      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const refreshToken = window.localStorage.getItem('refreshToken');
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken, refreshToken);
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: null,
            },
          });
        } else {
          try {
            await handleRefreshToken();
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user: null,
              },
            });
          }
          catch (err) {
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: false,
                user: null,
              },
            });
          }
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signin = async (username: string, password: string) => {
    const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_BASE_URL}/api/token/`, {
      username,
      password,
    });
    const { access, refresh, user } = response.data;
    setSession(access, refresh);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });

  };

  const handleRefreshToken = async () => {
    const refreshToken = window.localStorage.getItem('refreshToken');
    console.log("Token was refreshed");
    const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_BASE_URL}/api/token/refresh/`, {
      refresh: refreshToken,
    });
    const { access } = response.data;
    if (access) {
      setSession(access, refreshToken);
    }
    else {
      setSession(null, null);
      throw new Error("Refresh token expired")
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null, null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        signin,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

