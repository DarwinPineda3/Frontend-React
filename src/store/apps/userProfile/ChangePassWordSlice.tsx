import { createSlice } from '@reduxjs/toolkit';
import { t } from 'i18next';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import { AppDispatch } from 'src/store/Store';
import axios from 'src/utils/axios';

function getApiUrl() {
  return `${getBaseApiUrl()}/change-password/`;
}

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

    const response = await axios.post(getApiUrl(), {
      old_password: passwordData.currentPass,
      password: passwordData.newPass,
      password_confirm: passwordData.confirmPass
    });

    if (response.status === 200) {
      dispatch(setSuccessMessage(t('account_settings.password_updated_successfully')));
    } else {
      dispatch(setError(response.data.message || t('account_settings.password_update_failed')));
    }
  } catch (err: any) {
    dispatch(setError(err.response?.data?.message || t('account_settings.password_change_failed')));
  }
};

export default ChangePasswordUserSlice.reducer;
