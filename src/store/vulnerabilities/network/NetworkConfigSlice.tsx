import { createSlice } from "@reduxjs/toolkit";
import { getBaseApiUrl } from "src/guards/jwt/Jwt";
import axios from 'src/utils/axios';
import { AppDispatch } from "../../Store";

function getApiUrl() {
  return `${getBaseApiUrl()}/network-configuration/`;
}

interface StateType {
  configurationList: any[];
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: StateType = {
  configurationList: [],
  page: 1,
  totalPages: 1,
  error: null,
};

export const NetworkConfigurationSlice = createSlice({
  name: 'configurationList',
  initialState,
  reducers: {
    getConfigurationList: (state, action) => {
      state.configurationList = Array.isArray(action.payload.configurationList)
        ? action.payload.configurationList
        : [];
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

export const { getConfigurationList, setPage, setError } = NetworkConfigurationSlice.actions;

export const fetchConfigurationList = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}`);
    const configurationList = response.data;
    
    dispatch(getConfigurationList({ configurationList }));
  } catch (err: any) {
    dispatch(setError('Failed to fetch configurationList'));
    throw err;
  }
};

export default NetworkConfigurationSlice.reducer;
