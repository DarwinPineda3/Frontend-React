import { createSlice } from "@reduxjs/toolkit";
import { getTenant } from "src/guards/jwt/Jwt";
import axios from 'src/utils/axios';
import { AppDispatch } from "../../Store";

const tenant = getTenant()
const base_api_url = import.meta.env.VITE_API_BACKEND_BASE_URL_TEMPLATE.replace("{}", tenant);
const API_URL = `${base_api_url}/api/wpscans/`;
interface StateType {
  wpscans: any[];
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  wpscans: [],
  page: 1,
  totalPages: 1,
  error: null,
};

export const WPScanSlice = createSlice({
  name: 'wpscans',
  initialState,
  reducers: {
    getWPScans: (state, action) => {
      state.wpscans = Array.isArray(action.payload.wpscans) ? action.payload.wpscans : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    addWPScan: (state, action) => {
      state.wpscans.push(action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { getWPScans, addWPScan, setPage, setError } = WPScanSlice.actions;

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