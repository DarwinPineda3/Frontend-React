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
  networkScansDetail: any | null;
  error: string | null;
}

const initialState: StateType = {
  networkScansData: [],
  networkScansDetail: null,
  error: null,
};

const networkObservabilitySlice = createSlice({
  name: 'observed-network',
  initialState,
  reducers: {
    getNetworkObservabilityList: (state, action) => {
      state.networkScansData = action.payload.data;
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
  },
});

export const {
  getNetworkObservabilityList,
  getNetworkObservabilityDetail,
  setError
} = networkObservabilitySlice.actions;

// Async thunk for fetching Network Observability list with pagination (READ)
export const fetchNetworkObservabilityData =
  () =>
    async (dispatch: AppDispatch) => {
      try {
        const scans = (await axios.get(
          `${getMonitoringApiUrl()}`,
        )).data.scans;
        // order by scan_start
        scans.sort((a: any, b: any) => new Date(b.scan_start).getTime() - new Date(a.scan_start).getTime());

        dispatch(
          getNetworkObservabilityList({
            data: scans
          }),
        );
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
      response.data["graphs"] = Object.entries(graph_old).map(([host, graph]) => {
        if (!graph.nodes || graph.nodes.length === 0) {
          graph.nodes = [{ id: host, label: "Host", properties: { name: host } }];
        }
        return {
          host: host,
          graph: graph,
        };
      });
      dispatch(getNetworkObservabilityDetail({ data: response.data }));
    } else {
      dispatch(setError('fetch Network Observability detail not found'));
    }
  } catch (err: any) {
    console.error('Error fetching Network Observability detail:', err);
    dispatch(setError('Failed to fetch Network Observability detail'));
  }
};

export const createNetworkObservabilityScan = (newNetworkScan: any) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${getMonitoringApiUrl()}/`, newNetworkScan);

    if (response.status === 201) {
      dispatch(fetchNetworkObservabilityData());
    } else {
      dispatch(setError('Failed to create Network Observability scan'));
    }
  } catch (err: any) {
    console.error('Error creating Network Observability scan:', err);
    dispatch(setError('Failed to create Network Observability scan'));
  }
}
export default networkObservabilitySlice.reducer;
