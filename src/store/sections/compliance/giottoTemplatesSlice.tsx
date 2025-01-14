import { createSlice } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

// Update to match the backend API endpoint
function getApiUrl() {
  return `${import.meta.env.VITE_API_BACKEND_BASE_URL}/api/giotto-proxy?url=Templates/`;
}

export interface GiottoTemplateList {
  id: number;
  name: string;
  creationDate?: string;
  workingSystemName?: string;
  isBaseTemplate?: boolean;
}

export interface GiottoObjTemplateList {
  itemsResult: GiottoTemplateList[];
  totalItemsAmount: number;
  pageSize: number;
  totalPages: number;
  currentPage: number;
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
  baseTemplates: GiottoObjTemplateList;
  customTemplates: GiottoObjTemplateList;
  loading: boolean;
  error: string | null;
  templateDetail: any | null;
  totalItemsAmount: number;
  pageSize: number;
  totalPages: number;
  currentPage: number;
}

const initialState: StateType = {
  templates: [],
  baseTemplates: {
    itemsResult: [],
    totalItemsAmount: 1,
    pageSize: 10,
    totalPages: 1,
    currentPage: 1,
  },
  customTemplates: {
    itemsResult: [],
    totalItemsAmount: 1,
    pageSize: 10,
    totalPages: 1,
    currentPage: 1,
  },
  loading: false,
  error: null,
  templateDetail: null,
  totalItemsAmount: 1,
  pageSize: 10,
  totalPages: 1,
  currentPage: 1,
};

export const GiottoTemplatesSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    getAllTemplates: (state, action) => {
      state.templates = Array.isArray(action.payload.results) ? action.payload.results : [];
    },
    getBaseTemplates: (state, action) => {
      state.baseTemplates.itemsResult = Array.isArray(action.payload.results)
        ? action.payload.results
        : [];
      state.baseTemplates.currentPage = action.payload.currentPage;
      state.baseTemplates.totalPages = action.payload.totalPages;
      state.baseTemplates.totalItemsAmount = action.payload.totalItemsAmount;
      state.baseTemplates.pageSize = action.payload.pageSize;
    },
    getCustomTemplates: (state, action) => {
      state.customTemplates.itemsResult = Array.isArray(action.payload.results)
        ? action.payload.results
        : [];
      state.customTemplates.currentPage = action.payload.currentPage;
      state.customTemplates.totalPages = action.payload.totalPages;
      state.customTemplates.totalItemsAmount = action.payload.totalItemsAmount;
      state.customTemplates.pageSize = action.payload.pageSize;
    },
    getTemplateDetail: (state, action) => {
      state.templateDetail = action.payload.data;
    },
    addTemplate: (state, action) => {
      state.customTemplates.itemsResult.push(action.payload);
    },
    updateTemplate: (state, action) => {
      const index = state.customTemplates.itemsResult.findIndex(
        (template) => template.id === action.payload.id,
      );
      if (index !== -1) {
        state.customTemplates.itemsResult[index] = action.payload;
      }
    },
    deleteTemplate: (state, action) => {
      state.customTemplates.itemsResult = state.customTemplates.itemsResult.filter(
        (template) => template.id !== action.payload,
      );
    },
    // setPage: (state, action) => {
    //   state.page = action.payload;
    // },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // setPageSize: (state, action) => {
    //   state.pageSize = action.payload;
    // },
  },
});

export const {
  getAllTemplates,
  getBaseTemplates,
  getCustomTemplates,
  addTemplate,
  updateTemplate,
  deleteTemplate,
  // setPage,
  setError,
  setLoading,
  // setPageSize,
  getTemplateDetail,
} = GiottoTemplatesSlice.actions;

export const fetchGetAllTemplates = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const url = `${getApiUrl()}GetAll`;
    console.log(url);
    const response = await axios.get(url);
    console.log(response);
    const { itemsResult } = response.data;

    dispatch(
      getAllTemplates({
        results: itemsResult,
      }),
    );
    dispatch(setLoading(false));
  } catch (err: any) {
    console.error('Error fetching templates:', err);
    dispatch(setError('Failed to fetch templates'));
  }
};

// Async thunk for fetching templates with pagination (READ)
// export const fetchBaseTemplates =
//   (requestedPage: Number, requestedPageSize: Number = 10) =>
//   async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setLoading(true));
//       if (requestedPageSize !== initialState.baseTemplates.pageSize) {
//         requestedPage = 1;
//       }
//       const urlBaseTemplates = `${getApiUrl()}GetPaginated?Page=${
//         initialState.baseTemplates.pageSize
//       }&PageSize=${
//         initialState.baseTemplates.pageSize
//       }&ColumnIndexOrdering=0&AscendingOrdering=true&ColumnIndexSearchFilter[0].column=4&ColumnIndexSearchFilter[0].value=base`;
//       const response = await axios.get(urlBaseTemplates);
//       const { totalItemsAmount, pageSize, totalPages, itemsResult, page } = response.data;

//       dispatch(
//         getBaseTemplates({
//           results: itemsResult,
//           page,
//           totalPages,
//           totalItemsAmount,
//           pageSize,
//         }),
//       );
//       dispatch(setLoading(false));
//     } catch (err: any) {
//       console.error('Error fetching templates:', err);
//       dispatch(setError('Failed to fetch templates'));
//     }
//   };

// export const fetchTemplateById = (projectId: string) => async (dispatch: AppDispatch) => {
//   try {
//     const url = `${getApiUrl()}detail/${projectId}`;
//     const response = await axios.get(url);
//     if (response.status === 200) {
//       dispatch(getTemplateDetail({ data: response.data.data }));
//     } else {
//       dispatch(setError('fetch template detail not found'));
//     }
//   } catch (err: any) {
//     console.error('Error fetching template detail:', err);
//     dispatch(setError('Failed to fetch template detail'));
//   }
// };

// // Async thunk for creating a new template (CREATE)
// export const createTemplate = (newProject: TemplateCreate) => async (dispatch: AppDispatch) => {
//   try {
//     const response = await axios.post(getApiUrl(), newProject);
//     if (response.status >= 200 && response.status < 300) {
//       dispatch(fetchTemplates(initialState.page, initialState.pageSize));
//       return response.data;
//     } else {
//       console.error('Error creating template:', response);
//       dispatch(setError('Failed to create template'));
//     }
//   } catch (err: any) {
//     console.error('Error creating template:', err);
//     dispatch(setError('Failed to create template'));
//     throw err;
//   }
// };

// // Async thunk for updating an template (UPDATE)
// export const editTemplate = (updatedProject: TemplateUpdate) => async (dispatch: AppDispatch) => {
//   try {
//     const response = await axios.put(`${getApiUrl()}${updatedProject.id}`, updatedProject);
//     if (response.status >= 200 && response.status < 300) {
//       dispatch(fetchTemplates(initialState.page, initialState.pageSize));
//     } else {
//       console.error('Error updating template:', response);
//       dispatch(setError('Failed to update template'));
//     }
//   } catch (err: any) {
//     if (err.response) {
//       console.error('Error response:', err.response);
//     } else {
//       console.error('Unexpected error:', err.message || err);
//     }
//     dispatch(setError('Failed to update template'));
//     throw err;
//   }
// };

// // Async thunk for deleting an template (DELETE)
// export const removeTemplate = (projectId: string) => async (dispatch: AppDispatch) => {
//   try {
//     await axios.delete(`${getApiUrl()}${projectId}`);
//     dispatch(deleteTemplate(projectId));
//   } catch (err: any) {
//     console.error('Error deleting template:', err);
//     dispatch(setError('Failed to delete template'));
//   }
// };

export default GiottoTemplatesSlice.reducer;
