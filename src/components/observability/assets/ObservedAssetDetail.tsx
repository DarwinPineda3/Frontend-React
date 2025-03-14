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
  const { t } = useTranslation();

  const [dateRange, setDateRange] = useState('24h');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [observedAssetsDetail, setObservedAssetsDetail] = useState<any | null>(null);
  const [observedAssetsDetailLogs, setObservedAssetsDetailLogs] = useState<any[]>([]);

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

  useEffect(() => {
    // Simular la carga de datos estáticos
    const fetchData = () => {
      setLoading(true);
      try {
        const exampleDetail = {
          cpuInfo: { UuId: '1234', CpuUsage: 45 },
          ramInfo: { RamUsagePercentage: 55 },
          storage: { TotalUsagePercentage: 65 },
          hostname: 'Asset 1',
          firewall: 'Running',
          timestamp: '2023-03-13T12:00:00Z',
        };

        const exampleLogs = [
          {
            CpuInfo: { CpuUsage: 45 },
            RamInfo: { RamUsagePercentage: 55 },
            Storage: { TotalUsagePercentage: 65 },
            Timestamp: '2023-03-13T12:00:00Z',
          },
          {
            CpuInfo: { CpuUsage: 25 },
            RamInfo: { RamUsagePercentage: 35 },
            Storage: { TotalUsagePercentage: 45 },
            Timestamp: '2023-03-12T12:00:00Z',
          },
          // Agrega más datos de ejemplo según sea necesario
        ];

        setObservedAssetsDetail(exampleDetail);
        setObservedAssetsDetailLogs(exampleLogs);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const isValidDate = (dateString: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString) && !isNaN(new Date(dateString).getTime());
  };

  const handleFetchByDateRange = () => {
    if (isValidDate(startDate) && isValidDate(endDate)) {
      if (observedAssetsDetail?.cpuInfo?.UuId) {
        setLoading(true);
        // Simular la carga de datos por rango de fechas
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
  };

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

  const assetLogs = observedAssetsDetailLogs || [];
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