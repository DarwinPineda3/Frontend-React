import { createSlice } from "@reduxjs/toolkit";
import { getBaseBackofficeUrl } from "src/guards/jwt/Jwt";
import axios from "src/utils/axios";

function getApiUrl() {
  return `${getBaseBackofficeUrl()}/api/giotto-proxy`;
}

export interface TemplateExecution {
  id: number;
  templateName: string;
  projectName: string;
  groupName: string;
  name: string;
  creationDate: string;
  executionDate: string;
  status: string;
  processToExecute: string;
  userRequesting: string;
}


export interface ExecutionAsset {
  id: number;
  name: string;
  description: string;
  networkAddress: string;
  companyId: number;
  companyName: string;
  creationDate: string;
  lastKeepAlive: string;
}
export interface ExecutionControlResult {
  id: number;
  templateExecutionId: number;
  controlId: number;
  isDisabled: boolean;
  controlResultExecutions: ControlResultExecution[];
  controlsExecution: any[];
  controlCommentResults: any[];
  controlExecutionNotifications: ControlExecutionNotification[];
}

export interface ExecutionControl {
  id: number;
  name: string;
  description: string;
  groupName: string;
  criticalness: number;
  isExecutable: boolean;
  isSettable: boolean;
  isDisabled: boolean;
}

export interface ControlResultExecution {
  id: number;
  assetId: number;
  controlProcessType: string;
  controlProcessOrder: number;
  executedProcess: string;
  executedOperation: string;
  valueResult: string;
  messageResult: string;
  exceptionResult: string | null;
  status: string;
  isExpectedResult: boolean;
  executionDate: string; // ISO 8601 date string
}

interface ControlExecutionNotification {
  controlExecutionId: number;
  assetId: number;
  isExpectedResult: boolean;
  hasErrors: boolean;
  executedProcess: string;
}



interface StateType {
  executions: TemplateExecution[];
  executionDetail: TemplateExecution | null;
  executionAssets: ExecutionAsset[];
  executionControlResults: ExecutionControlResult[];
  executionControls: ExecutionControl[],
  page: number;
  pageSize: number;
  loading: boolean;
  totalPages: number;
  error: string | null;
  totalItemsAmount: number;
}

const initialState: StateType = {
  executions: [],
  executionDetail: null,
  executionAssets: [],
  executionControlResults: [],
  executionControls: [],
  page: 1,
  totalPages: 1,
  pageSize: 10,
  loading: false,
  error: null,
  totalItemsAmount: 0
};

export const GiottoExecutionSlice = createSlice({
  name: 'execution',
  initialState,
  reducers: {
    getExecutions: (state, action) => {
      state.executions = Array.isArray(action.payload.itemsResult) ? action.payload.itemsResult : [];
      state.page = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalItemsAmount = action.payload.totalItemsAmount;
      state.pageSize = action.payload.pageSize;
      state.loading = false;
    },
    getAllInList: (state, action) => {
      state.executions = Array.isArray(action.payload.executions) ? action.payload.executions : [];
    },
    getExecutionDetail: (state, action) => {
      state.executionDetail = action.payload;
    },
    getExecutionAssets: (state, action) => {
      state.executionAssets = Array.isArray(action.payload) ? action.payload : [];
    },
    getExecutionControlResults: (state, action) => {
      state.executionControlResults = Array.isArray(action.payload) ? action.payload : [];
    },
    getExecutionControls: (state, action) => {
      state.executionControls = Array.isArray(action.payload) ? action.payload : [];
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoadingExecutions: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { getExecutions, getExecutionDetail, getExecutionAssets, getExecutionControls, setPage, setError, setLoadingExecutions, getExecutionControlResults, getAllInList } = GiottoExecutionSlice.actions;

export default GiottoExecutionSlice.reducer;

export const fetchExecutions = (project: number, group: number, template: number) => async (dispatch: any) => {
  try {
    dispatch(setLoadingExecutions(true));
    const response = await axios.get(`${getApiUrl()}?url=TemplateExecutions/GetByTemplateProjectGroup?templateId=${template}&projectId=${project}&groupId=${group}`);
    const data = response.data;
    const payload = {
      itemsResult: data,
      currentPage: 1,
      totalPages: 1,
      totalItemsAmount: data.length,
      pageSize: data.length,
    };
    dispatch(getExecutions(payload));
  } catch (error) {
    dispatch(setError('An error occurred while fetching the executions'));
  }
}

export const fetchExecutionDetail = (id: string) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}?url=TemplateExecutions/GetById/${id}`);
    const newExecution: TemplateExecution = response.data;
    dispatch(getExecutionDetail(newExecution));
  } catch (error) {
    dispatch(setError('An error occurred while fetching the execution detail'));
  }
}

export const fetchExecutionAssets = (id: string) => async (dispatch: any) => {
  const url = `${getApiUrl()}?url=TemplateExecutions/GetAssetsById/${id}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    dispatch(getExecutionAssets(data));
  } catch (error) {
    console.error(error, url);
    dispatch(setError('An error occurred while fetching the execution assets'));
  }
}


export const requestAssessmentExecution = (id: string) => async (dispatch: any) => {
  const url = `${getApiUrl()}?url=TemplateExecutions/StartAssessmentExecution?templateExecutionId=${id}`;
  try {
    const response = await axios.post(url);
    const data = response.data;
    dispatch(getExecutionAssets(data));
  } catch (error) {
    console.error(error, url);
    dispatch(setError('An error occurred while fetching the execution assets'));
  }
}

export const requestHardeningExecution = (id: string) => async (dispatch: any) => {
  const url = `${getApiUrl()}?url=TemplateExecutions/StartHardeningExecution?templateExecutionId=${id}`;
  try {
    const response = await axios.post(url);
    const data = response.data;
    dispatch(getExecutionAssets(data));
  } catch (error) {
    console.error(error, url);
    dispatch(setError('An error occurred while fetching the execution assets'));
  }
}

export const requestRollbackExecution = (id: string) => async (dispatch: any) => {
  const url = `${getApiUrl()}?url=TemplateExecutions/StartRollbackExecution?templateExecutionId=${id}`;
  try {
    const response = await axios.post(url);
    const data = response.data;
    dispatch(getExecutionAssets(data));
  } catch (error) {
    console.error(error, url);
    dispatch(setError('An error occurred while fetching the execution assets'));
  }
}

export const requestCreateExecution = (idTemplate: number, idProject: number, idGroup: number) => async (dispatch: any) => {
  const url = `${getApiUrl()}?url=TemplateExecutions/CreateTemplateExecution`;
  try {
    const body = {
      templateId: idTemplate,
      projectId: idProject,
      groupId: idGroup,
      startAssessment: false
    };
    const response = await axios.post(url, body);
    dispatch(fetchExecutions(idProject, idGroup, idTemplate));
  } catch (error) {
    console.error(error, url);
    dispatch(setError('An error occurred while fetching the creation of executions'));
  }
}


export const fetchExecutionControlResults = (executionId: string, assetId: string) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}?url=TemplateExecutions/GetControlExecutionsRollbackAndResultsByIdAndAsset?id=${executionId}&assetId=${assetId}`);
    const data = response.data;
    dispatch(getExecutionControlResults(data));
  } catch (error) {
    dispatch(setError('An error occurred while fetching the execution controls'));
  }
}

export const fetchExecutionControls = (executionId: string, assetId: string) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}?url=TemplateExecutions/GetControlsById/${executionId}`);
    const data = response.data;
    dispatch(getExecutionControls(data));
  } catch (error) {
    dispatch(setError('An error occurred while fetching the execution controls'));
  }
}

export const getExecutionByTemplate = (processToExecute: any, project: any, group: any, template: any) => async (dispatch: AppDispatch) => {

  try {
    dispatch(setLoadingExecutions(true));
    const response = await axios.get(`${getApiUrl()}?url=TemplateExecutions/GetWithExecutionsByTemplateProjectGroup?templateId=${template}&projectId=${project}&groupId=${group}&processToExecute=${processToExecute}`);

    const executions = response.data;

    dispatch(
      getAllInList({
        executions,
      }),
    );
    dispatch(setLoadingExecutions(false));
  } catch (err: any) {
    console.error('Error fetching tempaltes:', err);
    dispatch(setError('Failed to fetch tempaltes'));
  }
};