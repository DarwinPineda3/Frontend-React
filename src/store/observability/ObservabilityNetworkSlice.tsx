import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import axios from 'src/utils/axios';
import { AppDispatch } from '../Store';

function getMonitoringApiUrl() {
  return `${getBaseApiUrl()}/observed-network`;
}

interface NetworkScan {
  id: string;
  name: string;
}

interface StateType {
  networkScansData: NetworkScan[];
  page: number;
  totalPages: number;
  pageSize: number;
  loading: boolean;
  networkScansDetail: any | null;
  error: string | null;
}

const initialState: StateType = {
  networkScansData: [],
  networkScansDetail: null,
  page: 1,
  totalPages: 1,
  pageSize: 25,
  loading: false,
  error: null,
};

const networkObservabilitySlice = createSlice({
  name: 'observed-network',
  initialState,
  reducers: {
    getNetworkObservabilityList: (state, action) => {
      state.networkScansData = action.payload.results;
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.pageSize = action.payload.pageSize;
    },
    getNetworkObservabilityDetail: (state, action) => {
      state.networkScansDetail = action.payload.data;
    },
    createNetworkObservabilityScan: (state, action) => {
      state.networkScansData.push(action.payload.data);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    resetNetworkScanDetails: (state) => {
      state.networkScansDetail = null; 
    },
  },
});

export const {
  getNetworkObservabilityList,
  getNetworkObservabilityDetail,
  setError,
  setLoading,
  setPage,
  setPageSize,
  resetNetworkScanDetails,
} = networkObservabilitySlice.actions;

// Async thunk for fetching Network Observability list with pagination (READ)
export const fetchNetworkObservabilityData =
  (requestedPage: number, pageSize: number = 25) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = (
        await axios.get(`${getMonitoringApiUrl()}?page=${requestedPage}&page_size=${pageSize}`)
      ).data;

      const scans = response.results;
      const totalPages = response.totalPages;
      const currentPage = response.page;
      // order by scan_start
      scans.sort(
        (a: any, b: any) => new Date(b.scan_start).getTime() - new Date(a.scan_start).getTime(),
      );

      dispatch(
        getNetworkObservabilityList({
          results: scans,
          currentPage,
          totalPages,
          pageSize,
        }),
      );
      dispatch(setLoading(false));
    } catch (err: any) {
      console.error('Error fetching Network Observability data:', err);
      dispatch(setError('Failed to fetch Network Observability data'));
    }
  };

export const fetchNetworkObservabilityById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getMonitoringApiUrl()}/${id}`);

    if (response.status === 200) {
      const graph_old = JSON.parse(response.data.dataneo);
      response.data['graphs'] = Object.entries(graph_old).map(([host, graph]) => {
        if (!graph.nodes || graph.nodes.length === 0) {
          graph.nodes = [{ id: host, label: 'Host', properties: { name: host } }];
        }
        return {
          host,
          graph,
        };
      });
      dispatch(getNetworkObservabilityDetail({ data: response.data }));
      return response.data; // Return the modified data for further processing.
    } else {
      dispatch(setError('fetch Network Observability detail not found'));
      throw new Error('Network Observability detail not found');
    }
  } catch (err: any) {
    console.error('Error fetching Network Observability detail:', err);
    dispatch(setError('Failed to fetch Network Observability detail'));
    throw err; // Re-throw the error for the caller to handle.
  }
};

export const createNetworkObservabilityScan =
  (newNetworkScan: any) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(`${getMonitoringApiUrl()}/`, newNetworkScan);

      if (response.status === 201) {
        dispatch(fetchNetworkObservabilityData(1));
      } else {
        dispatch(setError('Failed to create Network Observability scan'));
      }
    } catch (err: any) {
      console.error('Error creating Network Observability scan:', err);
      dispatch(setError('Failed to create Network Observability scan'));
    }
  };

export const deleteNetworkObservabilityScan = (scanId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.delete(`${getMonitoringApiUrl()}/${scanId}`);
    if (response.status === 200) {
      dispatch(fetchNetworkObservabilityData(1));
    } else {
      dispatch(setError('Failed to delete Network Observability scan'));
    }
  } catch (err: any) {
    console.error('Error deleting Network Observability scan:', err);
    dispatch(setError('Failed to delete Network Observability scan'));
  }
};

export default networkObservabilitySlice.reducer;
