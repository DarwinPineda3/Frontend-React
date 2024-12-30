import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import axios from 'src/utils/axios'; // Correct import


function getApiUrl() {
  return `${getBaseApiUrl()}/dashboard/historical/`;
}

// Async thunk to fetch recent events data
export const fetchRecentEventsData = createAsyncThunk('recentEvents/fetchData', async () => {
  const response = await axios.get(getApiUrl()); // Mock API endpoint
  return response.data;
});

interface EventData {
  date: string;
  event: string;
  tool: string;
  id: string;
  link?: string;
}

interface RecentEventsState {
  loading: boolean;
  events: EventData[];
  error: string | null;
}

const initialState: RecentEventsState = {
  loading: false,
  events: [],
  error: null,
};

const recentEventsSlice = createSlice({
  name: 'recentEvents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentEventsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentEventsData.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.error = null;
      })
      .addCase(fetchRecentEventsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default recentEventsSlice.reducer;
