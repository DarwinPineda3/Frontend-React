import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import axios from 'src/utils/axios';
import { AppDispatch } from '../Store';

function getInstallationGuideVariablesApiUrl() {
  return `${getBaseApiUrl()}/installation/guide/variables/`; // Adjust URL to match your API endpoint
}

interface InstallationGuideState {
  variables: {
    api_url: string;
    akila_agent_windows_installer_url: string;
    akila_agent_linux_installer_url: string;
    akila_agent_freebsd_installer_url: string;
    giotto_agent_windows_installer_url: string;
    giotto_agent_linux_installer_url: string;
    api_key: string;
    last_version_agent: string;
  } | null;
  error: string | null;
}

const initialState: InstallationGuideState = {
  variables: null,
  error: null,
};

const InstallationGuideSlice = createSlice({
  name: 'installationGuide',
  initialState,
  reducers: {
    setVariables: (state, action) => {
      state.variables = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setVariables, setError } = InstallationGuideSlice.actions;

export const fetchInstallationGuideVariables = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(getInstallationGuideVariablesApiUrl());

    if (response.status === 200) {
      dispatch(setVariables(response.data));
    } else {
      dispatch(setError('Failed to fetch installation guide variables'));
    }
  } catch (err: any) {
    console.error('Error fetching installation guide variables:', err);
    dispatch(setError('Failed to fetch installation guide variables'));
  }
};

export default InstallationGuideSlice.reducer;
