import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import { vulnerabilityType } from 'src/types/vulnerabilities/vulnerabilityType';
import axios from 'src/utils/axios';
import { AppDispatch } from '../Store';

const API_URL = '/api/data/summary';
function getApiUrl() {
  return `${getBaseApiUrl()}/vulnerabilities/summary/`;
}
interface StateType {
  summaryVuln: vulnerabilityType[];
  page: number;
  pageSize: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  summaryVuln: [],
  page: 1,
  pageSize: 25,
  totalPages: 1,
  error: null,
};

export const SummaryVulnSlice = createSlice({
  name: 'summaryVuln',
  initialState,
  reducers: {
    getSummaryVuln: (state, action) => {
      state.summaryVuln = Array.isArray(action.payload.results) ? action.payload.results : [];
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

export const { getSummaryVuln, setPage, setPageSize, setError } = SummaryVulnSlice.actions;

// Async thunk for fetching vulnerabilities with pagination (READ)
export const fetchSummaryVuln =
  (page = 1, pageSize = 25) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${getApiUrl()}?page=${page}&page_size=${pageSize}`);
      const { results, page: currentPage, totalPages } = response.data;
      dispatch(getSummaryVuln({ results, currentPage, totalPages })); // Dispatch to update state
    } catch (err: any) {
      console.error('Error fetching summary vulnerabilities:', err);
      dispatch(setError('Failed to fetch summary vulnerabilities'));
    }
  };

export default SummaryVulnSlice.reducer;
