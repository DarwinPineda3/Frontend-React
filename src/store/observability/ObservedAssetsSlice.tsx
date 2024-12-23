import { createSlice } from '@reduxjs/toolkit';
import { getBaseApiUrl } from 'src/guards/jwt/Jwt';
import axios from 'src/utils/axios';
import { AppDispatch } from '../Store';

function getMonitoringApiUrl() {
  return `${getBaseApiUrl()}/observed-assets`;
}
interface AssetResume {
  id: string;
  RamInfo: {
    RamUsagePercentage: number;
  };
  CpuInfo: {
    CpuUsage: number;
  };
  Hostname: string;
  Storage: {
    TotalUsagePercentage: number;
  };
  Firewall: string;
  Timestamp: string;
  is_active: boolean;
}
interface SystemInfo {
  cpuInfo: {
    id: string;
    RamInfo: {
      TotalPhysicalMemory: number;
      FreePhysicalMemory: number;
      UsedPhysicalMemory: number;
      RamUsagePercentage: number;
    };
    CpuInfo: {
      Name: string;
      ProcessorId: string;
      Architecture: string;
      NumberOfCores: number;
      NumberOfLogicalProcessors: number;
      MaxClockSpeed: string;
      NumberOfSockets: number;
      CpuUsage: number;
      ServicesCount: number;
    };
    Ip: string;
    IpPublic: string;
    Hostname: string;
    BuildNumber: string;
    IpHostname: string;
    UuId: string;
    Storage: {
      LogicalDisks: {
        Drive: string;
        VolumeName: string;
        Size: number;
        FreeSpace: number;
        FileSystem: string;
      }[];
      Partitions: {
        Partition: string;
        Size: number;
        Type: string;
      }[];
      TotalUsagePercentage: number;
    };
    OSInfo: {
      OperatingSystem: string;
      Version: string;
      BuildNumber: string;
      BuildType: string;
      Manufacturer: string;
      RegisteredUser: string;
      SystemDirectory: string;
      InstallDate: string;
      Architecture: string;
    };
    PCInfo: {
      SerialNumber: string;
      Manufacturer: string;
      Model: string;
    };
    AntivirusInfo: {
      AntivirusList: {
        DisplayName: string;
        InstanceGuid: string;
        PathToSignedProductExe: string;
        PathToSignedReportingExe: string;
        ProductState: string;
      }[];
    };
    LoggedUserInfo: {
      UserName: string;
      Domain: string;
    };
    ServicesInfo: {
      ServicesList: {
        ServiceName: string;
        ServiceStatus: string;
        ServiceStartType: string;
      }[];
    };
  };
  is_active: boolean;
  storage_charts: {
    Drive: string;
    VolumeName: string;
    Size: number;
    FreeSpace: number;
    FileSystem: string;
  }[];
  user_data: {
    id: string;
    UserName: string;
    Domain: string;
    Timestamp: string;
  }[];
  ram_chart: {
    TotalPhysicalMemory: number;
    FreePhysicalMemory: number;
    UsedPhysicalMemory: number;
    RamUsagePercentage: number;
  };
}

interface RamInfo {
  RamUsagePercentage: number;
}

interface CpuInfo {
  CpuUsage: number;
}

interface Storage {
  TotalUsagePercentage: number;
}

export interface AssetLog {
  RamInfo: RamInfo;
  CpuInfo: CpuInfo;
  Storage: Storage;
  Timestamp: string;
}

interface AssetLogsResponse {
  asset_logs: AssetLog[];
}

interface StateType {
  observedAssetsData: AssetResume[];
  observedAssetsDetail: SystemInfo | null;
  observedAssetsDetailLogs: AssetLogsResponse | null;
  error: string | null;
}

const initialState: StateType = {
  observedAssetsData: [],
  observedAssetsDetail: null,
  observedAssetsDetailLogs: null,
  error: null,
};

const ObservedAssetsSlice = createSlice({
  name: 'observed-network',
  initialState,
  reducers: {
    getObservedAssetList: (state, action) => {
      state.observedAssetsData = action.payload.data;
    },
    getObservedAssetDetail: (state, action) => {
      state.observedAssetsDetail = action.payload.data;
    },
    getObservedAssetForCharts: (state, action) => {
      state.observedAssetsDetailLogs = action.payload.asset_logs;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getObservedAssetList, getObservedAssetDetail, getObservedAssetForCharts, setError } =
  ObservedAssetsSlice.actions;

// Async thunk for fetching Network Observability list with pagination (READ)
export const fetchObservedAssetData = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getMonitoringApiUrl()}/`);

    dispatch(
      getObservedAssetList({
        data: response.data.cpuInfo,
      }),
    );
  } catch (err: any) {
    console.error('Error fetching Network Observability data:', err);
    dispatch(setError('Failed to fetch Network Observability data'));
  }
};

export const fetchObservedAssetsLogsByDateRange =
  (uuid: string, startDate: string, endDate: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${getMonitoringApiUrl()}/observed-asset-for-date/`, {
        params: {
          uuid,
          start_date: startDate,
          end_date: endDate,
        },
      });

      const { asset_logs } = response.data || {};

      if (Array.isArray(asset_logs)) {
        dispatch(
          getObservedAssetForCharts({
            asset_logs: response.data,
          }),
        );
      }
    } catch (err: any) {
      console.error('Error fetching observed assets by date range:', err);
      dispatch(setError('Failed to fetch observed assets by date range'));
    }
  };

export const fetchObservedAssetById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${getMonitoringApiUrl()}/${id}/`);

    if (response.status === 200) {
      dispatch(getObservedAssetDetail({ data: response.data }));
    } else {
      dispatch(setError('fetch Network Observability detail not found'));
    }
  } catch (err: any) {
    console.error('Error fetching Network Observability detail:', err);
    dispatch(setError('Failed to fetch Network Observability detail'));
  }
};
export default ObservedAssetsSlice.reducer;
