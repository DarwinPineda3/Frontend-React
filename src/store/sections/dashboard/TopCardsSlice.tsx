import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';


// Async thunk to fetch top cards data
export const fetchTopCardsData = createAsyncThunk('topcards/fetchData', async () => {
  const response = await axios.get('/api/dashboard/topcards'); // Mock API endpoint
  return response.data; // Expects { severity: string, value: string }
});

interface CardData {
  severity: Severity;
  value: string;
}

interface TopCardsState {
  loading: boolean;
  data: CardData[] | null;
  error: string | null;
}

const initialState: TopCardsState = {
  loading: false,
  data: null,
  error: null,
};

const topCardsSlice = createSlice({
  name: 'topcards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopCardsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopCardsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchTopCardsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default topCardsSlice.reducer;
