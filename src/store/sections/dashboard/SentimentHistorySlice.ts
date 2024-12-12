import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import axios from 'src/utils/axios';

function getApiUrl() {
  return `${getBaseApiUrl()}/dashbboard/sentiment/`;
}
// Async thunk to fetch top cards data
export const fetchSentimentsData = createAsyncThunk('sentimentsSummary/fetchData', async () => {
  try {
    const response = await axios.get(`${getApiUrl()}`);
    const results = response.data;
    return results;
  } catch (error) {
    throw error;
  }
});

interface Sentiment {
  sentimentType: string;
  count: number;
}

interface SentimentData {
  date: Date;
  semtiments: Sentiment;
}

interface SentimentsState {
  loading: boolean;
  data: SentimentData[] | null;
  error: string | null;
}

const initialState: SentimentsState = {
  loading: false,
  data: null,
  error: null,
};

const sentimentsSumarySlice = createSlice({
  name: 'sentimentsSummary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSentimentsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSentimentsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchSentimentsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default sentimentsSumarySlice.reducer;
