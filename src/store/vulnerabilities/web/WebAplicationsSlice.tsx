import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import { WebAppScanCreate } from 'src/types/vulnerabilities/web/webAppsType';
import axios from 'src/utils/axios';

function getApiUrl() {
  return `${getBaseApiUrl()}/web-applications/`;
}

// Utility to extract error message

function getErrorMessage(error: unknown): string {
  //@ts-ignore
  if (axios.isAxiosError(error)) {
    //@ts-ignore
    return 'An error occurred';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}

// Async thunk to fetch all the web applications data
export const fetchWebApplicationsData = createAsyncThunk(
  'webApplications/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getApiUrl());
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createWebApplicationScan = createAsyncThunk(
  'webApplications/create',
  async (data: WebAppScanCreate, { rejectWithValue }) => {
    try {
      const response = await axios.post(getApiUrl(), data);
      return response.data.scan;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// Async thunk to fetch a single web application data
export const fetchWebApplicationData = createAsyncThunk(
  'webApplications/fetchOne',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getApiUrl()}${id}`);
      return response.data.scan;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// Async thunk to fetch a single alert for a web application
export const fetchWebApplicationAlertData = createAsyncThunk(
  'webApplications/fetchAlert',
  async ({ scanId, alertId }: { scanId: string; alertId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getApiUrl()}${scanId}/alerts/${alertId}`);
      const response_data = response.data.alert;
      response_data['references'] = response_data['reference']
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '\n')
        .split('\n');
      return response_data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

interface WebApplicationsState {
  loading: boolean;
  data: any | null;
  detail: any | null;
  alert: any | null;
  error: string | null;
  page: number;
  pageSize: number;
  totalPages: number;
}

const initialState: WebApplicationsState = {
  loading: false,
  data: null,
  detail: null,
  alert: null,
  error: null,
  page: 1,
  pageSize: 25,
  totalPages: 1,
};

const webApplicationsSlice = createSlice({
  name: 'webApplications',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebApplicationsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWebApplicationsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.results;
        state.page = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.error = null;
      })
      .addCase(fetchWebApplicationsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchWebApplicationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWebApplicationData.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
        state.error = null;
      })
      .addCase(fetchWebApplicationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchWebApplicationAlertData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWebApplicationAlertData.fulfilled, (state, action) => {
        state.loading = false;
        state.alert = action.payload;
        state.error = null;
      })
      .addCase(fetchWebApplicationAlertData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createWebApplicationScan.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWebApplicationScan.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createWebApplicationScan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage } = webApplicationsSlice.actions;

export default webApplicationsSlice.reducer;
