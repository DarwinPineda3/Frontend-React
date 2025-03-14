import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import { AppDispatch } from 'src/store/Store';
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
      const response = await axios.get(`${getApiUrl()}${id}/`);
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

export const generateAiSolution =
  ({
    scanId,
    alertId,
    vulnName,
    alertExternalId,
  }: {
    scanId: string;
    alertId: string;
    vulnName: string;
    alertExternalId: string;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      const bodyRequest = {
        report_id: scanId,
        vulnerability_id: alertId,
        vulnerability_name: vulnName,
        tool: 'Applications',
      };
      const response = await axios.post(
        `${getBaseApiUrl()}/vulnerabilities/ai-solution/`,
        bodyRequest,
      );
      const response_data = response.data.alert;
      dispatch(fetchWebApplicationAlertData({ scanId, alertId: alertExternalId }));
      return response_data;
    } catch (error) {
      dispatch(setError('Failed to fetch ai solution'));
    }
  };

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
  data: [],
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
    getScans: (state, action) => {
      state.data = Array.isArray(action.payload.results) ? action.payload.results : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    removeScan: (state, action) => {
      state.data = state.data.filter((scan) => scan.id !== action.payload);
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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

export const { getScans, setLoading, setError, setPage, removeScan, setPageSize } =
  webApplicationsSlice.actions;

export const fetchWebApplicationsData =
  (requestedPage = 1, pageSize = 25) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const url = `${getApiUrl()}?page=${requestedPage}&page_size=${pageSize}`;
      const response = await axios.get(url);
      const { results, page, totalPages } = response.data;
      dispatch(getScans({ results, currentPage: page, totalPages, pageSize }));
      dispatch(setLoading(false));
    } catch (err: any) {
      console.error('Error fetching scans:', err);
      dispatch(setError('Failed to fetch scans'));
    }
  };

export const downloadWebApplicationReport = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}download/?id=${id}`, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    const fileName = `Vulnerabilities-web-applications_${id}_${
      new Date().toISOString().split('T')[0]
    }.json`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (err: any) {
    dispatch(setError('Error downloading report'));
    throw err.response.statusText;
  }
};

export const deleteWebApplicationScan = (scanId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.delete(`${getApiUrl()}${scanId}/`);

    if (response.status === 200) {
      dispatch(removeScan(scanId));
    } else {
      dispatch(setError('Failed to delete Web Application Scan'));
      throw new Error('Failed to delete Web Application Scan');
    }
  } catch (err: any) {
    dispatch(setError('Failed to delete Web Application Scan'));
    throw err.response.data;
  }
};

export default webApplicationsSlice.reducer;
