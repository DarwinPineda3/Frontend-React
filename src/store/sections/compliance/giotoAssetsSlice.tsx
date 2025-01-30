import { createSlice } from "@reduxjs/toolkit";
import { getBaseBackofficeUrl } from "src/guards/jwt/Jwt";
import axios from 'src/utils/axios';
import { AppDispatch } from "../../Store";

// Update to match the backend API endpoint
function getApiUrl() {
  return `${getBaseBackofficeUrl()}/api/giotto-proxy`;
}

export interface ComplianceAsset {
  id: number | undefined,
  name: string,
  description: string | undefined;
  networkAddress: string,
  companyName: string,
  creationDate: string,
  lastKeepAlive: string
}

interface StateType {
  assets: ComplianceAsset[];
  page: number;
  pageSize: number;
  loading: boolean;
  totalPages: number;
  error: string | null;
  totalItemsAmount: number;
}

const initialState: StateType = {
  assets: [],
  page: 1,
  totalPages: 1,
  pageSize: 10,
  loading: false,
  error: null,
  totalItemsAmount: 0
};

export const GiottoAssetsSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    getAssets: (state, action) => {
      state.assets = Array.isArray(action.payload.results) ? action.payload.results : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalItemsAmount = action.payload.totalItemsAmount;
      state.pageSize = action.payload.pageSize;
    },
    getAllInList: (state, action) => {
      state.assets = Array.isArray(action.payload.assets) ? action.payload.assets : [];
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
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { getAssets, addAsset, updateAsset, deleteAsset, setPage, setError, setLoading, getAllInList } = GiottoAssetsSlice.actions;

// Async thunk for fetching assets with pagination (READ)
export const fetchAssets = (requestedPage: Number, requestedPageSize: Number = 10) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    if (requestedPageSize !== initialState.pageSize) {
      requestedPage = 1;
    }
    const response = await axios.get(`${getApiUrl()}?url=Assets/GetPaginated&Page=${requestedPage}&PageSize=${requestedPageSize}`);
    ////console.log('response', response.data);
    const { totalItemsAmount, pageSize, totalPages, itemsResult, currentPage } = response.data;

    dispatch(getAssets({
      results: itemsResult,
      currentPage,
      totalPages,
      totalItemsAmount,
      pageSize
    }));
    dispatch(setLoading(false));
  } catch (err: any) {
    console.error('Error fetching assets:', err);
    dispatch(setError('Failed to fetch assets'));
  }
};

export const uploadAssets = (files: FileList) => async (dispatch: AppDispatch) => {
  try {
    const formData = new FormData();
    formData.append('uploadFile', files[0]);
    const response = await axios.post(`${getApiUrl()}?url=Assets/UploadAssets`, formData);
    ////console.log('response', response.data);
    dispatch(fetchAssets(1, 10));
  } catch (err: any) {
    console.error('Error uploading assets:', err);
    dispatch(setError('Failed to upload assets'));
  }
}

export const fetchAssetsWitURL = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}getAsssetsWithURL/`);
    const { results } = response.data;

    const totalPages = Math.ceil(results.length / 10);
    dispatch(getAssets({ results, currentPage: page, totalPages }));
  } catch (err: any) {
    console.error('Error fetching assets:', err);
    dispatch(setError('Failed to fetch assets'));
  }
};

// Async thunk for creating a new asset (CREATE)
export const createAsset = (newAsset: ComplianceAsset) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(`${getApiUrl()}?url=Assets/CreateAsset`, newAsset);
    if (response.status >= 200 && response.status < 300) {
      dispatch(fetchAssets(initialState.page, initialState.pageSize));
      return response.data;
    }
    else {
      console.error('Error creating asset:', response);
      dispatch(setError('Failed to create asset'));
    }
  } catch (err: any) {
    console.error('Error creating asset:', err);
    dispatch(setError('Failed to create asset'));
    throw err;
  }
};

// Async thunk for updating an asset (UPDATE)
export const editAsset = (updatedAsset: ComplianceAsset) => async (dispatch: AppDispatch) => {
  try {
    const url = `${getApiUrl()}?url=Assets/EditAsset/${updatedAsset.id}`;
    ////console.log('PUT request to URL:', url);

    const response = await axios.put(url, updatedAsset);

    if (response.status >= 200 && response.status < 300) {
      ////console.log('Asset updated successfully:', response.data);
      dispatch(fetchAssets(1, 10));
    } else {
      //console.error('Error updating asset:', response);
      dispatch(setError('Failed to update asset'));
    }
  } catch (err: any) {
    if (err.response) {
      console.error('Error response:', err.response);
    } else {
      console.error('Unexpected error:', err.message || err);
    }
    dispatch(setError('Failed to update asset'));
    throw err;
  }
};


// Async thunk for deleting an asset (DELETE)
export const removeAsset = (assetId: string) => async (dispatch: AppDispatch) => {
  try {
    const url = `${getApiUrl()}?url=Assets/DeleteAsset/${assetId}`;
    await axios.delete(url);
    dispatch(deleteAsset(assetId));
  } catch (err: any) {
    console.error('Error deleting asset:', err);
    dispatch(setError('Failed to delete asset'));
  }
};


export const requestRestartSession = (assetId: string) => async (dispatch: AppDispatch) => {
  try {
    const url = `${getApiUrl()}?url=Assets/ResetTokenAsset/${assetId}`;
    await axios.post(url);
    dispatch(fetchAssets(1, 10));
  } catch (err: any) {
    console.error('Error deleting asset:', err);
    dispatch(setError('Failed to delete asset'));
  }
};

export const getAssetsByGroup = (group: any) => async (dispatch: AppDispatch) => {

  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${getApiUrl()}?url=Assets/GetListByGroupId/${group}`);

    const assets = response.data;

    dispatch(
      getAllInList({
        assets,
      }),
    );
    dispatch(setLoading(false));
  } catch (err: any) {
    console.error('Error fetching tempaltes:', err);
    dispatch(setError('Failed to fetch tempaltes'));
  }
};
export default GiottoAssetsSlice.reducer;
