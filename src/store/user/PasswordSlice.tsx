import { createSlice } from '@reduxjs/toolkit';
import { TechInventoryType } from 'src/types/cti/technologies/techInventory';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

const API_URL_FORGOT_PASSWORD = '/api/data/techinventory';
const API_URL_RESET_PASSWORD = '/api/data/techinventory';

interface StateType {
  email?: string | null;
  password?: string | null;
  token?: string | null;
  message?: string | null;
  error: string | null;
}

const initialState: StateType = {
  email: null,
  password: null,
  token: null,
  message: null,
  error: null,
};

export const PasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    forgotPassword: (state, action) => {
      state.email = action.payload.email;
    },
    resetPassword: (state, action) => {
      state.password = action.payload.password;
      state.token = action.payload.token;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { forgotPassword, resetPassword, setError } = PasswordSlice.actions;

// Async thunk for creating a new technology (CREATE)
export const fetchForgotPassword = (email: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(API_URL_FORGOT_PASSWORD, { email });
    dispatch(forgotPassword(response.data.detail)); // Assuming the server returns the created technology
  } catch (err: any) {
    console.error('Error creating technology:', err);
    dispatch(setError('Failed to create technology'));
  }
};

// Async thunk for creating a new technology (CREATE)
export const fethResetPassword =
  (newTechnology: TechInventoryType) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(API_URL_RESET_PASSWORD, newTechnology);
      dispatch(resetPassword(response.data.technology)); // Assuming the server returns the created technology
    } catch (err: any) {
      console.error('Error creating technology:', err);
      dispatch(setError('Failed to create technology'));
    }
  };

export default PasswordSlice.reducer;
