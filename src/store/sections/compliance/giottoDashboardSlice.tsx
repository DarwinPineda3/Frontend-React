import { createSlice } from "@reduxjs/toolkit";
import { getBaseBackofficeUrl } from "src/guards/jwt/Jwt";
import axios from "src/utils/axios";

function getApiUrl() {
  return `${getBaseBackofficeUrl()}/api/giotto-proxy`;
}

interface StateType {
  ProjectsComplianceByCompany: any[] | null;
  ProjectsComplianceByGroup: any[] | null;
  ExecutionsCountByMonth: any[] | null;
  ExecutionByProject: any[] | null;
  ComplianceByProject: any[] | null;
  GroupCompliance: any[] | null;
  TemplatesUsage: any[] | null;
  usersResponse: any;
  projectsResponse: any;
  templatesResponse: any;
  assetsResponse: any;
}

const initialState: StateType = {
  ProjectsComplianceByCompany: null,
  ProjectsComplianceByGroup: null,
  ExecutionsCountByMonth: null,
  ExecutionByProject: null,
  ComplianceByProject: null,
  GroupCompliance: null,
  TemplatesUsage: null,
  usersResponse: null,
  projectsResponse: null,
  templatesResponse: null,
  assetsResponse: null,

}

export const GiottoDashboardSlice = createSlice({
  name: 'giottoDashboard',
  initialState,
  reducers: {
    getProjectsComplianceByCompany: (state, action) => {
      state.ProjectsComplianceByCompany = action.payload;
    },
    getProjectsComplianceByGroup: (state, action) => {
      state.ProjectsComplianceByGroup = action.payload;
    },
    getExecutionsCountByMonth: (state, action) => {
      state.ExecutionsCountByMonth = action.payload;
    },
    getExecutionByProject: (state, action) => {
      state.ExecutionByProject = action.payload;
    },
    getGroupCompliance: (state, action) => {
      state.GroupCompliance = action.payload;
    },
    getTemplatesUsage: (state, action) => {
      state.TemplatesUsage = action.payload;
    },
    getComplianceByProject: (state, action) => {
      state.ComplianceByProject = action.payload;
    },
    getUsersStatistics: (state, action) => {
      state.usersResponse = action.payload;
    },
    getProjectsStatistics: (state, action) => {
      state.projectsResponse = action.payload;
    },
    getTemplatesStatistics: (state, action) => {
      state.templatesResponse = action.payload;
    },
    getAssetsStatistics: (state, action) => {
      state.assetsResponse = action.payload;
    },
  }
});


export const { getProjectsComplianceByCompany, getProjectsComplianceByGroup, getExecutionsCountByMonth,
  getExecutionByProject, getGroupCompliance, getTemplatesUsage, getComplianceByProject,
  getUsersStatistics, getProjectsStatistics, getTemplatesStatistics, getAssetsStatistics } = GiottoDashboardSlice.actions;

export default GiottoDashboardSlice.reducer;

/**
 * Fetch Functions
 */

export const fetchProjectsComplianceByCompany = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}?url=Charting/GetProjectsComplianceByCompany&setCompany=True`);
    const data = await response.data;
    const projectsWithIds = data.map((project: any, index: number) => ({
      id: index + 1,
      name: project.projectName,
      compliancePercent: project.compliancePercent,
    }));
    dispatch(getProjectsComplianceByCompany(projectsWithIds));
  } catch (error) {
    console.error('Error al obtener los datos de los proyectos:', error);
  }
}

export const fetchProjectsComplianceByGroup = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}?url=Charting/GetGroupsExecutionsByProject/${id}`);
    const data = await response.data;
    const transformedData = data.map((group: any, index) => ({
      id: index,
      name: group.groupName,
      values: {
        assessment: group.assessmentExecutionsCount,
        hardening: group.hardeningExecutionsCount,
        rollback: group.rollbackExecutionsCount,
      },
    }));
    console.log('transformedData:', transformedData);
    dispatch(getProjectsComplianceByGroup(transformedData));
  } catch (error) {
    console.error('Error al obtener los datos de los proyectos:', error);
  }
}

export const fetchExecutionsCountByMonth = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}?url=Charting/GetExecutionsCountByMonth`);
    const data = await response.data;
    dispatch(getExecutionsCountByMonth(data));
  } catch (error) {
    console.error('Error al obtener los datos de los proyectos:', error);
  }
}


export const fetchExecutionsCountByProject = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}?url=Charting/GetProjectsExecutionsByCompany&setCompany=True`);
    const data = await response.data;
    dispatch(getExecutionByProject(data));
  } catch (error) {
    console.error('Error al obtener los datos de los proyectos:', error);
  }
}

export const fetchGroupCompliance = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}?url=Charting/GetGroupsComplianceByProject/${id}`);
    const data = await response.data;
    const groupsWithIds = data.map((project: any, index: number) => ({
      id: index + 1,
      name: project.groupName,
      value: project.compliancePercent,
    }));
    dispatch(getGroupCompliance(groupsWithIds));
  } catch (error) {
    console.error('Error al obtener los datos de los proyectos:', error);
  }
}

export const fetchTemplatesUsage = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}?url=Charting/GetTemplatesUsage/`);
    const data = await response.data;
    const templatesWithIds = data.map((template, index) => ({
      id: index + 1,
      name: template.templateName,
      usagePercent: template.usagePercent,
    }));
    dispatch(getTemplatesUsage(templatesWithIds));
  } catch (error) {
    console.error('Error al obtener los datos de los proyectos:', error);
  }
}

export const fetchComplianceByProyect = (selectedProject: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}?url=Groups/GetListByProjectId/${selectedProject}`);
    const data = await response.data;
    dispatch(getComplianceByProject(data));
  } catch (error) {
    console.error('Error al obtener los datos de los proyectos:', error);
  }
}

export const fetchUserStatistics = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}?url=Charting/GetUsersStatistics/`);
    const data = await response.data;
    dispatch(getUsersStatistics(data));
  } catch (error) {
    console.error('Error al obtener los datos de los proyectos:', error);
  }
}

export const fetchProjectsStatistics = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}?url=Charting/GetProjectsStatistics/`);
    const data = await response.data;
    dispatch(getProjectsStatistics(data));
  } catch (error) {
    console.error('Error al obtener los datos de los proyectos:', error);
  }
}

export const fetchTemplatesStatistics = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}?url=Charting/GetTemplatesStatistics/`);
    const data = await response.data;
    dispatch(getTemplatesStatistics(data));
  } catch (error) {
    console.error('Error al obtener los datos de los proyectos:', error);
  }
}

export const fetchAssetsStatistics = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${getApiUrl()}?url=Charting/GetAssetsStatistics/`);
    const data = await response.data;
    dispatch(getAssetsStatistics(data));
  } catch (error) {
    console.error('Error al obtener los datos de los proyectos:', error);
  }
}