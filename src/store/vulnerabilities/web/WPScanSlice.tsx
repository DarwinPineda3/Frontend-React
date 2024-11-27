import { createSlice } from "@reduxjs/toolkit";
import { getTenant } from "src/guards/jwt/Jwt";
import axios from 'src/utils/axios';
import { AppDispatch } from "../../Store";

const tenant = getTenant()
const base_api_url = import.meta.env.VITE_API_BACKEND_BASE_URL_TEMPLATE.replace("{}", tenant);
const API_URL = `${base_api_url}/api/wpscans/`;
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
      state.wpscan = action.payload.wpscan;
      state.isLoading = false;
    },
    addWPScan: (state, action) => {
      state.wpscans.push(action.payload);
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

export const { getWPScans, getWPScan, addWPScan, setPage, setError, setLoading } = WPScanSlice.actions;

export const fetchWPScans = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);

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
    const response = await axios.get(`${API_URL}${wpscanId}`);
    console.log(response.data);
    

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
//     const formData = new FormData();

//     formData.append('subject', newWPScan.subject);
//     formData.append('description', newWPScan.description);
//     // formData.append('csrfmiddlewaretoken', csrfToken);

//     if (newWPScan.attach_file) {
//       formData.append('attach_file', newWPScan.attach_file);
//     }

//     const response = await axios.post(API_URL, formData);

//     dispatch(addWPScan(response.data));
//   } catch (err: any) {
//     console.error('Error creating ticket:', err);
//     dispatch(setError('Failed to create ticket'));
//   }
// };


export default WPScanSlice.reducer;