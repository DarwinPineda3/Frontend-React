import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SecurityIncidentsPolygon from 'src/components/observability/dark-web/SecurityIncidentsPolygon';
import EmptyState from 'src/components/shared/EmptyState';
import DashboardCard from '../../shared/DashboardCard';
import Loader from '../../shared/Loader/Loader';

const OrgBreachesCompare = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const [loading, setLoading] = useState(true);
  const [brandMonitoringResume, setBrandMonitoringResume] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular la carga de datos estáticos
    const fetchData = () => {
      setLoading(true);
      try {
        const exampleData = {
          ip: 10,
          emails: 20,
          phones: 15,
          domains: 5,
          usernames: 25,
        };
        setBrandMonitoringResume(exampleData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
  ];

  const series = {
    name: 'Breaches',
    data: polygonValues,
  };

  if (loading) {
    return (
      <DashboardCard title={t("dashboard.organization_breaches") || ''}>
        <Box display="flex" justifyContent="center">
          <Loader />
        </Box>
      </DashboardCard>
    );
  }

  if (error) {
    return <div>{t("dashboard.error", { error })}</div>;
  }

  if (!brandMonitoringResume || Object.keys(brandMonitoringResume).length === 0) {
    return (
      <DashboardCard title={t("dashboard.organization_breaches") || ''}>
        <EmptyState />
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