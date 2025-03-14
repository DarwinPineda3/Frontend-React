import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import axios from 'src/utils/axios'; // Correct import
function getApiUrl() {
  return `${getBaseApiUrl()}/dashbboard/cards/`;
}
// Async thunk to fetch pie chart data
export const fetchAlertDistributionData = createAsyncThunk('alertDistribution/fetchData', async () => {
  const response = await axios.get(`${getApiUrl()}`);
  const results = response.data;
  const parsedData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    series: [
      results.vulnerabilities_by_type.critical_count,
      results.vulnerabilities_by_type.high_count,
      results.vulnerabilities_by_type.medium_count,
      results.vulnerabilities_by_type.low_count,
    ],
  };
  return parsedData;
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
