import { createSlice } from '@reduxjs/toolkit';
import { getTenant } from 'src/guards/jwt/Jwt';
import { AppDispatch } from 'src/store/Store';
import { NetworkScanType, ResponseData } from 'src/types/vulnerabilities/network/networkScansType';
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
  page: number;
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
  page: 1,
  totalPages: 1,
  error: null,
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
    addNetworkScan: (state, action) => {
      state.networkScans.push(action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getNetworkScans, addNetworkScan, getNetworkScanCreate, setPage, setError } =
  NetworkScanSlice.actions;

// Async thunk for fetching NetworkScans with pagination (READ)
export const fetchNetworkScans =
  (page = 1) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}`);
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
