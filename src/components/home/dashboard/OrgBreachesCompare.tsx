import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SecurityIncidentsPolygon from 'src/components/observability/dark-web/SecurityIncidentsPolygon';
import { fetchBrandMonitoringData, fetchBrandMonitoringResume } from 'src/store/sections/cyber-guard/BrandMonitoringSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import DashboardCard from '../../shared/DashboardCard';
import Loader from '../../shared/Loader/Loader';

const OrgBreachesCompare = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const brandMonitoringResume: any = useSelector((state: any) => state.brandMonitoringReducer.brandMonitoringResume);
  useEffect(() => {
    dispatch(fetchBrandMonitoringResume());
    dispatch(fetchBrandMonitoringData());
  }, [dispatch]);

  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const polygonValues = [
    brandMonitoringResume?.['ip'] ?? 0,
    brandMonitoringResume?.['emails'] ?? 0,
    brandMonitoringResume?.['phones'] ?? 0,
    brandMonitoringResume?.['domains'] ?? 0,
    brandMonitoringResume?.['usernames'] ?? 0,
  ];

  const polygonLabels = [
    t('observability.ip'),
    t('observability.p_email'),
    t('observability.phone'),
    t('observability.domain'),
    t('observability.username'),
  ]

  const series = {
    name: 'Breaches',
    data: polygonValues,
  };



  if (!brandMonitoringResume || !brandMonitoringResume?.ip) {
    return (
      <DashboardCard title={t("dashboard.organization_breaches") || ''}>
        <Box display="flex" justifyContent="center" >
          <Loader />
        </Box>
      </DashboardCard>
    );
  }

  return (
    <Box style={{ display: 'flex', height: '100%' }}>
      <SecurityIncidentsPolygon
        series={[series]}
        labels={polygonLabels}
      />
    </Box>
  );
};

export default OrgBreachesCompare;
