import { createSlice } from "@reduxjs/toolkit";
import { getBaseApiUrl } from "src/guards/jwt/Jwt";
import { EHReportType } from "src/types/vulnerabilities/redteam/ethicalHackingReport";
import axios from 'src/utils/axios';
import { AppDispatch } from "../../Store";

function getApiUrl() {
  return `${getBaseApiUrl()}/eh-report/`;
}

interface StateType {
  ehReports: EHReportType[];
  ehReport: any | null;
  page: number;
  totalPages: number;
  loading: boolean;
  pageSize: number;
  error: string | null;
}

const initialState: StateType = {
  ehReports: [],
  ehReport: null,
  page: 1,
  totalPages: 1,
  pageSize: 10,
  loading: false,
  error: null,
};

export const EHReportsSlice = createSlice({
  name: 'ehReports',
  initialState,
  reducers: {
    getEHReports: (state, action) => {
      state.ehReports = Array.isArray(action.payload.results)
        ? action.payload.results
        : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    getEHReport: (state, action) => {
      state.ehReport = action.payload.data;
    },
    addEHReport: (state, action) => {
      state.ehReports.push(action.payload);
    },
    updateEHReport: (state, action) => {
      const index = state.ehReports.findIndex(ehReport => ehReport.id === action.payload.id);
      if (index !== -1) {
        state.ehReports[index] = action.payload;
      }
    },
    deleteEHReport: (state, action) => {
      state.ehReports = state.ehReports.filter(ehReport => ehReport.id !== action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
});

export const { getEHReports, addEHReport, updateEHReport, deleteEHReport, getEHReport, setPage, setError, setLoading } = EHReportsSlice.actions;

export const fetchEHReports =
  (requestedPage = 1,
    pageSize = 10
  ) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(setLoading(true));
        if (pageSize !== initialState.pageSize) {
          requestedPage = 1;
        }
        const response = await axios.get(`${getApiUrl()}?page=${requestedPage}&page_size=${pageSize}`);
        const cloudInventoryList = response.data;
        const { results, page, totalPages } = cloudInventoryList;
        dispatch(getEHReports({ results, currentPage: page, totalPages, pageSize }));
        dispatch(setLoading(false));
      } catch (err: any) {
        console.error('Error fetching ehReports:', err);
        dispatch(setError('Failed to fetch ehReports'));
      }
    };

export const fetchEHReportById = (ehReportId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}${ehReportId}/`);

    if (response.status === 200) {
      dispatch(getEHReport({ data: response.data }));
    } else {
      dispatch(setError('fetch Ethical hacking report detail not found'));
    }
  } catch (err: any) {
    console.error('Error fetching EHReport detail:', err);
    dispatch(setError('Failed to fetch EHReport detail'));
  }
};

export default EHReportsSlice.reducer;
