import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import axios from 'src/utils/axios'; // Correct import

function getApiUrl() {
  return `${getBaseApiUrl()}/dashbboard/cards/`;
}
// Async thunk to fetch asset status data
export const fetchAssetStatusData = createAsyncThunk('assetStatus/fetchData', async () => {
  const response = await axios.get(`${getApiUrl()}`);
  const incomingData = response.data;
  const parsedData = {
    connectedAssets: {
      title: 'Connected Assets',
      subtitle: '',
      amount: incomingData.assets_counts.assets_online_count,
    },
    disconnectedAssets: {
      title: 'Disconnected Assets',
      subtitle: '',
      amount: incomingData.assets_counts.assets_offline_count,
    },
  };
  return parsedData;
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
