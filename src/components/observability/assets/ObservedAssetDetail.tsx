import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
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

  const [dateRange, setDateRange] = useState('24h');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);

  const updateDateRange = (range: string) => {
    const now = new Date();
    let newStartDate = new Date();

    switch (range) {
      case '24h':
        newStartDate.setDate(now.getDate() - 1);
        break;
      case '7d':
        newStartDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        newStartDate.setDate(now.getDate() - 30);
        break;
      default:
        return;
    }

    setStartDate(newStartDate.toISOString().split('T')[0]);
    setEndDate(now.toISOString().split('T')[0]);
  };

  useEffect(() => {
    updateDateRange(dateRange);
  }, [dateRange]);

  const isValidDate = (dateString: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString) && !isNaN(new Date(dateString).getTime());
  };

  const handleFetchByDateRange = () => {
    if (isValidDate(startDate) && isValidDate(endDate)) {
      if (observedAssetsDetail?.cpuInfo?.UuId) {
        setLoading(true);
        dispatch(
          fetchObservedAssetsLogsByDateRange(observedAssetsDetail.cpuInfo.UuId, startDate, endDate),
        ).finally(() => setLoading(false));
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchObservedAssetById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (observedAssetsDetail) {
      setLoading(true);
      if (isValidDate(startDate) && isValidDate(endDate)) {
        dispatch(
          fetchObservedAssetsLogsByDateRange(
            observedAssetsDetail?.cpuInfo.UuId!,
            startDate,
            endDate,
          ),
        ).finally(() => setLoading(false));
      }
    }
  }, [observedAssetsDetail, dispatch]);

  const transformAssetLogs = (assetLogs: any[]) => {
    return {
      cpuHistory: assetLogs.map((log) => ({
        percentage: log.CpuInfo.CpuUsage,
        datetime: new Date(log.Timestamp).toISOString(),
      })),
      ramHistory: assetLogs.map((log) => ({
        percentage: log.RamInfo.RamUsagePercentage,
        datetime: new Date(log.Timestamp).toISOString(),
      })),
      storageHistory: assetLogs.map((log) => ({
        percentage: log.Storage.TotalUsagePercentage,
        datetime: new Date(log.Timestamp).toISOString(),
      })),
    };
  };

  const assetLogs = observedAssetsDetailLogs?.asset_logs || [];
  const transformedLogs = useMemo(() => transformAssetLogs(assetLogs), [assetLogs]);
  const { cpuHistory, ramHistory, storageHistory } = transformedLogs;

  if (!observedAssetsDetail || !observedAssetsDetailLogs) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Loader />
      </Box>
    );
  }
  const LoaderCard = () => (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <Loader />
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box display="flex" gap={2}>
          <Select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="24h">{t('observability.last_24_hours')}</MenuItem>
            <MenuItem value="7d">{t('observability.last_week')}</MenuItem>
            <MenuItem value="30d">{t('observability.last_month')}</MenuItem>
            <MenuItem value="custom">{t('observability.custom_range')}</MenuItem>
          </Select>

          {dateRange === 'custom' && (
            <>
              <TextField
                label={t('observability.start_date')}
                type="date"
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                error={!isValidDate(startDate)}
                helperText={!isValidDate(startDate) ? t('observability.invalid_date') : ''}
                sx={{ flex: 1 }}
              />
              <TextField
                label={t('observability.end_date')}
                type="date"
                InputLabelProps={{ shrink: true }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                error={!isValidDate(endDate)}
                helperText={!isValidDate(endDate) ? t('observability.invalid_date') : ''}
                sx={{ flex: 1 }}
              />
            </>
          )}
          <Button
            variant="contained"
            disabled={loading || !startDate || !endDate || new Date(endDate) < new Date(startDate)}
            onClick={handleFetchByDateRange}
            sx={{ whiteSpace: 'nowrap', minWidth: 120 }}
          >
            {loading ? <CircularProgress /> : t('observability.search')!}
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} xl={4}>
        {loading ? <LoaderCard /> : <CpuCard history={cpuHistory} />}
      </Grid>

      <Grid item xs={12} xl={4}>
        {loading ? <LoaderCard /> : <RamCard history={ramHistory} />}
      </Grid>

      <Grid item xs={12} xl={4}>
        {loading ? <LoaderCard /> : <StorageCard history={storageHistory} />}
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
