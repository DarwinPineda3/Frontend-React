import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'src/utils/axios'; // Correct import

// Async thunk to fetch asset status data
export const fetchAssetStatusData = createAsyncThunk('assetStatus/fetchData', async () => {
  const response = await axios.get('/api/asset-status'); // Mock API endpoint
  return response.data;
});

interface AssetStat {
  title: string;
  subtitle: string;
  amount: number;
}

interface AssetStatusState {
  loading: boolean;
  connectedAssets: AssetStat | null;
  disconnectedAssets: AssetStat | null;
  error: string | null;
}

const initialState: AssetStatusState = {
  loading: false,
  connectedAssets: null,
  disconnectedAssets: null,
  error: null,
};

const assetStatusSlice = createSlice({
  name: 'assetStatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetStatusData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssetStatusData.fulfilled, (state, action) => {
        const { connectedAssets, disconnectedAssets } = action.payload;
        state.loading = false;
        state.connectedAssets = connectedAssets;
        state.disconnectedAssets = disconnectedAssets;
        state.error = null;
      })
      .addCase(fetchAssetStatusData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default assetStatusSlice.reducer;
