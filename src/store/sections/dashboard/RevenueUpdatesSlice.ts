import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'src/utils/axios'; // Correct import

// Async thunk to fetch chart data
export const fetchRevenueUpdatesData = createAsyncThunk('revenueUpdates/fetchData', async () => {
  const response = await axios.get('/api/revenue-updates'); // Mock API endpoint
  return response.data;
});

interface ChartData {
  name: string;
  data: number[];
}

interface RevenueUpdatesState {
  loading: boolean;
  totalReports: number;
  redTeamReports: number;
  blueTeamReports: number;
  series: ChartData[];
  categories: string[]; // New field for dates
  error: string | null;
}

const initialState: RevenueUpdatesState = {
  loading: false,
  totalReports: 0,
  redTeamReports: 0,
  blueTeamReports: 0,
  series: [],
  categories: [], // Initialize categories as an empty array
  error: null,
};

const revenueUpdatesSlice = createSlice({
  name: 'revenueUpdates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenueUpdatesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRevenueUpdatesData.fulfilled, (state, action) => {
        const { totalReports, redTeamReports, blueTeamReports, series, categories } = action.payload;
        state.loading = false;
        state.totalReports = totalReports;
        state.redTeamReports = redTeamReports;
        state.blueTeamReports = blueTeamReports;
        state.series = series;
        state.categories = categories; // Update categories with API data
        state.error = null;
      })
      .addCase(fetchRevenueUpdatesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default revenueUpdatesSlice.reducer;
