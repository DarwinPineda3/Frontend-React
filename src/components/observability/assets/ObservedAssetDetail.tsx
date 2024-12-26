import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from 'src/components/shared/Loader/Loader';
import { AppState, useDispatch, useSelector } from 'src/store/Store';
import {
  fetchObservedAssetById,
  fetchObservedAssetsLogsByDateRange,
} from 'src/store/observability/ObservedAssetsSlice';
import AntivirusTable from './cards/AntivirusInfo';
import CpuCard from './cards/CpuCard';
import RamCard from './cards/RamCard';
import ServiceTable from './cards/ServicesTable';
import StorageCard from './cards/StorageCard';
import SystemInfoCards from './cards/SystemInfoCard';

interface ObservedAssetDetailProps {
  id: string;
}

const ObservedAssetDetail: React.FC<ObservedAssetDetailProps> = ({ id }) => {
  const { observedAssetsDetail, observedAssetsDetailLogs } = useSelector(
    (state: AppState) => state.ObservedAssetsReducer,
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    now.setDate(1);
    return now.toISOString().split('T')[0];
  });

  const [endDate, setEndDate] = useState(() => {
    const now = new Date();
    now.setMonth(now.getMonth() + 1, 1);
    return now.toISOString().split('T')[0];
  });

  const isValidDate = (dateString: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      return false;
    }

    const date = new Date(dateString);
    const year = date.getFullYear();

    if (year < 1900 || year > 2100) {
      return false;
    }

    return !isNaN(date.getTime());
  };

  const handleFetchByDateRange = () => {
    if (isValidDate(startDate) && isValidDate(endDate)) {
      if (observedAssetsDetail?.cpuInfo?.UuId) {
        dispatch(
          fetchObservedAssetsLogsByDateRange(observedAssetsDetail.cpuInfo.UuId, startDate, endDate),
        );
      }
    }
  };

  useEffect(() => {
    dispatch(fetchObservedAssetById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (observedAssetsDetail) {
      if (isValidDate(startDate) && isValidDate(endDate)) {
        dispatch(
          fetchObservedAssetsLogsByDateRange(
            observedAssetsDetail?.cpuInfo.UuId!,
            startDate,
            endDate,
          ),
        );
      }
    }
  }, [observedAssetsDetail, dispatch]);

  const transformAssetLogs = (assetLogs: any[]) => {
    const cpuHistory = assetLogs.map((log) => ({
      percentage: log.CpuInfo.CpuUsage,
      datetime: new Date(log.Timestamp).toISOString(),
    }));

    const ramHistory = assetLogs.map((log) => ({
      percentage: log.RamInfo.RamUsagePercentage,
      datetime: new Date(log.Timestamp).toISOString(),
    }));

    const storageHistory = assetLogs.map((log) => ({
      percentage: log.Storage.TotalUsagePercentage,
      datetime: new Date(log.Timestamp).toISOString(),
    }));

    return { cpuHistory, ramHistory, storageHistory };
  };
  const assetLogs = observedAssetsDetailLogs?.asset_logs || [];
  const { cpuHistory, ramHistory, storageHistory } = transformAssetLogs(assetLogs);

  if (!observedAssetsDetail || !observedAssetsDetailLogs) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Loader />
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box display="flex" gap={2}>
          <TextField
            label={t('observability.start_date')!}
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            error={!isValidDate(startDate)}
            helperText={!isValidDate(startDate) ? t('observability.invalid_date') : ''}
            sx={{ flex: 1 }}
          />
          <TextField
            label={t('observability.end_date')!}
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            error={!isValidDate(endDate)}
            helperText={!isValidDate(endDate) ? t('observability.invalid_date') : ''}
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
            disabled={!startDate || !endDate || new Date(endDate) < new Date(startDate)}
            onClick={handleFetchByDateRange}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {t('observability.search')!}
          </Button>
        </Box>
      </Grid>
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
