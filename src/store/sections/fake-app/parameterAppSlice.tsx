import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../Store";
import axios from 'src/utils/axios';
import { MobileAppType } from "src/types/monitoring/fake-apps/fakeApp";

const API_URL = '/api/data/mobileApps';

interface StateType {
  mobileApps: MobileAppType[];
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  mobileApps: [],
  page: 1,
  totalPages: 1,
  error: null,
};

export const FakeAppsSlice = createSlice({
  name: 'mobileApp',
  initialState,
  reducers: {
    getMobileApps: (state, action) => {
      state.mobileApps = Array.isArray(action.payload.mobileApps) ? action.payload.mobileApps : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages; 
    },
    addMobileApp: (state, action) => {
      state.mobileApps.push(action.payload);
    },
    updateMobileApp: (state, action) => {
      const index = state.mobileApps.findIndex(mobileApp => mobileApp.id === action.payload.id);
      if (index !== -1) {
        state.mobileApps[index] = action.payload;
      }
    },
    deleteMobileApp: (state, action) => {
      state.mobileApps = state.mobileApps.filter(mobileApp => mobileApp.id !== action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { getMobileApps, addMobileApp, updateMobileApp, deleteMobileApp, setPage, setError } = FakeAppsSlice.actions;

// Async thunk for fetching mobileApps with pagination (READ)
export const fetchMobileApps = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    const { mobileApps, currentPage, totalPages } = response.data;
    dispatch(getMobileApps({ mobileApps, currentPage, totalPages })); // Dispatch to update state
  } catch (err: any) {
    console.error('Error fetching mobileApps:', err);
    dispatch(setError('Failed to fetch mobileApps'));
  }
};

// Async thunk for creating a new mobileApp (CREATE)
export const createMobileApp = (newAsset: MobileAppType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(API_URL, newAsset);
    dispatch(addMobileApp(response.data.mobileApp)); // Assuming the server returns the created mobileApp
  } catch (err: any) {
    console.error('Error creating mobile App:', err);
    dispatch(setError('Failed to create mobile App'));
  }
};

// Async thunk for updating an mobileApp (UPDATE)
export const editMobileApp = (updatedMobileApp: MobileAppType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${updatedMobileApp.id}`, updatedMobileApp);
    dispatch(updateMobileApp(response.data.mobileApp)); // Assuming the server returns the updated mobileApp
  } catch (err: any) {
    console.error('Error updating mobile App:', err);
    dispatch(setError('Failed to update mobile App'));
  }
};

// Async thunk for deleting an mobileApp (DELETE)
export const removeMobileApp = (mobileAppId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}/${mobileAppId}`);
    dispatch(deleteMobileApp(mobileAppId));
  } catch (err: any) {
    console.error('Error deleting mobile App:', err);
    dispatch(setError('Failed to delete mobile App'));
  }
};

export default FakeAppsSlice.reducer;
