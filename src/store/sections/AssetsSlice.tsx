import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import { AssetType } from 'src/types/assets/asset';
import axios from 'src/utils/axios';
import { AppDispatch } from '../Store';

// Update to match the backend API endpoint
function getApiUrl() {
  return `${getBaseApiUrl()}/assets/`;
}


interface StateType {
  assets: AssetType[];
  page: number;
  pageSize: number;
  loading: boolean;
  totalPages: number;
  error: string | null;
  message: string | null;
}

const initialState: StateType = {
  assets: [],
  page: 1,
  totalPages: 1,
  pageSize: 10,
  loading: false,
  error: null,
  message: null,
};

export const AssetsSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    getAssets: (state, action) => {
      state.assets = Array.isArray(action.payload.results) ? action.payload.results : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.pageSize = action.payload.pageSize;
    },
    getFilteredAssets: (state, action) => {
      state.assets = Array.isArray(action.payload.results) ? action.payload.results : [];
    },
    addAsset: (state, action) => {
      state.assets.push(action.payload);
    },
    updateAsset: (state, action) => {
      const index = state.assets.findIndex((asset) => asset.id === action.payload.id);
      if (index !== -1) {
        state.assets[index] = action.payload;
      }
    },
    deleteAsset: (state, action) => {
      state.assets = state.assets.filter((asset) => asset.id !== action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  getAssets,
  getFilteredAssets,
  addAsset,
  updateAsset,
  deleteAsset,
  setPage,
  setError,
  setLoading,
  setMessage
} = AssetsSlice.actions;

// Async thunk for fetching assets with pagination (READ)
export const fetchAssets =
  (requestedPage: number, pageSize: number = 10) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(setLoading(true));
        if (isNaN(requestedPage)) {
          requestedPage = 1;
        }
        if (isNaN(pageSize)) {
          pageSize = 10;
        }
        const response = await axios.get(
          `${getApiUrl()}?page=${requestedPage}&page_size=${pageSize}`,
        );
        const { results, page, totalPages } = response.data;

        dispatch(getAssets({ results, currentPage: page, totalPages, pageSize }));
        dispatch(setLoading(false));
      } catch (err: any) {
        console.error('Error fetching assets:', err);
        dispatch(setError('Failed to fetch assets'));
      }
    };

export const fetchFilteredAssets =
  (filters: { url?: boolean; ip?: boolean; domain?: boolean }) => async (dispatch: AppDispatch) => {
    try {
      const params = new URLSearchParams();
      if (filters.url) params.append('url', 'true');
      if (filters.ip) params.append('ip', 'true');
      if (filters.domain) params.append('domain', 'true');

      const response = await axios.get(`${getApiUrl()}filtered/?${params.toString()}/`);
      const { results } = response.data;

      dispatch(getFilteredAssets({ results }));
    } catch (err: any) {
      console.error('Error fetching assets:', err);
      dispatch(setError('Failed to fetch assets'));
    }
  };

// Async thunk for creating a new asset (CREATE)
export const createAsset = (newAsset: AssetType, t: (key: string) => string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(getApiUrl(), newAsset);
    if (response.status >= 200 && response.status < 300) {
      dispatch(fetchAssets(1, 10));
      dispatch(setMessage(t('home.assets.asset_updated_success')));
    } else {
      const errorMessage = response.data?.error || 'Failed to create asset';
      console.error(errorMessage, response);
      dispatch(setError(errorMessage));
    }
  } catch (err: any) {
    console.error('Error creating asset:', err);
    const errorMessage = err.response?.data?.error || 'Failed to create asset';
    dispatch(setError(errorMessage));
  }
};

// Async thunk for updating an asset (UPDATE)

export const editAsset = (updatedAsset: AssetType, t: (key: string) => string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${getApiUrl()}${updatedAsset.id}/`, updatedAsset);
    if (response.status >= 200 && response.status < 300) {
      dispatch(setMessage(t('home.assets.asset_updated_success')));
      dispatch(fetchAssets(1, 10));
    } else {
      console.error('Error creating asset:', response);
      dispatch(setError('Failed to create asset'));
    }
  } catch (err: any) {
    console.error('Error updating asset:', err);
    dispatch(setError('Failed to update asset'));
  }
};
export const removeAsset = (assetId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${getApiUrl()}${assetId}`);
    dispatch(deleteAsset(assetId));
    setMessage('Asset deleted successfully');
  } catch (err: any) {
    console.error('Error deleting asset:', err);
    dispatch(setError('Failed to delete asset'));
  }
};

export default AssetsSlice.reducer;
