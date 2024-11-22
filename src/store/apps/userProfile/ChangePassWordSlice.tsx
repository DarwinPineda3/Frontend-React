import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';
import axios from 'src/utils/axios';
import { getTenant } from 'src/guards/jwt/Jwt';

const tenant = getTenant();
const base_api_url = import.meta.env.VITE_API_BACKEND_BASE_URL_TEMPLATE.replace("{}", tenant);
const API_URL = `${base_api_url}/api/change-password/`;

interface StateType {
  error: string | null;
  successMessage: string | null;
}

const initialState: StateType = {
  error: null,
  successMessage: null,
};

export const ChangePasswordUserSlice = createSlice({
  name: 'ChangePasswordUser',
  initialState,
  reducers: {
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
});

export const { setSuccessMessage, setError, resetMessages } = ChangePasswordUserSlice.actions;

export const changePassword = (passwordData: { currentPass: string; newPass: string; confirmPass: string }) => async (dispatch: AppDispatch) => {
  try {
    dispatch(resetMessages());

    const response = await axios.post(API_URL, { 
      old_password: passwordData.currentPass, 
      password: passwordData.newPass, 
      password_confirm: passwordData.confirmPass 
    });

    if (response.status === 200) {
      dispatch(setSuccessMessage('Password updated successfully.'));
    } else {
        dispatch(setError(response.data.message || 'Failed to update password.'));
    }
  } catch (err: any) {
    dispatch(setError(err.response?.data?.message || 'Failed to change password.'));
  }
};

export default ChangePasswordUserSlice.reducer;
