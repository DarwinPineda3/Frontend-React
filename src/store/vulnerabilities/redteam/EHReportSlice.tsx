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
  error: string | null;
}

const initialState: StateType = {
  ehReports: [],
  ehReport: null,
  page: 1,
  totalPages: 1,
  error: null,
};

export const EHReportsSlice = createSlice({
  name: 'ehReports',
  initialState,
  reducers: {
    getEHReports: (state, action) => {
      state.ehReports = Array.isArray(action.payload.ehReports)
        ? action.payload.ehReports
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
    }
  }
});

export const { getEHReports, addEHReport, updateEHReport, deleteEHReport, getEHReport, setPage, setError } = EHReportsSlice.actions;

export const fetchEHReports = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}`);
    const ehReports = response.data;
    const totalPages = Math.ceil(ehReports.length / 10);
    dispatch(getEHReports({ ehReports, currentPage: page, totalPages }));
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
