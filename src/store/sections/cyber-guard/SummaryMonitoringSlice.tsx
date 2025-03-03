import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

function getApiUrl() {
  return `${getBaseApiUrl()}/threat-overview/`;
}

interface MonitoringType {
  id: number;
  name: string;
  value: number;
  data: string;
  parameter: string;
  parameter_type: string;
  data_type: string;
  elastic_id: string;
  data_source: string;
  result_group: string;
  identification_date: string;
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
    setclearListSummaryState: (state) => {
      state.summaryMonitoring = [];
      state.page = 1;
      state.totalPages = 1;
    },
  },
});

export const { getSummaryMonitoring, setPage, setPageSize, setError, setclearListSummaryState } =
  SummaryMonitoringSlice.actions;

// Async thunk for fetching monitoring summary with pagination (READ)
export const fetchSummaryMonitoring =
  (page = 1, pageSize = 25) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${getApiUrl()}?page=${page}&page_size=${pageSize}`);
      const { results, page: currentPage, totalPages } = response.data;

      dispatch(getSummaryMonitoring({ results, currentPage, totalPages }));
    } catch (err: any) {
      console.error('Error fetching summary monitoring:', err);
      dispatch(setError('Failed to fetch summary monitoring'));
    }
  };

// Async thunk for fetching monitoring summary by date range
export const fetchSummaryMonitoringByDateRange =
  (startDate: string, endDate: string, page = 1, pageSize = 25, typeFilter: string | 'all') =>
  async (dispatch: AppDispatch) => {
    try {
      const params = new URLSearchParams();
      params.append('start-date', startDate);
      params.append('end-date', endDate);
      params.append('data-type', typeFilter);
      params.append('page', page);
      params.append('page_size', pageSize);
      const response = await axios.get(`${getApiUrl()}get-results-by-range/?${params.toString()}`);

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
      console.log(err);
      dispatch(setError('Failed to fetch monitoring summary by date range'));
    }
  };

export const clearListSummary = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setclearListSummaryState());
  } catch (err: any) {
    console.error('Error cleaning brand monitoring detail:', err);
    dispatch(setError('Failed to cleaning brand monitoring detail'));
  }
};

export default SummaryMonitoringSlice.reducer;
