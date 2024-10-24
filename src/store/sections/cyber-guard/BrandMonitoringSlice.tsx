import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from "../../Store";
import axios from 'src/utils/axios';
import { BrandMonitoringDataType } from "src/types/cyber-guard/brand-monitoring/brandMonitoring";

const API_URL = '/api/data/monitoring/cyber-guard/brand-monitoring';

interface StateType {
  brandMonitoringData: BrandMonitoringDataType[];
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  brandMonitoringData: [],
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
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { getBrandMonitoringList, setError, setPage } = brandMonitoringSlice.actions;

// Async thunk for fetching brand monitoring list with pagination (READ)
export const fetchBrandMonitoringData = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    
    const { latest_data, summary_data, page: currentPage, totalPages } = response.data;
    
    dispatch(getBrandMonitoringList({
      data: { latest_data, summary_data },
      page: currentPage,
      totalPages
    }));
    
  } catch (err: any) {
    console.error('Error fetching brand monitoring data:', err);
    dispatch(setError('Failed to fetch brand monitoring data'));
  }
};
export default brandMonitoringSlice.reducer;
