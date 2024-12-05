import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import axios from 'src/utils/axios'; // Correct import

function getApiUrl() {
  return `${getBaseApiUrl()}/dashbboard/cards/`;
}
// Async thunk to fetch host data
export const fetchHostData = createAsyncThunk('hosts/fetchData', async () => {
  const response = await axios.get(`${getApiUrl()}`);
  const results = response.data;
  //@ts-ignore
  const parsedData = results.assets.map((asset, index) => ({
    id: index + 1,
    hostName: asset.Hostname,
    cpuUsage: asset.CpuInfo.CpuUsage,
    ramUsage: asset.RamInfo.RamUsagePercentage,
    storageUsage: asset.Storage.TotalUsagePercentage,
    firewallStatus: asset.Firewall === "Running" ? "Active" : "Inactive",
    lastUpdate: asset.Timestamp,
  }));
  return parsedData;
});

interface HostData {
  id: number;
  hostName: string;
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
  firewallStatus: string;
  lastUpdate: string;
}

interface HostState {
  loading: boolean;
  data: HostData[] | null;
  error: string | null;
}

const initialState: HostState = {
  loading: false,
  data: null,
  error: null,
};

const hostSlice = createSlice({
  name: 'hosts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHostData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHostData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchHostData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default hostSlice.reducer;
