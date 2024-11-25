import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import {
  BrandMonitoringDataType,
  Data,
} from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

function getMonitoringApiUrl() {
  return `${getBaseApiUrl()}/monitoring/cyber-guard/monitoring`;
}

interface StateType {
  brandMonitoringData: BrandMonitoringDataType[];
  brandMonitoringDetail: Data | null;
  brandMonitoringResume: any;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  brandMonitoringData: [],
  brandMonitoringDetail: null,
  brandMonitoringResume: {},
  page: 1,
  totalPages: 1,
  error: null,
};

const brandMonitoringSlice = createSlice({
  name: 'brandMonitoring',
  initialState,
  reducers: {
    getBrandMonitoringList: (state, action) => {
      state.brandMonitoringData = action.payload.data;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    },
    getBrandMonitoringDetail: (state, action) => {
      state.brandMonitoringDetail = action.payload.data.brandMonitoring;
    },
    getBrandMonitoringResume: (state, action) => {
      state.brandMonitoringResume = action.payload.data;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getBrandMonitoringList,
  getBrandMonitoringDetail,
  getBrandMonitoringResume,
  setError,
  setPage,
} = brandMonitoringSlice.actions;

// Async thunk for fetching brand monitoring list with pagination (READ)
export const fetchBrandMonitoringData =
  (page = 1) =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await axios.get(`${getMonitoringApiUrl()}?page=${page}`);

        const { latest_data, summary_data, page: currentPage, totalPages } = response.data;

        dispatch(
          getBrandMonitoringList({
            data: { latest_data, summary_data },
            page: currentPage,
            totalPages,
          }),
        );
      } catch (err: any) {
        console.error('Error fetching brand monitoring data:', err);
        dispatch(setError('Failed to fetch brand monitoring data'));
      }
    };

export const fetchBrandMonitoringById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getMonitoringApiUrl()}/${id}`);

    if (response.status === 200) {
      dispatch(getBrandMonitoringDetail({ data: response.data }));
    } else {
      dispatch(setError('fetch brand monitoring detail not found'));
    }
  } catch (err: any) {
    console.error('Error fetching brand monitoring detail:', err);
    dispatch(setError('Failed to fetch brand monitoring detail'));
  }
};

export const fetchBrandMonitoringResume = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getBaseApiUrl()}/threat-overview`);
    if (response.status === 200) {

      //console.log('response', response.data);
      dispatch(getBrandMonitoringResume({ data: response.data }));
    } else {
      dispatch(setError('fetch brand monitoring detail not found'));
    }
  } catch (err: any) {
    console.error('Error fetching brand monitoring detail:', err);
    dispatch(setError('Failed to fetch brand monitoring detail'));
  }
};
export default brandMonitoringSlice.reducer;
