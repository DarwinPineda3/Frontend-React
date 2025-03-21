import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import axios from 'src/utils/axios'; // Corrected import


function getApiUrl() {
  return `${getBaseApiUrl()}/dashbboard/top_ten/`;
}

// Async thunk to fetch vulnerability reports
export const fetchVulnerabilityReports = createAsyncThunk('vulnerabilities/fetchReports', async () => {
  const response = await axios.get(getApiUrl()); // Mock API endpoint
  return response.data;
});

interface VulnerabilityReport {
  id: string;
  type: string;
  hosts: number;
  severity: string;
  name: string;
  date: string;
  tool: string;
  aiAssistantSolution: string;
}

interface VulnerabilitiesState {
  loading: boolean;
  data: VulnerabilityReport[] | null;
  error: string | null;
}

const initialState: VulnerabilitiesState = {
  loading: false,
  data: null,
  error: null,
};

const vulnerabilitiesSlice = createSlice({
  name: 'vulnerabilities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVulnerabilityReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVulnerabilityReports.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchVulnerabilityReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch reports';
      });
  },
});

export default vulnerabilitiesSlice.reducer;
