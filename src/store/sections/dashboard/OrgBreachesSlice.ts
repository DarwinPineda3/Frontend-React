import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'src/utils/axios'; // Correct import

// Async thunk to fetch organization breaches data
export const fetchOrgBreachesData = createAsyncThunk('orgBreaches/fetchData', async () => {
  const response = await axios.get('/api/org-breaches'); // Mock API endpoint
  return response.data;
});

interface OrgBreachesState {
  loading: boolean;
  series: { name: string; data: number[] }[];
  labels: string[];
  error: string | null;
}

const initialState: OrgBreachesState = {
  loading: false,
  series: [],
  labels: [],
  error: null,
};

const orgBreachesSlice = createSlice({
  name: 'orgBreaches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgBreachesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrgBreachesData.fulfilled, (state, action) => {
        const { series, labels } = action.payload;
        state.loading = false;
        state.series = series;
        state.labels = labels;
        state.error = null;
      })
      .addCase(fetchOrgBreachesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default orgBreachesSlice.reducer;
