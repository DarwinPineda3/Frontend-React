import { createSlice } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

// Update to match the backend API endpoint
function getApiUrl() {
  return `api/giotto/templates/`;
}

export interface GiottoTemplateList {
  id: number;
  name: string;
  creationDate: string;
  workingSystemName: string;
  isBaseTemplate: boolean;
}

export interface TemplateCreate {
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

export interface TemplateUpdate {
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
  templates: GiottoTemplateList[];
  page: number;
  pageSize: number;
  loading: boolean;
  totalPages: number;
  error: string | null;
  totalItemsAmount: number;
  templateDetail: any | null;
}

const initialState: StateType = {
  templates: [],
  page: 1,
  totalPages: 1,
  pageSize: 10,
  loading: false,
  error: null,
  totalItemsAmount: 0,
  templateDetail: null,
};

export const GiottoTemplatesSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    getTemplates: (state, action) => {
      state.templates = Array.isArray(action.payload.results) ? action.payload.results : [];
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
      state.totalItemsAmount = action.payload.totalItemsAmount;
      state.pageSize = action.payload.pageSize;
    },
    getTemplateDetail: (state, action) => {
      state.templateDetail = action.payload.data;
    },
    addTemplate: (state, action) => {
      state.templates.push(action.payload);
    },
    updateTemplate: (state, action) => {
      const index = state.templates.findIndex((template) => template.id === action.payload.id);
      if (index !== -1) {
        state.templates[index] = action.payload;
      }
    },
    deleteTemplate: (state, action) => {
      state.templates = state.templates.filter((template) => template.id !== action.payload);
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
  getTemplates,
  addTemplate,
  updateTemplate,
  deleteTemplate,
  setPage,
  setError,
  setLoading,
  setPageSize,
  getTemplateDetail,
} = GiottoTemplatesSlice.actions;

// Async thunk for fetching templates with pagination (READ)
export const fetchTemplates =
  (requestedPage: Number, requestedPageSize: Number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      if (requestedPageSize !== initialState.pageSize) {
        requestedPage = 1;
      }
      const response = await axios.get(
        `${getApiUrl()}?page=${requestedPage}&page_size=${requestedPageSize}`,
      );
      const { totalItemsAmount, pageSize, totalPages, itemsResult, page } = response.data;

      dispatch(
        getTemplates({
          results: itemsResult,
          page,
          totalPages,
          totalItemsAmount,
          pageSize,
        }),
      );
      dispatch(setLoading(false));
    } catch (err: any) {
      console.error('Error fetching templates:', err);
      dispatch(setError('Failed to fetch templates'));
    }
  };

export const fetchTemplateById = (projectId: string) => async (dispatch: AppDispatch) => {
  try {
    const url = `${getApiUrl()}detail/${projectId}`;
    const response = await axios.get(url);
    if (response.status === 200) {
      dispatch(getTemplateDetail({ data: response.data.data }));
    } else {
      dispatch(setError('fetch template detail not found'));
    }
  } catch (err: any) {
    console.error('Error fetching template detail:', err);
    dispatch(setError('Failed to fetch template detail'));
  }
};

// Async thunk for creating a new template (CREATE)
export const createTemplate = (newProject: TemplateCreate) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(getApiUrl(), newProject);
    if (response.status >= 200 && response.status < 300) {
      dispatch(fetchTemplates(initialState.page, initialState.pageSize));
      return response.data;
    } else {
      console.error('Error creating template:', response);
      dispatch(setError('Failed to create template'));
    }
  } catch (err: any) {
    console.error('Error creating template:', err);
    dispatch(setError('Failed to create template'));
    throw err;
  }
};

// Async thunk for updating an template (UPDATE)
export const editTemplate = (updatedProject: TemplateUpdate) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${getApiUrl()}${updatedProject.id}`, updatedProject);
    if (response.status >= 200 && response.status < 300) {
      dispatch(fetchTemplates(initialState.page, initialState.pageSize));
    } else {
      console.error('Error updating template:', response);
      dispatch(setError('Failed to update template'));
    }
  } catch (err: any) {
    if (err.response) {
      console.error('Error response:', err.response);
    } else {
      console.error('Unexpected error:', err.message || err);
    }
    dispatch(setError('Failed to update template'));
    throw err;
  }
};

// Async thunk for deleting an template (DELETE)
export const removeTemplate = (projectId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${getApiUrl()}${projectId}`);
    dispatch(deleteTemplate(projectId));
  } catch (err: any) {
    console.error('Error deleting template:', err);
    dispatch(setError('Failed to delete template'));
  }
};

export default GiottoTemplatesSlice.reducer;
