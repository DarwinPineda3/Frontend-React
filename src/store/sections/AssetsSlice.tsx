import { createSlice } from "@reduxjs/toolkit";
import { getBaseApiUrl } from "src/guards/jwt/Jwt";
import { AssetType } from "src/types/assets/asset";
import axios from 'src/utils/axios';
import { AppDispatch } from "../Store";

// Update to match the backend API endpoint
function getApiUrl() {
  return `${getBaseApiUrl()}/assets/`;
}

interface StateType {
  assets: AssetType[];
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  assets: [],
  page: 1,
  totalPages: 1,
  error: null,
};

export const AssetsSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    getAssets: (state, action) => {
      state.assets = Array.isArray(action.payload.results) ? action.payload.results : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    getFilteredAssets: (state, action) => {
      state.assets = Array.isArray(action.payload.results) ? action.payload.results : [];
    },
    addAsset: (state, action) => {
      state.assets.push(action.payload);
    },
    updateAsset: (state, action) => {
      const index = state.assets.findIndex(asset => asset.id === action.payload.id);
      if (index !== -1) {
        state.assets[index] = action.payload;
      }
    },
    deleteAsset: (state, action) => {
      state.assets = state.assets.filter(asset => asset.id !== action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { getAssets, getFilteredAssets, addAsset, updateAsset, deleteAsset, setPage, setError } = AssetsSlice.actions;

// Async thunk for fetching assets with pagination (READ)
export const fetchAssets = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}`);
    const { results, count } = response.data; // Assuming DRF pagination
    const totalPages = Math.ceil(count / 10); // Update 10 based on your page size
    dispatch(getAssets({ results, currentPage: page, totalPages })); // Dispatch to update state
  } catch (err: any) {
    console.error('Error fetching assets:', err);
    dispatch(setError('Failed to fetch assets'));
  }
};

export const fetchFilteredAssets = (filters: { url?: boolean; ip?: boolean; domain?: boolean }) =>
  async (dispatch: AppDispatch) => {
  try {
    const params = new URLSearchParams();
      if (filters.url) params.append("url", "true");
      if (filters.ip) params.append("ip", "true");
      if (filters.domain) params.append("domain", "true");

    const response = await axios.get(`${getApiUrl()}filtered/?${params.toString()}/`);
    const { results } = response.data;

    dispatch(getFilteredAssets({ results }));
  } catch (err: any) {
    console.error('Error fetching assets:', err);
    dispatch(setError('Failed to fetch assets'));
  }
};

// Async thunk for creating a new asset (CREATE)
export const createAsset = (newAsset: AssetType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(getApiUrl(), newAsset);
    dispatch(addAsset(response.data)); // Assuming server returns the created asset
  } catch (err: any) {
    console.error('Error creating asset:', err);
    dispatch(setError('Failed to create asset'));
  }
};

// Async thunk for updating an asset (UPDATE)
export const editAsset = (updatedAsset: AssetType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${getApiUrl()}${updatedAsset.id}/`, updatedAsset);
    dispatch(updateAsset(response.data)); // Assuming server returns the updated asset
  } catch (err: any) {
    console.error('Error updating asset:', err);
    dispatch(setError('Failed to update asset'));
  }
};

// Async thunk for deleting an asset (DELETE)
export const removeAsset = (assetId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${getApiUrl()}${assetId}`);
    dispatch(deleteAsset(assetId));
  } catch (err: any) {
    console.error('Error deleting asset:', err);
    dispatch(setError('Failed to delete asset'));
  }
};

export default AssetsSlice.reducer;
