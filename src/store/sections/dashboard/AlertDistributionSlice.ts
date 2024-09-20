import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'src/utils/axios'; // Correct import

// Async thunk to fetch pie chart data
export const fetchAlertDistributionData = createAsyncThunk('alertDistribution/fetchData', async () => {
  const response = await axios.get('/api/alert-distribution'); // Mock API endpoint
  return response.data;
});

interface AlertDistributionState {
  loading: boolean;
  labels: string[];
  series: number[];
  error: string | null;
}

const initialState: AlertDistributionState = {
  loading: false,
  labels: [],
  series: [],
  error: null,
};

const alertDistributionSlice = createSlice({
  name: 'alertDistribution',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlertDistributionData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlertDistributionData.fulfilled, (state, action) => {
        const { labels, series } = action.payload;
        state.loading = false;
        state.labels = labels;
        state.series = series;
        state.error = null;
      })
      .addCase(fetchAlertDistributionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default alertDistributionSlice.reducer;
