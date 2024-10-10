import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'src/utils/axios'; // Correct import

// Async thunk to fetch recent events data
export const fetchRecentEventsData = createAsyncThunk('recentEvents/fetchData', async () => {
  const response = await axios.get('/api/recent-events'); // Mock API endpoint
  return response.data;
});

interface EventData {
  time: string;
  description: string;
  color: 'primary' | 'secondary' | 'success';
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
