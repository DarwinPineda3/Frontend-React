import { createSlice } from '@reduxjs/toolkit';
import { getTenant } from 'src/guards/jwt/Jwt';
import { Data, NewsletterType } from 'src/types/newsletters/newsletter';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

const tenant = getTenant()
const base_api_url = import.meta.env.VITE_API_BACKEND_BASE_URL_TEMPLATE.replace("{}", tenant);
const API_URL = `${base_api_url}/api/newsletters/`;
const DOWNLOAD_URL = `${API_URL}download?gid=`;

interface StateType {
  newsletters: NewsletterType[];
  newsletterDetails: Data | null;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  newsletters: [],
  newsletterDetails: null,
  page: 1,
  totalPages: 1,
  error: null,
};

export const NewsletterSlice = createSlice({
  name: 'newsletter',
  initialState,
  reducers: {
    getNewsletters: (state, action) => {
      state.newsletters = Array.isArray(action.payload.newsletters)
        ? action.payload.newsletters
        : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    getNewsletterDetail: (state, action) => {
      state.newsletterDetails = action.payload.data;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getNewsletters, getNewsletterDetail, setPage, setError } = NewsletterSlice.actions;

// Async thunk for fetching technologies with pagination (READ)
export const fetchNewsletters =
  (page = 1) =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await axios.get(`${API_URL}`);
        const newsletters = response.data;
        const totalPages = Math.ceil(newsletters.length / 10);
        dispatch(getNewsletters({ newsletters, currentPage: page, totalPages })); // Dispatch to update state
      } catch (err: any) {
        console.error('Error fetching newsletters', err);
        dispatch(setError('Failed to fetch newsletters'));
      }
    };

export const fetchNewsLetterById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);

    if (response.status === 200) {
      dispatch(getNewsletterDetail({ data: response.data.newsletter }));
    } else {
      dispatch(setError('fetch newsletter detail not found'));
    }
  } catch (err: any) {
    console.error('Error fetching newsletter detail:', err);
    dispatch(setError('Failed to fetch newsletter detail'));
  }
};

export const downloadNewsletter = (gid: string, namedoc: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${DOWNLOAD_URL}${gid}`, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;

    link.setAttribute('download', `${namedoc}`);
    document.body.appendChild(link);
    link.click();

    // Limpiando memoria
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (err: any) {
    console.error('Error downloading newsletter:', err);
    dispatch(setError('Failed to download newsletter'));
  }
};

export default NewsletterSlice.reducer;
