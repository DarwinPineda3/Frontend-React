import { createSlice } from "@reduxjs/toolkit";
import { getBaseApiUrl } from "src/guards/jwt/Jwt";
import axios from "src/utils/axios";

function getApiUrl() {
  return `api/gioto/executions/`;
  return `${getBaseApiUrl()}/assets/`;
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

export const { getExecutions, getExecutionDetail, getExecutionAssets, getExecutionControls, setPage, setError, setLoadingExecutions, getExecutionControlResults } = GiottoExecutionSlice.actions;

export default GiottoExecutionSlice.reducer;

export const fetchExecutions = (page: number = 1) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}?page=${page}`);
    const data = response.data;
    dispatch(getExecutions(data));
  } catch (error) {
    dispatch(setError('An error occurred while fetching the executions'));
  }
}

export const fetchExecutionDetail = (id: string) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}${id}`);
    const newExecution: TemplateExecution = response.data;
    dispatch(getExecutionDetail(newExecution));
  } catch (error) {
    dispatch(setError('An error occurred while fetching the execution detail'));
  }
}

export const fetchExecutionAssets = (id: string) => async (dispatch: any) => {
  const url = `${getApiUrl()}${id}/assets/`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    dispatch(getExecutionAssets(data));
  } catch (error) {
    console.error(error, url);
    dispatch(setError('An error occurred while fetching the execution assets'));
  }
}

export const fetchExecutionControlResults = (executionId: string, assetId: string) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}${executionId}/assets/${assetId}/results/`);
    const data = response.data;
    dispatch(getExecutionControlResults(data));
  } catch (error) {
    dispatch(setError('An error occurred while fetching the execution controls'));
  }
}

export const fetchExecutionControls = (executionId: string, assetId: string) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}${executionId}/assets/${assetId}/controls/`);
    const data = response.data;
    dispatch(getExecutionControls(data));
  } catch (error) {
    dispatch(setError('An error occurred while fetching the execution controls'));
  }
}