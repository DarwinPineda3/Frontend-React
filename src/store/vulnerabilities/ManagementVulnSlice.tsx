import { createSlice } from '@reduxjs/toolkit';
import { managementVulnerabilityType } from 'src/types/vulnerabilities/vulnerabilityManagementType';
import axios from 'src/utils/axios';
import { AppDispatch } from '../Store';

const API_URL = '/api/data/vulnerabilities/management';

interface StateType {
  managedVuln: managementVulnerabilityType[];
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  managedVuln: [],
  page: 1,
  totalPages: 1,
  error: null,
};

export const ManagedVulnSlice = createSlice({
  name: 'managedVuln',
  initialState,
  reducers: {
    getManagedVuln: (state, action) => {
      state.managedVuln = Array.isArray(action.payload.managedVuln)
        ? action.payload.managedVuln
        : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getManagedVuln, setPage, setError } = ManagedVulnSlice.actions;

// Async thunk for fetching vulnerabilities with pagination (READ)
export const fetchmanagedVuln =
  (page = 1) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}`);
      const { managedVuln, currentPage, totalPages } = response.data;
      dispatch(getManagedVuln({ managedVuln, currentPage, totalPages })); // Dispatch to update state
    } catch (err: any) {
      console.error('Error fetching managed vulnerabilities:', err);
      dispatch(setError('Failed to fetch managed vulnerabilities'));
    }
  };

export default ManagedVulnSlice.reducer;
