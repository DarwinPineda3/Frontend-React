import { createSlice } from "@reduxjs/toolkit";
import { getBaseApiUrl } from "src/guards/jwt/Jwt";
import axios from 'src/utils/axios';
import { AppDispatch } from "../../Store";


function getApiUrl() {
  return `${getBaseApiUrl()}/wpscans/`;
}
interface StateType {
  wpscans: any[];
  wpscan: any | null;
  page: number;
  totalPages: number;
  // loading: boolean;
  pageSize: number;
  error: string | null;
  isLoading: boolean;
}

const initialState: StateType = {
  wpscans: [],
  wpscan: null,
  page: 1,
  totalPages: 1,
  pageSize: 10,
  // loading: false,
  error: null,
  isLoading: false,
};

export const WPScanSlice = createSlice({
  name: 'wpscans',
  initialState,
  reducers: {
    getWPScans: (state, action) => {
      state.wpscans = Array.isArray(action.payload.results) ? action.payload.results : [];
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
    setLoading: (state, action) => {
      state.isLoading = true;
    }
  }
});

export const { getWPScans, getWPScan, addWPScan, removeWPScan, setPage, setError, setLoading } = WPScanSlice.actions;

export const fetchWPScans = (
    requestedPage = 1,
    pageSize = 10
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
        if (pageSize !== initialState.pageSize) {
          requestedPage = 1;
        }
        const response = await axios.get(`${getApiUrl()}?page=${requestedPage}&page_size=${pageSize}`);
        const wpscans = response.data;
        const { results, page, totalPages } = wpscans;
        dispatch(getWPScans({ results, currentPage: page, totalPages, pageSize }));
        dispatch(setLoading(false));
    } catch (err: any) {
      console.error('Error fetching wpscans:', err);
      dispatch(setError('Failed to fetch wpscans'));
    }
  };


export const fetchWPScanById = (wpscanId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${getApiUrl()}${wpscanId}/`);

    if (response.status === 200) {
      dispatch(getWPScan({ data: response.data }));
    } else {
      dispatch(setError('fetch WPScan not found'));
    }
    dispatch(setLoading(false));
  } catch (err: any) {
    console.error('Error fetching WPScan detail:', err);
    dispatch(setError('Failed to fetch WPScan detail'));
  }
};


export const createWPScan = (newWPScan: any) => async (dispatch: AppDispatch) => {
  let response = null
  try {
    response = await axios.post(`${getApiUrl()}`, newWPScan);

    dispatch(addWPScan(response.data));
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || "Failed to create WPScan.";
    dispatch(setError(errorMessage));
    throw "Failed to create WPScan.";
  }
};


export const downloadWPScanReport = (id: string) => async (dispatch: AppDispatch) => {
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
    dispatch(setError('Error downloading report'));
    throw err.response.statusText;
  }
};

export const deleteWPScan = (wpscanId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.delete(`${getApiUrl()}${wpscanId}/`);

    if (response.status === 200) {
      dispatch(removeWPScan(wpscanId));
    } else {
      dispatch(setError('Failed to delete WPScan'));
      throw new Error('Failed to delete WPScan');
    }
    dispatch(setLoading(false));
  } catch (err: any) {
    dispatch(setError('Failed to delete WPScan'));
    throw err.response.data;
  }
};

export default WPScanSlice.reducer;