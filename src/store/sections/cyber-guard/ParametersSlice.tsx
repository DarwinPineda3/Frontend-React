import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../Store";
import axios from 'src/utils/axios';
import { ParameterCyberGuardType } from "src/types/cyber-guard/parameters/parameter";

const API_URL = 'http://zaq12345.localhost:4500/api/assets/';

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
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages; 
    },
    addParameter: (state, action) => {
      state.parameters.push(action.payload);
    },
    updateParameter: (state, action) => {
      const index = state.parameters.findIndex(parameter => parameter.id === action.payload.id);
      if (index !== -1) {
        state.parameters[index] = action.payload;
      }
    },
    deleteParameter: (state, action) => {
      state.parameters = state.parameters.filter(parameter => parameter.id !== action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { getParameters, addParameter, updateParameter, deleteParameter, setPage, setError } = ParametersSlice.actions;

// Async thunk for fetching parameters with pagination (READ)
export const fetchParameters = (page = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    const { results, count } = response.data; // Assuming DRF pagination
    console.log(response);
    const totalPages = Math.ceil(count / 10); // Update 10 based on your page size
    dispatch(getParameters({ results, currentPage: page, totalPages })); // Dispatch to update state
  } catch (err: any) {
    console.error('Error fetching parameters:', err);
    dispatch(setError('Failed to fetch parameters'));
  }
};

// Async thunk for creating a new parameter (CREATE)
export const createParameter = (newParameter: ParameterCyberGuardType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(API_URL, newParameter);
    dispatch(addParameter(response.data));
  } catch (err: any) {
    console.error('Error creating parameter:', err);
    dispatch(setError('Failed to create parameter'));
  }
};

// Async thunk for updating an parameter (UPDATE)
export const editParameter = (updatedParameter: ParameterCyberGuardType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${API_URL}${updatedParameter.id}/`, updatedParameter);
    dispatch(updateParameter(response.data)); // Assuming the server returns the updated parameter
  } catch (err: any) {
    console.error('Error updating parameter:', err);
    dispatch(setError('Failed to update parameter'));
  }
};

// Async thunk for deleting an parameter (DELETE)
export const removeParameter = (parameterId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}${parameterId}/`);
    dispatch(deleteParameter(parameterId));
  } catch (err: any) {
    console.error('Error deleting parameter:', err);
    dispatch(setError('Failed to delete parameter'));
  }
};

export default ParametersSlice.reducer;
