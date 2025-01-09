import { createSlice } from "@reduxjs/toolkit";
import { getBaseApiUrl } from "src/guards/jwt/Jwt";
import axios from 'src/utils/axios';
import { AppDispatch } from "../../Store";

function getApiUrl() {
  // return `api/gioto/itemsResults/`;
  return `${getBaseApiUrl()}/compliance/groups/`;
}

interface StateType {
  totalItemsAmount: number;
  pageSize: number;
  totalPages: number;
  itemsResults: any[];
  page: number; //currentPage
  loading: boolean;
  error: string | null;
  groupDetail: any | null;
}

const initialState: StateType = {
  totalItemsAmount: 0,
  pageSize: 25,
  totalPages: 1,
  itemsResults: [],
  page: 1,
  loading: false,
  error: null,
  groupDetail: null,
};

export const GiottoGroupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    getGroups: (state, action) => {
      state.itemsResults = Array.isArray(action.payload.results) ? action.payload.results : [];
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
      state.totalItemsAmount = action.payload.totalItemsAmount;
      state.pageSize = action.payload.pageSize;
    },
    getGroupDetail: (state, action) => {
      state.groupDetail = action.payload.data;
    },
    addGroup: (state, action) => {
      state.itemsResults.push(action.payload);
    },
    updateGroup: (state, action) => {
      const index = state.itemsResults.findIndex(group => group.id === action.payload.id);
      if (index !== -1) {
        state.itemsResults[index] = action.payload;
      }
    },
    deleteGroup: (state, action) => {
      state.itemsResults = state.itemsResults.filter(group => group.id !== action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { getGroups, addGroup, updateGroup, deleteGroup, setPage, setError, setLoading, getGroupDetail } = GiottoGroupSlice.actions;

//ColumnIndexOrdering & AscendingOrdering tener en cuenta para este servicio
export const fetchGroups = (requestedPage: Number, requestedPageSize: Number = 10) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    if (requestedPageSize !== initialState.pageSize) {
      requestedPage = 1;
    }
    const response = await axios.get(`${getApiUrl()}?page=${requestedPage}&page_size=${requestedPageSize}`);


    const {
      totalItemsAmount,
      pageSize,
      totalPages,
      itemsResult,
      currentPage,
      page
    } = response.data;
    dispatch(getGroups({
      results: itemsResult,
      currentPage,
      totalPages,
      totalItemsAmount,
      pageSize,
      page
    }));
    dispatch(setLoading(false));
  } catch (err: any) {
    console.error('Error fetching itemsResults:', err);
    dispatch(setError('Failed to fetch itemsResults'));
  }
};

export const fetchGroupById = (groupId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}${groupId}/`);

    if (response.status === 200) {
      dispatch(getGroupDetail({ data: response.data }));
    } else {
      dispatch(setError('fetch group report detail not found'));
    }
  } catch (err: any) {
    console.error('Error fetching Group detail:', err);
    dispatch(setError('Failed to fetch Group detail'));
  }
};

export const createGroup = (newGroup: any) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(getApiUrl(), newGroup);
    if (response.status >= 200 && response.status < 300) {
      dispatch(addGroup(response.data));
    }
    else {
      console.error('Error creating group:', response);
      dispatch(setError('Failed to create group'));
      throw 'Failed to create group'
    }
  } catch (err: any) {
    console.error('Error creating group:', err);
    dispatch(setError('Failed to create group'));
    throw err;
  }
};

export const editGroup = (updatedGroup: any) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${getApiUrl()}${updatedGroup.id}/`, updatedGroup);

    if (response.status === 200) {
      dispatch(editGroup({ data: response.data }));
    } else {
      dispatch(setError('Do not update group'));
    }
  } catch (err: any) {
    dispatch(setError('Failed to update group'));
    throw err;
  }
};

export const removeGroup = (groupId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${getApiUrl()}${groupId}/`);
    dispatch(deleteGroup(groupId));
  } catch (err: any) {
    console.error('Error deleting group:', err);
    dispatch(setError('Failed to delete group'));
  }
};

export default GiottoGroupSlice.reducer;