import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import axios from 'src/utils/axios';
import { AppDispatch } from '../Store';

function getApiUrl() {
  return `${getBaseApiUrl()}/monitoring/summary/`;
}

interface MonitoringType {
  id: number;
  name: string;
  value: number;
}

interface StateType {
  summaryMonitoring: MonitoringType[];
  page: number;
  pageSize: number;
  totalPages: number;
  error: string | null;
  loading: boolean;
}

const initialState: StateType = {
  summaryMonitoring: [],
  page: 1,
  pageSize: 25,
  totalPages: 1,
  error: null,
  loading: false,
};

export const SummaryMonitoringSlice = createSlice({
  name: 'summaryMonitoring',
  initialState,
  reducers: {
    getSummaryMonitoring: (state, action) => {
      state.summaryMonitoring = Array.isArray(action.payload.results) ? action.payload.results : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getSummaryMonitoring, setPage, setPageSize, setError } = SummaryMonitoringSlice.actions;

// Async thunk for fetching monitoring summary with pagination (READ)
export const fetchSummaryMonitoring =
  (page = 1, pageSize = 25) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${getApiUrl()}?page=${page}&page_size=${pageSize}`);
      const { results, page: currentPage, totalPages } = response.data;

      console.log('Fetched Data:', { results, currentPage, totalPages });

      dispatch(getSummaryMonitoring({ results, currentPage, totalPages }));
    } catch (err: any) {
      console.error('Error fetching summary monitoring:', err);
      dispatch(setError('Failed to fetch summary monitoring'));
    }
  };

// Async thunk for fetching monitoring summary by date range
export const fetchSummaryMonitoringByDateRange =
  (startDate: string, endDate: string, page = 1, pageSize = 25, typeFilter: string | null) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${getApiUrl()}by-range/`, {
        params: {
          startDate,
          endDate,
          page,
          page_size: pageSize,
          type: typeFilter,
        },
      });

      const { results, page: currentPage, totalPages } = response.data || {};

      if (Array.isArray(results)) {
        dispatch(
          getSummaryMonitoring({
            results,
            currentPage,
            totalPages,
          }),
        );
      }
    } catch (err: any) {
      console.error('Error fetching monitoring summary by date range:', err);
      dispatch(setError('Failed to fetch monitoring summary by date range'));
    }
  };

export default SummaryMonitoringSlice.reducer;