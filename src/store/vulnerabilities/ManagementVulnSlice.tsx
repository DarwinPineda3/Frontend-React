import { createSlice } from '@reduxjs/toolkit';
import { managementVulnerabilityType } from 'src/types/vulnerabilities/vulnerabilityManagementType';
import axios from 'src/utils/axios';
import { AppDispatch } from '../Store';

const API_URL = '/api/data/vulnerabilities/management';
const DETAIL_API_URL = '/api/data/vulnerabilities/detail/management';
const UPDATE_API_URL = '/api/data/vulnerabilities/form/management';

interface StateType {
  managedVuln: managementVulnerabilityType[];
  selectedVulnerability: managementVulnerabilityType | null;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  managedVuln: [],
  selectedVulnerability: null,
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
    getVulnerabilityById: (state, action) => {
      state.selectedVulnerability = action.payload;
    },
    updateVulnerability: (state, action) => {
      const index = state.managedVuln.findIndex(
        (managedVuln) => managedVuln.id === action.payload.id,
      );
      if (index !== -1) {
        state.managedVuln[index] = action.payload;
      }
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getManagedVuln, getVulnerabilityById, updateVulnerability, setPage, setError } =
  ManagedVulnSlice.actions;

// Async thunk for fetching vulnerabilities with pagination (READ)
export const fetchManagedVuln =
  (page = 1) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}`);
      const { managedVuln, currentPage, totalPages } = response.data;
      dispatch(getManagedVuln({ managedVuln, currentPage, totalPages }));
    } catch (err: any) {
      console.error('Error fetching managed vulnerabilities:', err);
      dispatch(setError('Failed to fetch managed vulnerabilities'));
    }
  };

export const fetchVulnerabilityById = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${DETAIL_API_URL}/${id}`);
    dispatch(getVulnerabilityById(response.data));
  } catch (err: any) {
    console.error(`Error fetching vulnerability with ID ${id}:`, err);
    dispatch(setError('Failed to fetch vulnerability by ID'));
  }
};

export const editVulnerability =
  (vulnerability: managementVulnerabilityType) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(`${UPDATE_API_URL}/${vulnerability?.id!}`, vulnerability);
      dispatch(updateVulnerability(response.data.vulnerability));
    } catch (err: any) {
      console.error('Error updating vulnerability:', err.response || err.message || err);
      dispatch(setError('Failed to update vulnerability'));
    }
  };

export default ManagedVulnSlice.reducer;
