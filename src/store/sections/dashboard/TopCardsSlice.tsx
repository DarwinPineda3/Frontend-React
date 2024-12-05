import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import axios from 'src/utils/axios';

function getApiUrl() {
  return `${getBaseApiUrl()}/dashbboard/cards/`;
}
// Async thunk to fetch top cards data
export const fetchTopCardsData = createAsyncThunk('topcards/fetchData', async () => {
  try {
    const response = await axios.get(`${getApiUrl()}`);
    const results = response.data;
    const parsedData = [
      { severity: 'critical', value: results.vulnerabilities_by_type.critical_count },
      { severity: 'high', value: results.vulnerabilities_by_type.high_count },
      { severity: 'medium', value: results.vulnerabilities_by_type.medium_count },
      { severity: 'low', value: results.vulnerabilities_by_type.low_count },
      { severity: 'total', value: results.assets_counts.assets_total_count },
    ];
    return parsedData;
  } catch (error) {
    throw error;
  }
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
