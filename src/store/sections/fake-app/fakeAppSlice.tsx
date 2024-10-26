import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../Store";
import axios from 'src/utils/axios';
import { ParameterAppType } from "src/types/monitoring/fake-apps/parameterApp";

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
    getparameterApps: (state, action) => {
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

export const { getparameterApps, addParameterApp, updateParameterApp, deleteParameterApp, setPage, setError } = ParameterAppsSlice.actions;

// Async thunk for fetching parameterApps with pagination (READ)
export const fetchParameterApps = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    const { parameterApps, currentPage, totalPages } = response.data;
    dispatch(getparameterApps({ parameterApps, currentPage, totalPages })); // Dispatch to update state
  } catch (err: any) {
    console.error('Error fetching parameterApps:', err);
    dispatch(setError('Failed to fetch parameterApps'));
  }
};

// Async thunk for creating a new parameterApp (CREATE)
export const createParameterApp = (newAsset: ParameterAppType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(API_URL, newAsset);
    dispatch(addParameterApp(response.data.parameterApp)); // Assuming the server returns the created parameterApp
  } catch (err: any) {
    console.error('Error creating parameter App:', err);
    dispatch(setError('Failed to create parameter App'));
  }
};

// Async thunk for updating an parameterApp (UPDATE)
export const editMobileApp = (updatedMobileApp: ParameterAppType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${updatedMobileApp.id}`, updatedMobileApp);
    dispatch(updateParameterApp(response.data.parameterApp)); // Assuming the server returns the updated parameterApp
  } catch (err: any) {
    console.error('Error updating parameter App:', err);
    dispatch(setError('Failed to update parameter App'));
  }
};

// Async thunk for deleting an parameterApp (DELETE)
export const removeParameterApp = (mobileAppId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}/${mobileAppId}`);
    dispatch(deleteParameterApp(mobileAppId));
  } catch (err: any) {
    console.error('Error deleting parameter App:', err);
    dispatch(setError('Failed to delete parameter App'));
  }
};

export default ParameterAppsSlice.reducer;
