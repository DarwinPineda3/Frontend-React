import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import {
  ScheduledScanDetail,
  ScheduledTaskType,
} from 'src/types/schedule-scans-settings/schedule_scans_type';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

function getApiUrl() {
  return `${getBaseApiUrl()}/settings/schedule_scans`;
}

interface StateType {
  scheduled_scans: ScheduledTaskType[];
  scheduled_scan_detail: ScheduledScanDetail;
  page: number;
  totalPages: number;
  pageSize: number;
  error: string | null;
}

const initialState: StateType = {
  scheduled_scans: [],
  scheduled_scan_detail: {
    scheduled_scan: {
      id: 0,
      name: '',
      scan_type: 0,
      asset: {
        id: 0,
        name: '',
        ip: null,
        domain: null,
        url: null,
        hostname: '',
        uuid: '',
        created_date: '',
        updated_date: '',
      },
      execution_frequency: 1,
      execution_time: '',
      created_date: '',
      updated_date: '',
      is_active: false,
    },
    scheduled_executions: [],
  },
  page: 1,
  totalPages: 1,
  pageSize: 25,
  error: null,
};

export const ScheduleScansSlice = createSlice({
  name: 'scheduled_scans',
  initialState,
  reducers: {
    getScheduleScans: (state, action) => {
      state.scheduled_scans = Array.isArray(action.payload.list_scheduled_scans)
        ? action.payload.list_scheduled_scans
        : [];
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    },
    getScheduleScanDetail: (state, action) => {
      state.scheduled_scan_detail = action.payload;
    },
    addScheduleScan: (state, action) => {
      state.scheduled_scans.push(action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export const {
  getScheduleScans,
  getScheduleScanDetail,
  addScheduleScan,
  setPage,
  setPageSize,
  setError,
} = ScheduleScansSlice.actions;

// Async thunk for fetching ScheduleScan with pagination (READ)
export const fetchScheduleScans =
  (page = 1, pageSize = 25) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${getApiUrl()}/?page=${page}&page_size=${pageSize}`);
      const { list_scheduled_scans, page: currentPage, totalPages } = response.data;
      dispatch(getScheduleScans({ list_scheduled_scans, page: currentPage, totalPages }));
    } catch (err: any) {
      console.error('Error fetching Schedule Scans:', err);
      dispatch(setError('Failed to fetch Schedule Scans'));
    }
  };

export const fetchScheduleScanDetail = (scanId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}/${scanId}/`);
    dispatch(getScheduleScanDetail(response.data));
  } catch (err: any) {
    console.error('Error fetching Schedule Scan Detail:', err);
    dispatch(setError('Failed to fetch Schedule Scan Detail'));
    throw err;
  }
};

export const deactivateScheduleScanById = (scanId: number) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${getApiUrl()}/${scanId}/deactivate`);
  } catch (err: any) {
    console.error('Error deactivate Schedule Scan:', err);
    dispatch(setError('Failed to deactivate Schedule Scan'));
    throw err;
  }
};

export default ScheduleScansSlice.reducer;
