import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../Store";
import axios from 'src/utils/axios';
import { NewsletterType } from "src/types/newsletters/newsletter";

const API_URL = '/api/data/newsletter';

interface StateType {
  newsletters: NewsletterType[];
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  newsletters: [],
  page: 1,
  totalPages: 1,
  error: null,
};

export const NewsletterSlice = createSlice({
  name: 'newsletter',
  initialState,
  reducers: {
    getNewsletters: (state, action) => {
      state.newsletters = Array.isArray(action.payload.newsletters) ? action.payload.newsletters : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages; 
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { getNewsletters, setPage, setError } = NewsletterSlice.actions;

// Async thunk for fetching technologies with pagination (READ)
export const fetchNewsletters = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    const { newsletters, currentPage, totalPages } = response.data;
    dispatch(getNewsletters({ newsletters, currentPage, totalPages })); // Dispatch to update state
  } catch (err: any) {
    console.error('Error fetching newsletters', err);
    dispatch(setError('Failed to fetch newsletters'));
  }
};

export default NewsletterSlice.reducer;
