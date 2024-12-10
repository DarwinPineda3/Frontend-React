import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import {
  managementVulnerabilityType,
  VulnerabilityResponse,
} from 'src/types/vulnerabilities/vulnerabilityManagementType';
import axios from 'src/utils/axios';
import { AppDispatch } from '../Store';

function getApiUrl() {
  return `${getBaseApiUrl()}/vulnerabilities/management/`;
}
interface StateType {
  managedVuln: managementVulnerabilityType[];
  selectedVulnerability: VulnerabilityResponse | null;
  page: number;
  pageSize: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  managedVuln: [],
  selectedVulnerability: null,
  page: 1,
  pageSize: 25,
  totalPages: 1,
  error: null,
};

export const ManagedVulnSlice = createSlice({
  name: 'managedVuln',
  initialState,
  reducers: {
    getManagedVuln: (state, action) => {
      state.managedVuln = Array.isArray(action.payload.results) ? action.payload.results : [];
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
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getManagedVuln,
  getVulnerabilityById,
  updateVulnerability,
  setPage,
  setPageSize,
  setError,
} = ManagedVulnSlice.actions;

// Async thunk for fetching vulnerabilities with pagination (READ)
export const fetchManagedVuln =
  (page = 1, pageSize = 25) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${getApiUrl()}?page=${page}&page_size=${pageSize}`);
      const { results, page: currentPage, totalPages } = response.data;
      dispatch(getManagedVuln({ results, currentPage, totalPages }));
    } catch (err: any) {
      console.error('Error fetching managed vulnerabilities:', err);
      dispatch(setError('Failed to fetch managed vulnerabilities'));
    }
  };

export const fetchVulnerabilitiesByDateRange =
  (startDate: string, endDate: string, page = 1, pageSize = 25) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${getApiUrl()}by-range/`, {
        params: {
          startDate,
          endDate,
          page,
          page_size: pageSize,
        },
      });

      const { results, page: currentPage, totalPages } = response.data || {};

      if (Array.isArray(results)) {
        dispatch(
          getManagedVuln({
            results,
            currentPage,
            totalPages,
          }),
        );
      }
    } catch (err: any) {
      console.error('Error fetching vulnerabilities by date range:', err);
      dispatch(setError('Failed to fetch vulnerabilities by date range'));
    }
  };

export const fetchVulnerabilityById = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}${id}/`);
    dispatch(getVulnerabilityById(response.data));
  } catch (err: any) {
    console.error(`Error fetching vulnerability with ID ${id}:`, err);
    dispatch(setError('Failed to fetch vulnerability by ID'));
  }
};

export const createVulnerabilities =
  (vulnerabilities: managementVulnerabilityType[]) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(`${getApiUrl()}`, vulnerabilities);

      const { saved_correctly, managed } = response.data || {};

      if (Array.isArray(saved_correctly) && saved_correctly.length > 0) {
        dispatch(
          getManagedVuln({
            managedVuln: saved_correctly,
            currentPage: 1,
            totalPages: 1,
          }),
        );
      }

      return { saved_correctly, managed };
    } catch (err: any) {
      console.error('Error creando vulnerabilidades:', err.response || err.message || err);
      dispatch(setError('Failed to create vulnerabilities'));
      throw err;
    }
  };

export const editVulnerability = (vulnerability: FormData) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${getApiUrl()}${vulnerability.get('id')}/`, vulnerability);
    dispatch(updateVulnerability(response.data.vulnerability));
  } catch (err: any) {
    console.error('Error updating vulnerability:', err.response || err.message || err);
    dispatch(setError('Failed to update vulnerability'));
  }
};

export const closeVulnerability =
  (
    id: number,
    updatedFields: {
      closure_date?: string | null;
      status?: string;
      closure_reason?: string | null;
    },
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.patch(`${getApiUrl()}${id}/update-status/`, updatedFields);
      dispatch(updateVulnerability(response.data.vulnerability));
    } catch (err: any) {
      console.error('Error updating vulnerability:', err.response || err.message || err);
      dispatch(setError('Failed to update vulnerability'));
    }
  };

export const downloadEvidence = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}${id}/download-evidence/`, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', response.headers['content-disposition'].split('filename=')[1]);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err: any) {
    console.error('Error downloading the evidence:', err);
    dispatch(setError('Failed to download evidence'));
    throw err;
  }
};

export const downloadVulnerabilitiesReport =
  (startDate: string, endDate: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${getApiUrl()}download-report/`, {
        params: {
          startDate,
          endDate,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;

      const contentDisposition = response.headers['content-disposition'];
      const fileName = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/['"]/g, '')
        : 'ManagedVulnerabilities.xlsx';

      link.setAttribute('download', fileName);

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (err: any) {
      console.error('Error downloading the vulnerability report:', err);
      dispatch(setError('Error when trying to download the vulnerability report.'));
      throw err;
    }
  };

export default ManagedVulnSlice.reducer;
