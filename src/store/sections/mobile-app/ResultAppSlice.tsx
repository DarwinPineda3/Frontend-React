import { createSlice } from '@reduxjs/toolkit';
import { ResultAppType } from 'src/types/monitoring/mobile-apps/mobileApp';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

// const API_URL = '/api/data/mobile-apps';
const DETAIL_API_URL = '/api/data/mobile-apps/result-detail';


interface StateType {
  AppResultDetail: ResultAppType | null;
  error: string | null;
}

const initialState: StateType = {
  AppResultDetail: null,
  error: null
};

export const ResultAppsSlice = createSlice({
  name: 'resultApp',
  initialState,
  reducers: {
    getResultApp: (state, action) => {
      state.AppResultDetail = action.payload;
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
    console.log(response.data.resultApp);
    
    if (response.status === 200) {
      dispatch(getResultApp(response.data.resultApp));
    } else {
      dispatch(setError('fetch result app not found'));
    }
  } catch (err) {
    console.error('Error fetching result app detail:', err);
    dispatch(setError('Failed to fetch result app detail'));
  }
};

export default ResultAppsSlice.reducer;
