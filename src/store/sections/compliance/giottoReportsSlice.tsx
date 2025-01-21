import { createSlice } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';
import { AppDispatch } from '../../Store';

// Update to match the backend API endpoint
function getApiUrl() {
  return `${import.meta.env.VITE_API_BACKEND_BASE_URL}/api/giotto-proxy?url=Reporting/`;
}

interface StateType {
  projects: any[];
  loading: boolean;
  error: string | null;
  report: any | null;
}

const initialState: StateType = {
  projects: [],
  loading: false,
  error: null,
  report: null,
};

export const GiottoReportsSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    getcomplianceByProject: (state, action) => {
      state.report = action.payload.report;

    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  getcomplianceByProject,
  setError,
  setLoading,
} = GiottoReportsSlice.actions;

export const fetchComplianceByProjectReport =
  (newReport: any) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(setLoading(true));
        const urlrequest = `${getApiUrl()}GetComplianceByProjectReport/${newReport.project}`;
        const response = await axios.get(urlrequest, {
          responseType: 'blob',
        });
        // console.log(response);
        
        // const report = response.data;

        // dispatch(
        //   getcomplianceByProject({
        //     report,
        //   }),
        // );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
    
        link.setAttribute('download', `${newReport.project}.xlsx`);
        document.body.appendChild(link);
        link.click();
    
        // Limpiando memoria
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        dispatch(setLoading(false));
      } catch (err: any) {
        dispatch(setError('Failed to fetch report'));
        dispatch(setLoading(false));
        throw err;
      }
    };

export default GiottoReportsSlice.reducer;