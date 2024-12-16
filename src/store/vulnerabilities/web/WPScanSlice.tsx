import { createSlice } from "@reduxjs/toolkit";
import { getBaseApiUrl } from "src/guards/jwt/Jwt";
import axios from 'src/utils/axios';
import { AppDispatch } from "../../Store";

// const tenant = getTenant()
// const base_api_url = import.meta.env.VITE_API_BACKEND_BASE_URL_TEMPLATE.replace("{}", tenant);
// const API_URL = `${base_api_url}/api/wpscans/`;

function getApiUrl() {
  return `${getBaseApiUrl()}/wpscans/`;
}
interface StateType {
  wpscans: any[];
  wpscan: any | null;
  page: number;
  totalPages: number;
  error: string | null;
  isLoading: boolean;
}

const initialState: StateType = {
  wpscans: [],
  wpscan: null,
  page: 1,
  totalPages: 1,
  error: null,
  isLoading: false,
};

export const WPScanSlice = createSlice({
  name: 'wpscans',
  initialState,
  reducers: {
    getWPScans: (state, action) => {
      state.wpscans = Array.isArray(action.payload.wpscans) ? action.payload.wpscans : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.isLoading = false;
    },
    getWPScan: (state, action) => {
      state.wpscan = action.payload.data;
      state.isLoading = false;
    },
    addWPScan: (state, action) => {
      state.wpscans.push(action.payload);
    },
    removeWPScan: (state, action) => {
      state.wpscans = state.wpscans.filter(scan => scan.id !== action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLoading: (state) => {
      state.isLoading = true;
    }
  }
});

export const { getWPScans, getWPScan, addWPScan, removeWPScan, setPage, setError, setLoading } = WPScanSlice.actions;

export const fetchWPScans = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}`);

    const totalPages = Math.ceil(response.data.length / 10);
    dispatch(getWPScans({ wpscans: response.data, currentPage: page, totalPages }));
  } catch (err: any) {
    console.error('Error fetching wpscans:', err);
    dispatch(setError('Failed to fetch wpscans'));
  }
};


export const fetchWPScanById = (wpscanId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(`${getApiUrl()}${wpscanId}/`);

    if (response.status === 200) {
      dispatch(getWPScan({ data: response.data }));
    } else {
      dispatch(setError('fetch WPScan not found'));
    }
  } catch (err: any) {
    console.error('Error fetching WPScan detail:', err);
    dispatch(setError('Failed to fetch WPScan detail'));
  }
};


// export const createWPScan = (newWPScan: any) => async (dispatch: AppDispatch) => {
//   try {
//     const response = await axios.post(`${getApiUrl()}`, newWPScan);

//     dispatch(addWPScan(response.data));
//   } catch (err: any) {
//     console.error('Error creating WPScan:', err);
//     dispatch(setError('Failed to create WPScan'));
//   }
// };

export const createWPScan = (newWPScan: any) => async (dispatch: AppDispatch) => {
  let response = null
  try {
    response = await axios.post(`${getApiUrl()}`, newWPScan);
    
    dispatch(addWPScan(response.data));
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || "Failed to create WPScan.";
      response = {error: "Failed to create WPScan."}
      console.error(errorMessage);
      // throw new Error(errorMessage);
      return response
  }
};


export const downloadWPScanReport = (id: string) => async () => {
  try {
    const response = await axios.get(`${getApiUrl()}download/?id=${id}`, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    const fileName = `Vulnerabilities-web-wordpress_${id}_${new Date().toISOString().split('T')[0]}.json`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (err: any) {
    console.error('Error downloading report:', err);
  }
};

export const deleteWPScan = (wpscanId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.delete(`${getApiUrl()}${wpscanId}`);

    if (response.status === 200) {
      dispatch(removeWPScan(wpscanId));
    } else {
      dispatch(setError('Failed to delete WPScan'));
    }
  } catch (err: any) {
    console.error('Error deleting WPScan:', err);
    dispatch(setError('Failed to delete WPScan'));
  }
};

export default WPScanSlice.reducer;