import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import axios from 'src/utils/axios'; // Correct import

function getApiUrl() {
  return `${getBaseApiUrl()}/dashbboard/weekly-stats/`;
}
// Async thunk to fetch weekly stats data
export const fetchWeeklyStatsData = createAsyncThunk('weeklyStats/fetchData', async () => {
  const result = await axios.get(getApiUrl());
  let response = result.data;
  const stats = [

    {
      title: 'Max Service Uptime',
      subtitle: 'Web Services',
      percent: result.data.avg_max,
      color: '#2196f3',
      lightcolor: '#bbdefb',
      icon: 'IconGridDots',
    },
    {
      title: 'Average Service Uptime',
      subtitle: 'API Gateway',
      percent: result.data.avg_avg,

      color: '#4caf50',
      lightcolor: '#c8e6c9',
      icon: 'IconGridDots',
    },
    {
      title: 'Min Service Uptime',
      subtitle: 'Security Issues',
      percent: result.data.avg_min,
      color: '#f44336',
      lightcolor: '#ffcdd2',
      icon: 'IconGridDots',
    },
  ];

  response.stats = stats;

  return response;
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
  maxSeries: number[];
  minSeries: number[];
  avgSeries: number[];
  stats: WeeklyStat[];
  error: string | null;
}

const initialState: WeeklyStatsState = {
  loading: false,
  maxSeries: [],
  minSeries: [],
  avgSeries: [],
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
        const { maxSeries, minSeries, avgSeries, stats } = action.payload;
        state.loading = false;
        state.maxSeries = maxSeries;
        state.minSeries = minSeries;
        state.avgSeries = avgSeries;
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
