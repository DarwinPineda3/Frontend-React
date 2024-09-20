import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'src/utils/axios'; // Correct import

// Async thunk to fetch weekly stats data
export const fetchWeeklyStatsData = createAsyncThunk('weeklyStats/fetchData', async () => {
  const response = await axios.get('/api/weekly-stats'); // Mock API endpoint
  return response.data;
});

interface WeeklyStat {
  title: string;
  subtitle: string;
  percent: string;
  color: string;
  lightcolor: string;
  icon: any;
}

interface WeeklyStatsState {
  loading: boolean;
  series: number[];
  stats: WeeklyStat[];
  error: string | null;
}

const initialState: WeeklyStatsState = {
  loading: false,
  series: [],
  stats: [],
  error: null,
};

const weeklyStatsSlice = createSlice({
  name: 'weeklyStats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyStatsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeeklyStatsData.fulfilled, (state, action) => {
        const { series, stats } = action.payload;
        state.loading = false;
        state.series = series;
        state.stats = stats;
        state.error = null;
      })
      .addCase(fetchWeeklyStatsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default weeklyStatsSlice.reducer;
