import { createSlice } from '@reduxjs/toolkit';
import { getTenant } from 'src/guards/jwt/Jwt';
import { AppDispatch } from 'src/store/Store';
import {
  NetworkScanReport,
  NetworkScanReportDetail,
  NetworkScanType,
  ResponseData,
  Scan,
} from 'src/types/vulnerabilities/network/networkScansType';
import axios from 'src/utils/axios';

// Update to match the backend API endpoint
const tenant = getTenant();
const base_api_url = import.meta.env.VITE_API_BACKEND_BASE_URL_TEMPLATE.replace('{}', tenant);
const API_URL = `${base_api_url}/api/vulnerabilities/network/scans`;
const CREATE_SCAN_URL = `${base_api_url}/api/vulnerabilities/network/scans/create`;
interface NetworkScanCreateType {
  comment: string;
  hosts: string;
  name: string;
  scan_config_id: string;
}
interface StateType {
  networkScans: NetworkScanType[];
  networkScanCreate: ResponseData;
  networkScanReports: NetworkScanReport[];
  networkScanDetail: Scan;
  networkScanReportDetail: NetworkScanReportDetail;
  page: number;
  pageSize: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  networkScans: [],
  networkScanCreate: {
    assets: [],
    targets: [],
    scan_configs: [],
    error: null,
  },
  networkScanReports: [],
  page: 1,
  pageSize: 25,
  totalPages: 1,
  error: null,
  networkScanDetail: {
    id: '',
    name: '',
    comment: '',
    creation_time: '',
    modification_time: '',
    permission: '',
    usage_type: '',
    config: {
      id: '',
      name: '',
    },
    target: {
      id: '',
      name: '',
      hosts: '',
      asset_id: 0,
    },
    hosts_ordering: null,
    scanner: {
      id: '',
      name: '',
      type: '',
    },
    status: '',
    progress: '',
    report_count: {
      total: '',
      finished: '',
    },
    schedule: {
      id: null,
      name: null,
    },
    schedule_periods: '',
    observers: null,
    is_active: false,
    id_elastic: '',
  },
  networkScanReportDetail: {
    task_id: '',
    report: {
      id: '',
      name: '',
      comment: null,
      creation_time: '',
      modification_time: '',
      task: {
        id: '',
        name: '',
      },
      report: {
        scan_run_status: '',
        hosts: {
          count: '',
        },
        closed_cves: '',
        vulns: {
          count: '',
        },
        os: {
          count: 0,
        },
        apps: {
          count: 0,
        },
        ssl_certs: '',
        task: {
          id: '',
          name: '',
          comment: null,
          target: {
            id: '',
            name: '',
            comment: null,
          },
          id_elastic: '',
          hosts: '',
        },
        timestamp: '',
        scan_start: '',
        timezone: '',
        timezone_abbrev: '',
        ports: [],
        result_count: {
          full: '',
          filtered: '',
          hole: {
            full: '',
            filtered: '',
          },
          info: {
            full: '',
            filtered: '',
          },
          warning: {
            full: '',
            filtered: '',
          },
          false_positive: {
            full: '',
            filtered: '',
          },
        },
        severity: {
          full: '',
          filtered: '',
          hole: {
            full: '',
            filtered: '',
          },
          info: {
            full: '',
            filtered: '',
          },
          warning: {
            full: '',
            filtered: '',
          },
          false_positive: {
            full: '',
            filtered: '',
          },
        },
        scan_end: '',
        errors: {
          count: '',
        },
        host_list: [],
        results: [],
        vulnerabilities: [],
        scan_end_format: '',
      },
      statistics: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        count_vulnerabilities: 0,
      },
      is_last_report: false,
      elastic_id: '',
    },
    report_detail_chart_data: {
      labels: [],
      values: [],
    },
    list_os: [],
    id_elastic: '',
  },
};

export const NetworkScanSlice = createSlice({
  name: 'network-scans',
  initialState,
  reducers: {
    getNetworkScans: (state, action) => {
      state.networkScans = Array.isArray(action.payload.data) ? action.payload.data : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    getNetworkScanCreate: (state, action) => {
      state.networkScanCreate = action.payload;
    },
    getNetworkScanDetail: (state, action) => {
      state.networkScanDetail = action.payload;
    },
    getNetworkScanReports: (state, action) => {
      state.networkScanReports = Array.isArray(action.payload.data) ? action.payload.data : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    getNetworkScanReportDetail: (state, action) => {
      state.networkScanReportDetail = action.payload;
    },
    addNetworkScan: (state, action) => {
      state.networkScans.push(action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getNetworkScans,
  addNetworkScan,
  getNetworkScanReports,
  getNetworkScanCreate,
  getNetworkScanDetail,
  getNetworkScanReportDetail,
  setPage,
  setPageSize,
  setError,
} = NetworkScanSlice.actions;

// Async thunk for fetching NetworkScans with pagination (READ)
export const fetchNetworkScans =
  (page = 1, pageSize = 25) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}&page_size=${pageSize}`);
      const { list_task, page: currentPage, totalPages } = response.data;
      dispatch(
        getNetworkScans({
          data: list_task,
          currentPage,
          totalPages,
        }),
      );
    } catch (err: any) {
      console.error('Error fetching Network Scans:', err);
      dispatch(setError('Failed to fetch Network Scans'));
    }
  };

export const fetchNetworkScansReports =
  (page = 1, pageSize = 25, scanId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}/${scanId}/reports/?page=${page}&page_size=${pageSize}`,
      );
      const { results, page: currentPage, totalPages } = response.data;
      dispatch(
        getNetworkScanReports({
          data: results,
          currentPage,
          totalPages,
        }),
      );
    } catch (err: any) {
      console.error('Error fetching Network Scan Reports:', err);
      dispatch(setError('Failed to fetch Network Scans Reports'));
    }
  };

export const fetchNetworkScanDetail = (scanId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/${scanId}`);
    const { detail } = response.data;
    dispatch(getNetworkScanDetail({ detail }));
  } catch (err: any) {
    console.error('Error fetching Network Scan Detail:', err);
    dispatch(setError('Failed to fetch Network Scan Detail'));
  }
};

export const fetchNetworkScanReportDetail =
  (scanId: string, reportId: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${API_URL}/${scanId}/reports/${reportId}`);
      const data = response.data;
      dispatch(getNetworkScanReportDetail(data));
    } catch (err: any) {
      console.error('Error fetching Network Scan Detail:', err);
      dispatch(setError('Failed to fetch Network Scan Detail'));
    }
  };

export const fetchNetworkScanCreate = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${CREATE_SCAN_URL}`);
    const { assets, targets, scan_configs, error } = response.data;
    dispatch(getNetworkScanCreate({ assets, targets, scan_configs, error }));
  } catch (err: any) {
    console.error('Error fetching Network Scans:', err);
    dispatch(setError('Failed to fetch Network Scans'));
  }
};

export const createNetworkScan =
  (networkScan: NetworkScanCreateType) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(`${CREATE_SCAN_URL}/`, networkScan);
      dispatch(addNetworkScan(response.data));
    } catch (err: any) {
      console.error('Error creating Network Scans:', err);
      dispatch(setError('Failed to create Network Scans'));
    }
  };

export default NetworkScanSlice.reducer;
