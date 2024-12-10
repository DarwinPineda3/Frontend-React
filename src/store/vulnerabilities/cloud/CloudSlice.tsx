import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import { Data } from 'src/types/newsletters/newsletter';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

function getApiUrl() {
  return `${getBaseApiUrl()}/prowler-vulnerabilities/`;
}

// function getDownloadUrl() {
//   return `${getBaseApiUrl()}/newsletters/download?gid=`;
// }

interface StateType {
  cloudScans: any[];
  cloudScanDetails: Data | null;
  fileContent: string | null;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  cloudScans: [],
  cloudScanDetails: null,
  fileContent: null,
  page: 1,
  totalPages: 1,
  error: null,
};

export const CloudScansSlice = createSlice({
  name: 'cloudscans',
  initialState,
  reducers: {
    getCloudScans: (state, action) => {
      state.cloudScans = Array.isArray(action.payload.cloudScans)
        ? action.payload.cloudScans
        : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    getCloudScanDetail: (state, action) => {
      state.cloudScanDetails = action.payload.data;
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

export const { getCloudScans, getCloudScanDetail, setFileContent, setPage, setError } = CloudScansSlice.actions;

export const fetchCloudScans =
  (page = 1) =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await axios.get(`${getApiUrl()}`);
        const cloudScans = response.data;
        const totalPages = Math.ceil(cloudScans.length / 10);
        dispatch(getCloudScans({ cloudScans, currentPage: page, totalPages }));
      } catch (err: any) {
        console.error('Error fetching cloudScans', err);
        dispatch(setError('Failed to fetch cloudScans'));
      }
    };

export const fetchCloudScanById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}${id}/`);

    if (response.status === 200) {
      dispatch(getCloudScanDetail({ data: response.data }));
    } else {
      dispatch(setError('fetch cloudscan detail not found'));
    }
  } catch (err: any) {
    console.error('Error fetching cloudscan detail:', err);
    dispatch(setError('Failed to fetch cloudscan detail'));
  }
};


export default CloudScansSlice.reducer;
