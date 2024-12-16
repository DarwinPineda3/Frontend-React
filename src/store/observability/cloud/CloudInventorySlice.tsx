import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import { Data } from 'src/types/newsletters/newsletter';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

function getApiUrl() {
  return `${getBaseApiUrl()}/inventory-cloud/`;
}

interface StateType {
  cloudInventoryList: any[];
  cloudInventoryDetails: Data | null;
  fileContent: string | null;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  cloudInventoryList: [],
  cloudInventoryDetails: null,
  fileContent: null,
  page: 1,
  totalPages: 1,
  error: null,
};

export const CloudInventorySlice = createSlice({
  name: 'cloudInventory',
  initialState,
  reducers: {
    getCloudInventoryList: (state, action) => {
      state.cloudInventoryList = Array.isArray(action.payload.cloudInventoryList)
        ? action.payload.cloudInventoryList
        : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    getCloudInventoryDetail: (state, action) => {
      state.cloudInventoryDetails = action.payload.data;
    },
    addCloudInventory: (state, action) => {
      state.cloudInventoryList.push(action.payload);
    },
    setFileContent: (state, action) => {
      state.fileContent = action.payload.content;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getCloudInventoryList, getCloudInventoryDetail, addCloudInventory, setFileContent, setPage, setError } = CloudInventorySlice.actions;

export const fetchCloudInventoryList =
  (page = 1) =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await axios.get(`${getApiUrl()}`);
        const cloudInventoryList = response.data;
        const totalPages = Math.ceil(cloudInventoryList.length / 10);
        dispatch(getCloudInventoryList({ cloudInventoryList, currentPage: page, totalPages }));
      } catch (err: any) {
        console.error('Error fetching cloudInventoryList', err);
        dispatch(setError('Failed to fetch cloudInventoryList'));
      }
    };

export const fetchCloudInventoryById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}${id}/`);

    if (response.status === 200) {
      dispatch(getCloudInventoryDetail({ data: response.data }));
    } else {
      dispatch(setError('fetch cloudInventory detail not found'));
    }
  } catch (err: any) {
    console.error('Error fetching cloudInventory detail:', err);
    dispatch(setError('Failed to fetch cloudInventory detail'));
  }
};

export const createCloudScan = (newCloudScan: any) => async (dispatch: AppDispatch) => {
  try {
    const formData = new FormData();

    formData.append('provider', newCloudScan.provider);
    formData.append('aws_id', newCloudScan.aws_id);
    formData.append('aws_secret', newCloudScan.aws_secret);
    formData.append('azure_client_id', newCloudScan.azure_client_id);
    formData.append('azure_tenant_id', newCloudScan.azure_tenant_id);
    formData.append('azure_client_secret', newCloudScan.azure_client_secret);

    if (newCloudScan.gcp_credentials_json_file) {
      formData.append('gcp_credentials_json_file', newCloudScan.gcp_credentials_json_file);
    }
    const response = await axios.post(getApiUrl(), formData);
    dispatch(addCloudInventory(response.data));
  } catch (err: any) {
    dispatch(setError(err.response))
    console.error('Error creating inventory:', err);
    dispatch(setError('Failed to create inventory'));
  }
};

export default CloudInventorySlice.reducer;
