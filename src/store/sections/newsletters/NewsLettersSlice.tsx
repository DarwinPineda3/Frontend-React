import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../Store";
import axios from 'src/utils/axios';
import { NewsLettersType } from "src/types/newsletters/newsletters";

const API_URL = '/api/data/newsLetter';

interface StateType {
  newsLetters: NewsLettersType[];
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  newsLetters: [],
  page: 1,
  totalPages: 1,
  error: null,
};

export const NewsLetterSlice = createSlice({
  name: 'newsLetter',
  initialState,
  reducers: {
    getNewsLetters: (state, action) => {
      state.newsLetters = Array.isArray(action.payload.newsLetters) ? action.payload.newsLetters : [];
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

export const { getNewsLetters, setPage, setError } = NewsLetterSlice.actions;

// Async thunk for fetching technologies with pagination (READ)
export const fetchNewsLetters = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    const { newsLetters, currentPage, totalPages } = response.data;
    dispatch(getNewsLetters({ newsLetters, currentPage, totalPages })); // Dispatch to update state
  } catch (err: any) {
    console.error('Error fetching newsLetters', err);
    dispatch(setError('Failed to fetch newsLetters'));
  }
};

export default NewsLetterSlice.reducer;
