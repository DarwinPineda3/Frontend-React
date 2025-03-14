import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../Store';

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

// Datos de ejemplo
const exampleGroups = [
  { id: 1, name: 'Group 1', description: 'Description for Group 1' },
  { id: 2, name: 'Group 2', description: 'Description for Group 2' },
  { id: 3, name: 'Group 3', description: 'Description for Group 3' },
];

export const fetchGroups =
  (requestedPage: number, requestedPageSize: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      // Simular datos de ejemplo
      const totalItemsAmount = exampleGroups.length;
      const totalPages = Math.ceil(totalItemsAmount / requestedPageSize);
      const itemsResult = exampleGroups.slice(
        (requestedPage - 1) * requestedPageSize,
        requestedPage * requestedPageSize,
      );
      dispatch(
        getGroups({
          results: itemsResult,
          currentPage: requestedPage,
          totalPages,
          totalItemsAmount,
          pageSize: requestedPageSize,
        }),
      );
      dispatch(setError(null));
    } catch (err: any) {
      console.error('Error fetching groups:', err);
      dispatch(setError('Failed to fetch groups'));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchGroupById = (groupId: string) => async (dispatch: AppDispatch) => {
  try {
    // Simular datos de ejemplo
    const group = exampleGroups.find((group) => group.id === parseInt(groupId));
    if (group) {
      dispatch(getGroupDetail({ data: group }));
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
    // Simular creación de grupo
    const newGroupWithId = { ...newGroup, id: exampleGroups.length + 1 };
    exampleGroups.push(newGroupWithId);
    dispatch(addGroup(newGroupWithId));
  } catch (err: any) {
    console.error('Error creating group:', err);
    dispatch(setError('Failed to create group'));
    throw err;
  }
};

export const editGroup = (updatedGroup: any) => async (dispatch: AppDispatch) => {
  try {
    // Simular actualización de grupo
    const index = exampleGroups.findIndex((group) => group.id === updatedGroup.id);
    if (index !== -1) {
      exampleGroups[index] = updatedGroup;
      dispatch(updateGroup(updatedGroup));
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
    // Simular eliminación de grupo
    const index = exampleGroups.findIndex((group) => group.id === parseInt(groupId));
    if (index !== -1) {
      exampleGroups.splice(index, 1);
      dispatch(deleteGroup(groupId));
    } else {
      dispatch(setError('Failed to delete group'));
    }
  } catch (err: any) {
    console.error('Error deleting group:', err);
    dispatch(setError('Failed to delete group'));
  }
};

export const fetchGroupByName = (groupName: string) => async (dispatch: AppDispatch) => {
  try {
    // Simular búsqueda de grupo por nombre
    const group = exampleGroups.find((group) => group.name === groupName);
    if (group) {
      dispatch(getGroupDetail({ data: group }));
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
    // Simular verificación de existencia de grupo por nombre
    const group = exampleGroups.find((group) => group.name === name);
    return !!group;
  } catch (error: any) {
    console.error('Error fetching group name:', error);
    return true;
  }
};

export const getGroupsByProjectId =
  (processToExecute: number, project: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      // Simular datos de ejemplo
      const groups = exampleGroups.filter((group) => group.project === project);
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