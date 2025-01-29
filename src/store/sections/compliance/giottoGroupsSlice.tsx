import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

function getApiUrl() {
  return `${import.meta.env.VITE_API_BACKEND_BASE_URL}/api/giotto-proxy?url=Groups/`;
  return `${getBaseApiUrl()}/compliance/groups/`;
}

interface StateType {
  totalItemsAmount: number;
  pageSize: number;
  totalPages: number;
  itemsResults: any[];
  groups: any[];
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
  groups: [],
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
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalItemsAmount = action.payload.totalItemsAmount;
      state.pageSize = action.payload.pageSize;
    },
    getAllInList: (state, action) => {
      state.groups = Array.isArray(action.payload.groups) ? action.payload.groups : [];
    },
    getGroupDetail: (state, action) => {
      state.groupDetail = action.payload.data;
    },
    addGroup: (state, action) => {
      state.itemsResults.push(action.payload);
    },
    updateGroup: (state, action) => {
      const index = state.itemsResults.findIndex((group) => group.id === action.payload.id);
      if (index !== -1) {
        state.itemsResults[index] = action.payload;
      }
    },
    deleteGroup: (state, action) => {
      state.itemsResults = state.itemsResults.filter((group) => group.id !== action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export const {
  getGroups,
  addGroup,
  updateGroup,
  deleteGroup,
  setPage,
  setError,
  setLoading,
  getGroupDetail,
  getAllInList,
  setPageSize,
} = GiottoGroupSlice.actions;

export const fetchGroups =
  (requestedPage: Number, requestedPageSize: Number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${getApiUrl()}GetPaginated&Page=${requestedPage}&PageSize=${requestedPageSize}&ColumnIndexOrdering=0&AscendingOrdering=true`,
      );

      const { totalItemsAmount, pageSize, totalPages, itemsResult, currentPage, page } =
        response.data;
      dispatch(
        getGroups({
          results: itemsResult,
          currentPage,
          totalPages,
          totalItemsAmount,
          pageSize,
          page,
        }),
      );
      setError(null);
    } catch (err: any) {
      console.error('Error fetching groups:', err);
      dispatch(setError('Failed to fetch groups'));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchGroupById = (groupId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}GetById/${groupId}`);

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
    const response = await axios.post(`${getApiUrl()}CreateGroup`, newGroup);
    if (response.status >= 200 && response.status < 300) {
      dispatch(addGroup(response.data));
    } else {
      console.error('Error creating group:', response);
      dispatch(setError('Failed to create group'));
      throw 'Failed to create group';
    }
  } catch (err: any) {
    console.error('Error creating group:', err);
    dispatch(setError('Failed to create group'));
    throw err;
  }
};

export const editGroup = (updatedGroup: any) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${getApiUrl()}EditGroup/${updatedGroup.id}/`, updatedGroup);

    if (response.status === 200) {
      dispatch(updateGroup({ data: response.data }));
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
    await axios.delete(`${getApiUrl()}DeleteGroup/${groupId}/`);
    dispatch(deleteGroup(groupId));
  } catch (err: any) {
    console.error('Error deleting group:', err);
    dispatch(setError('Failed to delete group'));
  }
};

export const fetchGroupByName = (groupName: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getApiUrl()}get_by_name?namegroup=${groupName}/`);

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

export const fetchGroupName = async (name: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${getApiUrl()}GetByName/${encodeURIComponent(name)}`);
    return !!response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return false;
    }
    console.error('Error fetching group name:', error);
    return true;
  }
};

export const getGroupsByProjectId =
  (processToExecute: number, project: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${getApiUrl()}GetListInTemplateExecutions/${project}?processToExecute=${processToExecute}`,
      );
      const groups = response.data;

      dispatch(
        getAllInList({
          groups,
        }),
      );
      dispatch(setLoading(false));
    } catch (err: any) {
      console.error('Error fetching itemsResults:', err);
      dispatch(setError('Failed to fetch itemsResults'));
    }
  };

export default GiottoGroupSlice.reducer;
