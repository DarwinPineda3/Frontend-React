import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../Store";
import axios from 'src/utils/axios';
import { vulnerabilityType } from "src/types/vulnerabilities/vulnerabilityType";

const API_URL = '/api/data/summary';

interface StateType {
    summaryVuln: vulnerabilityType[];
    page: number;
    totalPages: number;
    error: string | null;
}

const initialState: StateType = {
    summaryVuln: [],
    page: 1,
    totalPages: 1,
    error: null,
};

export const SummaryVulnSlice = createSlice({
    name: 'summaryVuln',
    initialState,
    reducers: {
        getSummaryVuln: (state, action) => {
            state.summaryVuln = Array.isArray(action.payload.summaryVuln) ? action.payload.summaryVuln : [];
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

export const { getSummaryVuln, setPage, setError } = SummaryVulnSlice.actions;

// Async thunk for fetching vulnerabilities with pagination (READ)
export const fetchSummaryVuln = (page = 1) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${API_URL}?page=${page}`);
        const { summaryVuln, currentPage, totalPages } = response.data;
        dispatch(getSummaryVuln({ summaryVuln, currentPage, totalPages })); // Dispatch to update state
    } catch (err: any) {
        console.error('Error fetching summary vulnerabilities:', err);
        dispatch(setError('Failed to fetch summary vulnerabilities'));
    }
};

export default SummaryVulnSlice.reducer;
