import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import axios from 'src/utils/axios';
import { AppDispatch } from '../Store';

function getThresholdApiUrl() {
  return `${getBaseApiUrl()}/threshhold-settings/`; // Adjust URL to match your API endpoint
}

interface ThresholdState {
  thresholds: {
    cpu: number;
    ram: number;
    storage: number;
    email: string;
  } | null;
  error: string | null;
}

const initialState: ThresholdState = {
  thresholds: null,
  error: null,
};

const ThresholdSlice = createSlice({
  name: 'thresholdSettings',
  initialState,
  reducers: {
    setThresholds: (state, action) => {
      state.thresholds = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setThresholds, setError } = ThresholdSlice.actions;

// Async thunk for fetching Threshold settings
export const fetchThresholdSettings = (
) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(getThresholdApiUrl());

    if (response.status === 200) {
      dispatch(setThresholds(response.data));
    } else {
      dispatch(setError('Failed to fetch threshold settings'));
    }
  } catch (err: any) {
    console.error('Error fetching threshold settings:', err);
    dispatch(setError('Failed to fetch threshold settings'));
  }
};

// Async thunk for updating Threshold settings
export const updateThresholdSettings = (thresholdData: {
  cpu: number;
  ram: number;
  storage: number;
  email: string;
},
  onSuccess?: () => void,
  onError?: (error: string) => void
) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(getThresholdApiUrl(), thresholdData);

    if (response.status === 200) {
      onSuccess && onSuccess();
      dispatch(setThresholds(response.data));
    } else {
      dispatch(setError('Failed to update threshold settings'));
    }
  } catch (err: any) {
    console.error('Error updating threshold settings:', err);
    onError && onError(err);
    dispatch(setError('Failed to update threshold settings'));
  }
};

export default ThresholdSlice.reducer;
