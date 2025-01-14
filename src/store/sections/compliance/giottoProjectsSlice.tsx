import { createSlice } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

// Update to match the backend API endpoint
function getApiUrl() {
  return `${import.meta.env.VITE_API_BACKEND_BASE_URL}/api/giotto-proxy?url=Projects/`;
}

export interface ComplianceProject {
  id: number;
  name: string;
  companyName: string | undefined;
  startDate: string;
  endDate: string;
  isDisabled: boolean;
  disabledBy: boolean | null;
}

export interface ComplianceProjectCreate {
  name: string;
  companyId: number | null;
  startDate: string;
  endDate: string;
  isDisabled: boolean;
  disabledBy: boolean | null;
  groupTechnicians: string[] | null;
  groups: number[];
  managers: string[] | null;
}

export interface ComplianceProjectUpdate {
  id: number;
  name: string;
  companyId: number | null;
  startDate: string;
  endDate: string;
  isDisabled: boolean;
  disabledBy: boolean | null;
  groupTechnicians: string[] | null;
  groups: number[];
  managers: string[] | null;
}

interface StateType {
  projects: ComplianceProject[];
  page: number;
  pageSize: number;
  loading: boolean;
  totalPages: number;
  error: string | null;
  totalItemsAmount: number;
  projectDetail: any | null;
}

const initialState: StateType = {
  projects: [],
  page: 1,
  totalPages: 1,
  pageSize: 10,
  loading: false,
  error: null,
  totalItemsAmount: 0,
  projectDetail: null,
};

export const GiottoProjectsSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    getProjects: (state, action) => {
      state.projects = Array.isArray(action.payload.results) ? action.payload.results : [];
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
      state.totalItemsAmount = action.payload.totalItemsAmount;
      state.pageSize = action.payload.pageSize;
    },
    getProjectDetail: (state, action) => {
      state.projectDetail = action.payload.data;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex((project) => project.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((project) => project.id !== action.payload);
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
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  setPage,
  setError,
  setLoading,
  setPageSize,
  getProjectDetail,
} = GiottoProjectsSlice.actions;

// Async thunk for fetching projects with pagination (READ)
export const fetchProjects =
  (requestedPage: Number, requestedPageSize: Number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      if (requestedPageSize !== initialState.pageSize) {
        requestedPage = 1;
      }
      const url = `${getApiUrl()}GetPaginated&Page=${requestedPage}&PageSize=${requestedPageSize}&ColumnIndexOrdering=0&AscendingOrdering=true`;
      const response = await axios.get(url);
      const { totalItemsAmount, pageSize, totalPages, itemsResult, page } = response.data;

      dispatch(
        getProjects({
          results: itemsResult,
          page,
          totalPages,
          totalItemsAmount,
          pageSize,
        }),
      );
      dispatch(setLoading(false));
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      dispatch(setError('Failed to fetch projects'));
      dispatch(setLoading(false));
    }
  };

export const fetchProjectById = (projectId: string) => async (dispatch: AppDispatch) => {
  try {
    const url = `${getApiUrl()}GetById/${projectId}`;
    const response = await axios.get(url);
    if (response.status === 200) {
      dispatch(getProjectDetail({ data: response.data }));
    } else {
      dispatch(setError('fetch project detail not found'));
    }
  } catch (err: any) {
    console.error('Error fetching project detail:', err);
    dispatch(setError('Failed to fetch project detail'));
  }
};

// Async thunk for creating a new project (CREATE)
export const createProject =
  (newProject: ComplianceProjectCreate) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(getApiUrl(), newProject);
      if (response.status >= 200 && response.status < 300) {
        dispatch(fetchProjects(initialState.page, initialState.pageSize));
        return response.data;
      } else {
        console.error('Error creating project:', response);
        dispatch(setError('Failed to create project'));
      }
    } catch (err: any) {
      console.error('Error creating project:', err);
      dispatch(setError('Failed to create project'));
      throw err;
    }
  };

// Async thunk for updating an project (UPDATE)
export const editProject =
  (updatedProject: ComplianceProjectUpdate) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(`${getApiUrl()}${updatedProject.id}`, updatedProject);
      if (response.status >= 200 && response.status < 300) {
        dispatch(fetchProjects(initialState.page, initialState.pageSize));
      } else {
        console.error('Error updating project:', response);
        dispatch(setError('Failed to update project'));
      }
    } catch (err: any) {
      if (err.response) {
        console.error('Error response:', err.response);
      } else {
        console.error('Unexpected error:', err.message || err);
      }
      dispatch(setError('Failed to update project'));
      throw err;
    }
  };

// Async thunk for deleting an project (DELETE)
export const removeProject = (projectId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${getApiUrl()}DeleteProject/${projectId}`);
    dispatch(deleteProject(projectId));
  } catch (err: any) {
    console.error('Error deleting project:', err);
    dispatch(setError('Failed to delete project'));
  }
};

export default GiottoProjectsSlice.reducer;
