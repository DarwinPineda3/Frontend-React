import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../Store";
import axios from 'src/utils/axios';
import { ParameterAppType } from "src/types/monitoring/mobile-apps/parameterApp";

const API_URL = '/api/data/parameterApps';

interface StateType {
  parameterApps: ParameterAppType[];
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  parameterApps: [],
  page: 1,
  totalPages: 1,
  error: null,
};

export const ParameterAppsSlice = createSlice({
  name: 'parameterApp',
  initialState,
  reducers: {
    getParameterApps: (state, action) => {
      state.parameterApps = Array.isArray(action.payload.parameterApps) ? action.payload.parameterApps : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages; 
    },
    addParameterApp: (state, action) => {
      state.parameterApps.push(action.payload);
    },
    updateParameterApp: (state, action) => {
      const index = state.parameterApps.findIndex(parameterApp => parameterApp.id === action.payload.id);
      if (index !== -1) {
        state.parameterApps[index] = action.payload;
      }
    },
    deleteParameterApp: (state, action) => {
      state.parameterApps = state.parameterApps.filter(parameterApp => parameterApp.id !== action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { getParameterApps, addParameterApp, updateParameterApp, deleteParameterApp, setPage, setError } = ParameterAppsSlice.actions;

// Async thunk for fetching parameterApps with pagination (READ)
export const fetchParameterApps = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    const { parameterApps, currentPage, totalPages } = response.data;
    dispatch(getParameterApps({ parameterApps, currentPage, totalPages })); // Dispatch to update state
  } catch (err: any) {
    console.error('Error fetching parameterApps:', err);
    dispatch(setError('Failed to fetch parameterApps'));
  }
};

// Async thunk for creating a new parameterApp (CREATE)
export const createParameterApp = (newParameterApp: ParameterAppType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(API_URL, newParameterApp);
    dispatch(addParameterApp(response.data.parameterApp)); // Assuming the server returns the created parameterApp
  } catch (err: any) {
    console.error('Error creating parameterApp:', err);
    dispatch(setError('Failed to create parameterApp'));
  }
};

// Async thunk for updating an parameterApp (UPDATE)
export const editParameterApp = (updatedParameterApp: ParameterAppType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${updatedParameterApp.id}`, updatedParameterApp);
    dispatch(updateParameterApp(response.data.parameterApp)); // Assuming the server returns the updated parameterApp
  } catch (err: any) {
    console.error('Error updating parameterApp:', err);
    dispatch(setError('Failed to update parameterApp'));
  }
};

// Async thunk for deleting an parameterApp (DELETE)
export const removeParameterApp = (parameterAppId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}/${parameterAppId}`);
    dispatch(deleteParameterApp(parameterAppId));
  } catch (err: any) {
    console.error('Error deleting parameterApp:', err);
    dispatch(setError('Failed to delete parameterApp'));
  }
};

export default ParameterAppsSlice.reducer;
