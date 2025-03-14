import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../Store";
import axios from 'src/utils/axios';
import { AppScanType } from "src/types/monitoring/mobile-apps/AppScan";

const API_URL = '/api/data/appScans';

interface StateType {
  appScans: AppScanType[];
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  appScans: [],
  page: 1,
  totalPages: 1,
  error: null,
};

export const AppScansSlice = createSlice({
  name: 'appScans',
  initialState,
  reducers: {
    getAppScans: (state, action) => {
      state.appScans = Array.isArray(action.payload.appScans) ? action.payload.appScans : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages; 
    },
    addAppScan: (state, action) => {
      state.appScans.push(action.payload);
    },
    updateAppScan: (state, action) => {
      const index = state.appScans.findIndex(appScan => appScan.id === action.payload.id);
      if (index !== -1) {
        state.appScans[index] = action.payload;
      }
    },
    deleteAppScan: (state, action) => {
      state.appScans = state.appScans.filter(appScan => appScan.id !== action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { getAppScans, addAppScan, updateAppScan, deleteAppScan, setPage, setError } = AppScansSlice.actions;

// Async thunk for fetching appScans with pagination (READ)
export const fetchAppScans = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    const { appScans, currentPage, totalPages } = response.data;
    dispatch(getAppScans({ appScans, currentPage, totalPages })); // Dispatch to update state
  } catch (err: any) {
    console.error('Error fetching appScans:', err);
    dispatch(setError('Failed to fetch appScans'));
  }
};

// Async thunk for creating a new appScan (CREATE)
export const createAppScan = (newAppScan: AppScanType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(API_URL, newAppScan);
    dispatch(addAppScan(response.data.appScan)); // Assuming the server returns the created appScan
  } catch (err: any) {
    console.error('Error creating appScan:', err);
    dispatch(setError('Failed to create appScan'));
  }
};

// Async thunk for updating an appScan (UPDATE)
export const editAppScan = (updatedAppScan: AppScanType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${updatedAppScan.id}`, updatedAppScan);
    dispatch(updateAppScan(response.data.appScan)); // Assuming the server returns the updated appScan
  } catch (err: any) {
    console.error('Error updating appScan:', err);
    dispatch(setError('Failed to update appScan'));
  }
};

// Async thunk for deleting an appScan (DELETE)
export const removeAppScan = (appScanId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}/${appScanId}`);
    dispatch(deleteAppScan(appScanId));
  } catch (err: any) {
    console.error('Error deleting appScan:', err);
    dispatch(setError('Failed to delete appScan'));
  }
};

export default AppScansSlice.reducer;
