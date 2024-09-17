import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../Store";
import axios from 'src/utils/axios';
import { AssetType } from "src/types/assets/asset";

const API_URL = '/api/data/assets';

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
      state.assets = Array.isArray(action.payload.assets) ? action.payload.assets : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages; 
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

export const { getAssets, addAsset, updateAsset, deleteAsset, setPage, setError } = AssetsSlice.actions;

// Async thunk for fetching assets with pagination (READ)
export const fetchAssets = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    const { assets, currentPage, totalPages } = response.data;
    dispatch(getAssets({ assets, currentPage, totalPages })); // Dispatch to update state
  } catch (err: any) {
    console.error('Error fetching assets:', err);
    dispatch(setError('Failed to fetch assets'));
  }
};

// Async thunk for creating a new asset (CREATE)
export const createAsset = (newAsset: AssetType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(API_URL, newAsset);
    dispatch(addAsset(response.data.asset)); // Assuming the server returns the created asset
  } catch (err: any) {
    console.error('Error creating asset:', err);
    dispatch(setError('Failed to create asset'));
  }
};

// Async thunk for updating an asset (UPDATE)
export const editAsset = (updatedAsset: AssetType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${updatedAsset.id}`, updatedAsset);
    dispatch(updateAsset(response.data.asset)); // Assuming the server returns the updated asset
  } catch (err: any) {
    console.error('Error updating asset:', err);
    dispatch(setError('Failed to update asset'));
  }
};

// Async thunk for deleting an asset (DELETE)
export const removeAsset = (assetId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}/${assetId}`);
    dispatch(deleteAsset(assetId));
  } catch (err: any) {
    console.error('Error deleting asset:', err);
    dispatch(setError('Failed to delete asset'));
  }
};

export default AssetsSlice.reducer;
