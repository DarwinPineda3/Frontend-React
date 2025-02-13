import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import { ParameterCyberGuardType } from 'src/types/cyber-guard/parameters/parameter';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

function getApiUrl() {
  return `${getBaseApiUrl()}/parameters/`;
}

interface StateType {
  parameters: ParameterCyberGuardType[];
  page: number;
  totalPages: number;
  pageSize: number;
  error: string | null;
}

const initialState: StateType = {
  parameters: [],
  page: 1,
  totalPages: 1,
  pageSize: 25,
  error: null,
};

export const ParametersSlice = createSlice({
  name: 'parameters',
  initialState,
  reducers: {
    getParameters: (state, action) => {
      state.parameters = Array.isArray(action.payload.results) ? action.payload.results : [];
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    },
    addParameter: (state, action) => {
      state.parameters.push(action.payload);
    },
    updateParameter: (state, action) => {
      const index = state.parameters.findIndex((parameter) => parameter.id === action.payload.id);
      if (index !== -1) {
        state.parameters[index] = action.payload;
      }
    },
    deleteParameter: (state, action) => {
      state.parameters = state.parameters.filter((parameter) => parameter.id !== action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export const {
  getParameters,
  addParameter,
  updateParameter,
  deleteParameter,
  setPage,
  setPageSize,
  setError,
} = ParametersSlice.actions;

// Async thunk for fetching parameters with pagination (READ)
export const fetchParameters =
  (page = 1, pageSize = 25) =>
    async (dispatch: AppDispatch) => {
      try {
        const response = await axios.get(`${getApiUrl()}?page=${page}&page_size=${pageSize}`);
        const { results, page: currentPage, totalPages } = response.data;
        dispatch(getParameters({ results, page: currentPage, totalPages }));
      } catch (err: any) {
        console.error('Error fetching parameters:', err);
        dispatch(setError('Failed to fetch parameters'));
      }
    };

// Async thunk for creating a new parameter (CREATE)
export const createParameter =
  (newParameter: ParameterCyberGuardType) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(getApiUrl(), newParameter);
      dispatch(addParameter(response.data));
    } catch (err: any) {
      console.error('Error creating parameter:', err);
      const errorMessage = err.response?.data?.error || 'Failed to create parameter';
      dispatch(setError(errorMessage));
      throw err;
    }
  };

// Async thunk for updating an parameter (UPDATE)
export const editParameter =
  (updatedParameter: ParameterCyberGuardType) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(`${getApiUrl()}${updatedParameter.id}/`, updatedParameter);
      dispatch(updateParameter(response.data)); // Assuming the server returns the updated parameter
    } catch (err: any) {
      console.error('Error updating parameter:', err);
      dispatch(setError('Failed to update parameter'));
      throw err;
    }
  };

// Async thunk for deleting an parameter (DELETE)
export const removeParameter = (parameterId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${getApiUrl()}${parameterId}/`);
    dispatch(deleteParameter(parameterId));
  } catch (err: any) {
    console.error('Error deleting parameter:', err);
    dispatch(setError('Failed to delete parameter'));
  }
};

export default ParametersSlice.reducer;
