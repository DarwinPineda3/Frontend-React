import { createSlice } from '@reduxjs/toolkit';
import { MobileAppType } from 'src/types/monitoring/mobile-apps/mobileApp';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

// const API_URL = '/api/data/mobile-apps';
const DETAIL_API_URL = '/api/data/mobile-apps/result-detail';


interface StateType {
  mobileAppResult: MobileAppType | null;
  error: string | null;
}

const initialState: StateType = {
  mobileAppResult: null,
  error: null
};

export const ResultApps = createSlice({
  name: 'resultApp',
  initialState,
  reducers: {
    getResultApp: (state, action) => {
      state.mobileAppResult = action.payload.data;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getResultApp,
  setError
} = ResultApps.actions;

export const fetchResultAppById = (mobileAppId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${DETAIL_API_URL}/${mobileAppId}`);

    if (response.status === 200) {
      dispatch(getResultApp({ data: response.data }));
    } else {
      dispatch(setError('fetch result app not found'));
    }
  } catch (err: any) {
    console.error('Error fetching result app detail:', err);
    dispatch(setError('Failed to fetch result app detail'));
  }
};

export default ResultApps.reducer;
