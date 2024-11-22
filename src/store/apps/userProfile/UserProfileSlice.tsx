import { createSlice } from '@reduxjs/toolkit';
import { getTenant } from 'src/guards/jwt/Jwt';
import { AppDispatch } from 'src/store/Store';
import axios from 'src/utils/axios';

// const API_URL = '/api/data/postData';
const tenant = getTenant()
const base_api_url = import.meta.env.VITE_API_BACKEND_BASE_URL_TEMPLATE.replace("{}", tenant);
const API_URL = `${base_api_url}/api/user-profile`;

interface StateType {
  userProfile: any;
  page: number;
  totalPages: number;
  error: string | null;
  loading: boolean;
}

const initialState: StateType = {
  userProfile: null,
  page: 1,
  totalPages: 1,
  error: null,
  loading: false,
};

export const UserProfileSlice = createSlice({
  name: 'UserPost',
  initialState,
  reducers: {
    getProfileUser: (state, action) => {
      state.userProfile = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateUser: (state, action) => {
      state.userProfile = { ...state.userProfile, ...action.payload };
    }
  },
});

export const {
  getProfileUser,
  setPage,
  setError,
  setLoading,
  updateUser /*getFollowers, onToggleFollow, getPhotos*/ } = UserProfileSlice.actions;

export const fetchUser = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);

    if (response.status === 200) {
      dispatch(getProfileUser(response.data));
    } else {
      dispatch(setError('Fetch profile not found'));
    }
  } catch (err: any) {
    console.error('Error fetching user profile:', err);
    dispatch(setError('Failed to fetch user profile'));
  }
};

export const updateUserProfile = (
  first_name: string,
  last_name: string
) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    // TODO: no esta actualizando el usuario que inició sesión
    const response = await axios.patch(
      `${API_URL}/1/`,
      { first_name, last_name }
    );

    if (response.status === 200) {
      dispatch(updateUser(response.data));
    } else {
      dispatch(setError('Failed to update profile'));
    }
  } catch (err: any) {
    console.error('Error updating user profile:', err);
    dispatch(setError('Failed to update user profile'));
  } finally {
    dispatch(setLoading(false));
  }
};


export default UserProfileSlice.reducer;
