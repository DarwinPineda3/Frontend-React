import { createContext, useEffect, useReducer } from 'react';
import axios from 'src/utils/axios';
import CryptoJS from 'crypto-js';  

type User = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  groups: string;
  tenant: string | null;
};

type InitialStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
};

const reducer = (state: InitialStateType, action: any): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const initialState: InitialStateType = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const AuthContext = createContext<any | null>(null);

const base64UrlEncode = (input: string) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(input))
    .replace(/=/g, '')  
    .replace(/\+/g, '-') 
    .replace(/\//g, '_'); 
};

const base64UrlDecode = (input: string) => {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const decoded = CryptoJS.enc.Base64.parse(base64).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decoded);
};

const sign = (payload: any, secretKey: string, expiresIn: number) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + expiresIn;

  payload.exp = expiresAt;

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const signature = CryptoJS.HmacSHA256(signingInput, secretKey)
    .toString(CryptoJS.enc.Base64)
    .replace(/=/g, '') 
    .replace(/\+/g, '-') 
    .replace(/\//g, '_'); 

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

const verify = (token: string, secretKey: string) => {
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const expectedSignature = CryptoJS.HmacSHA256(signingInput, secretKey)
    .toString(CryptoJS.enc.Base64)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return signature === expectedSignature;
};

const decodeToken = (token: string) => {
  const [encodedHeader, encodedPayload] = token.split('.');
  return base64UrlDecode(encodedPayload);  
};

const handleRefreshToken = async () => {
  const refreshToken = window.localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const decodedRefreshToken = decodeToken(refreshToken);

    const newAccessToken = sign(decodedRefreshToken, 'secretKey', 3600);
    const newRefreshToken = sign(decodedRefreshToken, 'secretKey', 604800); 

    setSession(newAccessToken, newRefreshToken);

    return newAccessToken;
  } catch (error) {
    console.error('Failed to refresh access token', error);
    throw new Error('Failed to refresh access token');
  }
};

const setSession = (accessToken: string | null, refreshToken: string | null) => {
  if (accessToken) {
    window.localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }

  if (refreshToken) {
    window.localStorage.setItem('refreshToken', refreshToken);
  } else {
    window.localStorage.removeItem('refreshToken');
  }
};

function AuthProvider({ children }: { children: React.ReactElement }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      const authRoutes = ['/auth', '/404'];
      if (authRoutes.some(route => window.location.pathname.includes(route))) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
        return;
      }

      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const refreshToken = window.localStorage.getItem('refreshToken');

        if (accessToken && verify(accessToken, 'secretKey')) {
          setSession(accessToken, refreshToken);
          const decoded = decodeToken(accessToken); 
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: {
                user_id: decoded.user_id,
                first_name: decoded.first_name,
                last_name: decoded.last_name,
                email: decoded.email,
                groups: decoded.groups,
                tenant: decoded.tenant || null, 
              },
            },
          });
        } else if (refreshToken) {
          await handleRefreshToken();
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: null,
            },
          });
        } else {
          handleUnauthenticated();
        }
      } catch (err) {
        console.error('Authentication initialization failed:', err);
        handleUnauthenticated();
      }
    };

    initialize();
  }, [dispatch]);

  const signin = async (username: string, password: string) => {
    if (username === 'user@example.com' && password === 'password123') {
      const payload = {
        user_id: '12345',
        first_name: 'John',
        last_name: 'Doe',
        email: 'user@example.com',
        groups: 'user, admin, Administrator, Scan360, CyberGuard, Defender',
        tenant: 'tenant1',
      };

      const accessToken = sign(payload, 'secretKey', 3600); 
      const refreshToken = sign(payload, 'secretKey', 604800); 

      setSession(accessToken, refreshToken);

      dispatch({
        type: 'LOGIN',
        payload: {
          user: payload,
        },
      });
    } else {
      throw new Error('Credenciales inválidas');
    }
  };

  const handleUnauthenticated = () => {
    setSession(null, null);
    dispatch({
      type: 'INITIALIZE',
      payload: {
        isAuthenticated: false,
        user: null,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
export { handleRefreshToken };  
