import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import { AppDispatch } from 'src/store/Store';
import {
  NetworkScanReport,
  NetworkScanReportDetail,
  NetworkScanType,
  ResponseData,
  Scan,
} from 'src/types/vulnerabilities/network/networkScansType';
import axios from 'src/utils/axios';
function getApiUrl() {
  return `${getBaseApiUrl()}/vulnerabilities/network/scans`;
}

function getApiUrlCreate() {
  return `${getBaseApiUrl()}/vulnerabilities/network/scans/create`;
}
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
      state.networkScanDetail = action.payload.detail;
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
    deleteNetworkScan: (state, action) => {
      state.networkScans = state.networkScans.filter(
        (networkScan) => networkScan.id_elastic !== action.payload,
      );
    },
    deleteNetworkReport: (state, action) => {
      state.networkScanReports = state.networkScanReports.filter(
        (networkScan) => networkScan.id !== action.payload,
      );
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
  deleteNetworkScan,
  deleteNetworkReport,
  setPage,
  setPageSize,
  setError,
} = NetworkScanSlice.actions;

// Async thunk for fetching NetworkScans with pagination (READ)
export const fetchNetworkScans =
  (page = 1, pageSize = 25) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${getApiUrl()}?page=${page}&page_size=${pageSize}`);
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
        `${getApiUrl()}/reports/${scanId}/?page=${page}&page_size=${pageSize}`,
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
    const response = await axios.get(`${getApiUrl()}/${scanId}`);
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
      const response = await axios.get(`${getApiUrl()}/reports/${scanId}/reports/${reportId}`);
      const data = response.data;
      dispatch(getNetworkScanReportDetail(data));
    } catch (err: any) {
      console.error('Error fetching Network Scan Detail:', err);
      dispatch(setError('Failed to fetch Network Scan Detail'));
    }
  };

export const fetchNetworkScanCreate = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrlCreate()}`);
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
      const response = await axios.post(`${getApiUrlCreate()}/`, networkScan);
      dispatch(addNetworkScan(response.data));
    } catch (err: any) {
      console.error('Error creating Network Scans:', err);
      dispatch(setError('Failed to create Network Scans'));
    }
  };

export const removeNetworkScan = (scanId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${getApiUrl()}/${scanId}/`);
    dispatch(deleteNetworkScan(scanId));
  } catch (err: any) {
    console.error('Error deleting  Network Scan:', err);
    dispatch(setError('Failed to delete  Network Scan'));
  }
};

export const removeNetworkScanReport = (scanId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${getApiUrl()}/reports/${scanId}/`);
    dispatch(deleteNetworkReport(scanId));
  } catch (err: any) {
    console.error('Error deleting  Network Scan:', err);
    dispatch(setError('Failed to delete  Network Scan'));
  }
};

export const downloadNetworkScanReport =
  (name_prefix: string, report_tool: string, idElastic: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${getApiUrl()}/reports/generate-report/`,
        {
          name_prefix,
          report_tool,
          idElastic,
        },
        { responseType: 'blob' },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', response.headers['content-disposition'].split('filename=')[1]);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      console.error('Error downloading the report:', err);
      dispatch(setError('Failed to download Network Scan report'));
    }
  };

export default NetworkScanSlice.reducer;
