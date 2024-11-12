import { createSlice } from "@reduxjs/toolkit";
import { EHReportType } from "src/types/vulnerabilities/redteam/ethicalHackingReport";
import axios from 'src/utils/axios';
import { AppDispatch } from "../../Store";

const API_URL = '/api/data/eh-reports';
const DETAIL_API_URL = '/api/data/eh-reports/detail';

interface StateType {
  ehReports: EHReportType[];
  ehReport: EHReportType | null;
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
      state.ehReports = Array.isArray(action.payload.ehReports) ? action.payload.ehReports : [];
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

// Async thunk for fetching ehReports with pagination (READ)
export const fetchEHReports = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    const { ehReports, currentPage, totalPages } = response.data;

    // Envía la acción con el nombre correcto de los datos recibidos
    dispatch(getEHReports({ ehReports, currentPage, totalPages }));
  } catch (err: any) {
    console.error('Error fetching ehReports:', err);
    dispatch(setError('Failed to fetch ehReports'));
  }
};

// Async thunk for creating a new ehReport (CREATE)
export const createEHReport = (newEHReport: EHReportType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(API_URL, newEHReport);
    dispatch(addEHReport(response.data.ehReport)); // Assuming the server returns the created ehReport
  } catch (err: any) {
    console.error('Error creating ehReport:', err);
    dispatch(setError('Failed to create ehReport'));
  }
};

// Async thunk for updating an ehReport (UPDATE)
export const editEHReport = (updatedEHReport: EHReportType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${updatedEHReport.id}`, updatedEHReport);
    dispatch(updateEHReport(response.data.ehReport)); // Assuming the server returns the updated ehReport
  } catch (err: any) {
    console.error('Error updating ehReport:', err);
    dispatch(setError('Failed to update ehReport'));
  }
};

// Async thunk for deleting an ehReport (DELETE)
export const removeEHReport = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch(deleteEHReport(id));
  } catch (err: any) {
    console.error('Error deleting ehReport:', err);
    dispatch(setError('Failed to delete ehReport'));
  }
};

export const fetchEHReportById = (ehReportId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${DETAIL_API_URL}/${ehReportId}`);
    console.log(response.data.ehReport);
    
    if (response.status === 200) {
      dispatch(getEHReport({ data: response.data.ehReport }));
    } else {
      dispatch(setError('fetch EHReport not found'));
    }
  } catch (err: any) {
    console.error('Error fetching EHReport detail:', err);
    dispatch(setError('Failed to fetch EHReport detail'));
  }
};

export default EHReportsSlice.reducer;
