import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import { AppDispatch } from 'src/store/Store';
import axios from 'src/utils/axios';

function getApiUrl() {
  return `${getBaseApiUrl()}/user-profile`;
}

interface StateType {
  userProfile: any;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  userProfile: null,
  page: 1,
  totalPages: 1,
  error: null
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
    }
  },
});

export const {
  getProfileUser,
  setPage,
  setError
} = UserProfileSlice.actions;

export const fetchUser = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}`);

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




export default UserProfileSlice.reducer;
