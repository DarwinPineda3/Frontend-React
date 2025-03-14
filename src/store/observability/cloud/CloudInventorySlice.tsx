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
  loading: boolean;
  pageSize: number;
  error: string | null;
}

const initialState: StateType = {
  cloudInventoryList: [],
  cloudInventoryDetails: null,
  fileContent: null,
  page: 1,
  totalPages: 1,
  pageSize: 25,
  loading: false,
  error: null,
};

export const CloudInventorySlice = createSlice({
  name: 'cloudInventory',
  initialState,
  reducers: {
    getCloudInventoryList: (state, action) => {
      state.cloudInventoryList = Array.isArray(action.payload.results)
        ? action.payload.results
        : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.pageSize = action.payload.pageSize;
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    resetCloudInventoryDetails: (state) => {
      state.cloudInventoryDetails = null; 
    },
  },
});

export const {
  getCloudInventoryList,
  getCloudInventoryDetail,
  addCloudInventory,
  setFileContent,
  setPage,
  setError,
  setLoading,
  setPageSize,
  resetCloudInventoryDetails,
} = CloudInventorySlice.actions;

export const fetchCloudInventoryList =
  (requestedPage = 1, pageSize = 25) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${getApiUrl()}?page=${requestedPage}&page_size=${pageSize}`,
      );
      const cloudInventoryList = response.data;
      const { results, page, totalPages } = cloudInventoryList;
      dispatch(getCloudInventoryList({ results, currentPage: page, totalPages, pageSize }));
      dispatch(setLoading(false));
    } catch (err: any) {
      console.error('Error fetching cloudInventoryList', err);
      dispatch(setError('Failed to fetch cloudInventoryList'));
    }
  };

export const fetchCloudInventoryById = (id: string) => async (dispatch: AppDispatch) => {
  try {

    dispatch(resetCloudInventoryDetails());
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

export const createCloudInventory = (newCloudinventory: any) => async (dispatch: AppDispatch) => {
  try {
    const formData = new FormData();

    formData.append('provider', newCloudinventory.provider);
    formData.append('aws_id', newCloudinventory.aws_id);
    formData.append('aws_secret', newCloudinventory.aws_secret);
    formData.append('azure_client_id', newCloudinventory.azure_client_id);
    formData.append('azure_tenant_id', newCloudinventory.azure_tenant_id);
    formData.append('azure_client_secret', newCloudinventory.azure_client_secret);

    if (newCloudinventory.gcp_credentials_json_file) {
      formData.append('gcp_credentials_json_file', newCloudinventory.gcp_credentials_json_file);
    }
    const response = await axios.post(getApiUrl(), formData);
    dispatch(addCloudInventory(response.data));
  } catch (err: any) {
    dispatch(setError(err.response) || 'Failed to create inventory');
    throw err;
  }
};

export default CloudInventorySlice.reducer;
