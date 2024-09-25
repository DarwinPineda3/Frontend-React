import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'src/utils/axios'; // Correct import

// Async thunk to fetch host data
export const fetchHostData = createAsyncThunk('hosts/fetchData', async () => {
  const response = await axios.get('/api/hosts'); // Mock API endpoint
  return response.data;
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
