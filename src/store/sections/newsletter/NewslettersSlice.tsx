import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import { Data, NewsletterType } from 'src/types/newsletters/newsletter';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

function getApiUrl() {
  return `${getBaseApiUrl()}/newsletters/`;
}

function getDownloadUrl() {
  return `${getBaseApiUrl()}/newsletters/download?gid=`;
}

interface StateType {
  newsletters: NewsletterType[];
  newsletterDetails: Data | null;
  fileContent: string | null;
  page: number;
  totalPages: number;
  loading: boolean;
  pageSize: number;
  error: string | null;
}

const initialState: StateType = {
  newsletters: [],
  newsletterDetails: null,
  fileContent: null,
  page: 1,
  totalPages: 1,
  pageSize: 10,
  loading: false,
  error: null,
};

export const NewsletterSlice = createSlice({
  name: 'newsletter',
  initialState,
  reducers: {
    getNewsletters: (state, action) => {
      state.newsletters = Array.isArray(action.payload.results) ? action.payload.results : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    getNewsletterDetail: (state, action) => {
      state.newsletterDetails = action.payload.data;
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
  },
});

export const {
  getNewsletters,
  getNewsletterDetail,
  setFileContent,
  setPage,
  setError,
  setLoading,
  setPageSize,
} = NewsletterSlice.actions;

export const fetchNewsletters =
  (requestedPage = 1, pageSize = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${getApiUrl()}?page=${requestedPage}&page_size=${pageSize}`,
      );
      const cloudInventoryList = response.data;
      const { results, page, totalPages } = cloudInventoryList;
      dispatch(getNewsletters({ results, currentPage: page, totalPages, pageSize }));
      dispatch(setLoading(false));
    } catch (err: any) {
      console.error('Error fetching newsletters', err);
      dispatch(setError('Failed to fetch newsletters'));
    }
  };

export const fetchNewsLetterById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}${id}/`);

    if (response.status === 200) {
      dispatch(getNewsletterDetail({ data: response.data }));
    } else {
      dispatch(setError('fetch newsletter detail not found'));
    }
  } catch (err: any) {
    console.error('Error fetching newsletter detail:', err);
    dispatch(setError('Failed to fetch newsletter detail'));
  }
};

export const downloadNewsletter =
  (gid: string, namedoc: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${getDownloadUrl()}${gid}`, {
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

export const fetchFileContent = (gid: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}${gid}/get_file_content/`);

    if (response.status === 200) {
      dispatch(setFileContent({ content: response.data.content }));
    } else {
      dispatch(setError('Failed to fetch file content'));
    }
  } catch (err: any) {
    console.error('Error fetching file content:', err);
    dispatch(setError('Failed to fetch file content'));
  }
};

export default NewsletterSlice.reducer;
