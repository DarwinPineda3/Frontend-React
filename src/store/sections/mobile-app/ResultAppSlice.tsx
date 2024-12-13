import { createSlice } from '@reduxjs/toolkit';
import { ResultAppType } from 'src/types/monitoring/mobile-apps/mobileApp';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

// const API_URL = '/api/data/mobile-apps';
const DETAIL_API_URL = '/api/data/mobile-apps/result-detail';


interface StateType {
  appResultDetail: ResultAppType | null;
  error: string | null;
}

const initialState: StateType = {
  appResultDetail: null,
  error: null
};

export const ResultAppsSlice = createSlice({
  name: 'resultApp',
  initialState,
  reducers: {
    getResultApp: (state, action) => {
      state.appResultDetail = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getResultApp,
  setError
} = ResultAppsSlice.actions;

export const fetchResultAppById = (mobileAppId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${DETAIL_API_URL}/${mobileAppId}`);

    if (response.status === 200) {
      dispatch(getResultApp(response.data.resultApp));
      return Promise.resolve();
    } else {
      dispatch(setError('fetch result app not found'));
      return Promise.reject('fetch result app not found');
    }
  } catch (err) {
    console.error('Error fetching result app detail:', err);
    dispatch(setError('Failed to fetch result app detail'));
    return Promise.reject(err);
  }
};

export default ResultAppsSlice.reducer;
