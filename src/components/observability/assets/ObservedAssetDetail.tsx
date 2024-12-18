import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import Loader from 'src/components/shared/Loader/Loader';
import { AppState, useDispatch, useSelector } from 'src/store/Store';
import { fetchObservedAssetById } from 'src/store/observability/ObservedAssetsSlice';
import AntivirusTable from './cards/AntivirusInfo';
import CpuCard from './cards/CpuCard';
import RamCard from './cards/RamCard';
import ServiceTable from './cards/ServicesTable';
import StorageCard from './cards/StorageCard';
import SystemInfoCards from './cards/SystemInfoCard';

interface ObservedAssetDetailProps {
  id: string;
}

const cpuHistory = [
  { "percentage": 45, "datetime": "2024-10-01T09:00:00Z" },
  { "percentage": 52, "datetime": "2024-10-01T12:00:00Z" },
  { "percentage": 38, "datetime": "2024-10-01T15:00:00Z" },
  { "percentage": 60, "datetime": "2024-10-01T18:00:00Z" },
  { "percentage": 55, "datetime": "2024-10-01T21:00:00Z" },
  { "percentage": 70, "datetime": "2024-10-02T00:00:00Z" },
  { "percentage": 48, "datetime": "2024-10-02T03:00:00Z" },
  { "percentage": 65, "datetime": "2024-10-02T06:00:00Z" },
  { "percentage": 75, "datetime": "2024-10-02T09:00:00Z" },
  { "percentage": 68, "datetime": "2024-10-02T12:00:00Z" }
];
const ramHistory = [
  { "percentage": 80, "datetime": "2024-10-01T09:00:00Z" },
  { "percentage": 76, "datetime": "2024-10-01T12:00:00Z" },
  { "percentage": 90, "datetime": "2024-10-01T15:00:00Z" },
  { "percentage": 65, "datetime": "2024-10-01T18:00:00Z" },
  { "percentage": 85, "datetime": "2024-10-01T21:00:00Z" },
  { "percentage": 95, "datetime": "2024-10-02T00:00:00Z" },
  { "percentage": 72, "datetime": "2024-10-02T03:00:00Z" },
  { "percentage": 90, "datetime": "2024-10-02T06:00:00Z" },
  { "percentage": 78, "datetime": "2024-10-02T09:00:00Z" },
  { "percentage": 88, "datetime": "2024-10-02T12:00:00Z" }
];
const storageHistory = [
  { "percentage": 33, "datetime": "2024-10-01T09:00:00Z" },
  { "percentage": 40, "datetime": "2024-10-01T12:00:00Z" },
  { "percentage": 28, "datetime": "2024-10-01T15:00:00Z" },
  { "percentage": 55, "datetime": "2024-10-01T18:00:00Z" },
  { "percentage": 50, "datetime": "2024-10-01T21:00:00Z" },
  { "percentage": 63, "datetime": "2024-10-02T00:00:00Z" },
  { "percentage": 45, "datetime": "2024-10-02T03:00:00Z" },
  { "percentage": 70, "datetime": "2024-10-02T06:00:00Z" },
  { "percentage": 60, "datetime": "2024-10-02T09:00:00Z" },
  { "percentage": 75, "datetime": "2024-10-02T12:00:00Z" }
];


const ObservedAssetDetail: React.FC<ObservedAssetDetailProps> = ({ id }) => {

  const { observedAssetsDetail, error } = useSelector((state: AppState) => state.ObservedAssetsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchObservedAssetById(id));
  }, [dispatch]);

  if (error) {
    return <div>{error}</div>;
  }

  if (observedAssetsDetail === null) {
    return <Box display="flex" justifyContent="center" alignItems="center">
      <Loader />
    </Box>
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} xl={4}>
        <CpuCard history={cpuHistory} />
      </Grid>
      <Grid item xs={12} xl={4}>
        <RamCard history={ramHistory} />
      </Grid>
      <Grid item xs={12} xl={4}>
        <StorageCard history={storageHistory} />
      </Grid>
      <Grid item xs={12} xl={12}>
        <SystemInfoCards id={id} />
      </Grid>
      <Grid item xs={12} xl={12}>
        <AntivirusTable id={id} />
      </Grid>
      <Grid item xs={12} xl={12}>
        <ServiceTable id={id} />
      </Grid>

    </Grid>
  );
};

export default ObservedAssetDetail;