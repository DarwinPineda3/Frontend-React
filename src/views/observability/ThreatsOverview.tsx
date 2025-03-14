import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import BreachElementTypeChart from 'src/components/observability/dark-web/breachByElementTypeChart';
import SecurityIncidentsPolygon from 'src/components/observability/dark-web/SecurityIncidentsPolygon';
import ThreatTypesBarChart from 'src/components/observability/dark-web/threatTypesBarChart';
import TopCardsDarkWeb from 'src/components/observability/dark-web/topCardsDarkWeb';
import VIPsHeatmapChart from 'src/components/observability/dark-web/vipHeatMap';
import CompromisedTypesChart from 'src/components/observability/dark-web/vipsRadarChart';
import Loader from 'src/components/shared/Loader/Loader';

const ThreatsOverview = () => {
  const { selectedScan } = useParams<{ selectedScan?: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [brandMonitoringResume, setBrandMonitoringResume] = useState<any>({});
  const [brandMonitoringData, setBrandMonitoringData] = useState<any>({});

  useEffect(() => {
    const exampleBrandMonitoringResume = {
      total_results: 100,
      domains: 20,
      emails: 30,
      ip: 10,
      usernames: 15,
      phones: 25,
      social_network_total: 40,
      vins: 5,
      dark_web_total: 50,
      linked_url_internal: 10,
      linked_url_external: 20,
      interesting_files: 15,
      public_code_repo: 5,
      security_leaks_total: 60,
      phishing: 25,
      facebook: 10,
      instagram: 15,
      linkedin: 20,
      twitter: 25,
      open: 30,
      closed: 40,
      in_migration: 10,
    };

    const exampleBrandMonitoringData = {
      latest_data: [
        { query: 'VIP 1', id: 1 },
        { query: 'VIP 2', id: 2 },
        { query: 'VIP 3', id: 3 },
      ],
    };

    setBrandMonitoringResume(exampleBrandMonitoringResume);
    setBrandMonitoringData(exampleBrandMonitoringData);
    setLoading(false);
  }, []);

  const cardsValues = [
    brandMonitoringResume?.['total_results'] ?? 0, // Total Compromises
    brandMonitoringResume?.['domains'] ?? 0, // Domains
    brandMonitoringResume?.['emails'] ?? 0, // Emails
    brandMonitoringResume?.['ip'] ?? 0, // IPs
    brandMonitoringResume?.['usernames'] ?? 0, // Usernames
    brandMonitoringResume?.['phones'] ?? 0, // Phones
    brandMonitoringResume?.['social_network_total'] ?? 0, // Malware Count
    brandMonitoringResume?.['vins'] ?? 0, // Compromised VIPs Count
    brandMonitoringResume?.['dark_web_total'] ?? 0, // Fake Applications Count
    brandMonitoringResume?.['linked_url_internal'] ?? 0, // Fake Applications Count
    brandMonitoringResume?.['linked_url_external'] ?? 0, // Fake Applications Count
    brandMonitoringResume?.['interesting_files'] ?? 0, // Fake Applications Count
    brandMonitoringResume?.['public_code_repo'] ?? 0, // Fake Applications Count
  ];

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

  const topDetectedThreatTypesData = [
    brandMonitoringResume?.['security_leaks_total'] ?? 0,
    brandMonitoringResume?.['dark_web_total'] ?? 0,
    brandMonitoringResume?.['phishing'] ?? 0,
    brandMonitoringResume?.['social_network_total'] ?? 0,
  ];

  const elementsBySocialNetwork = [
    brandMonitoringResume?.['facebook'] ?? 0,
    brandMonitoringResume?.['instagram'] ?? 0,
    brandMonitoringResume?.['linkedin'] ?? 0,
    brandMonitoringResume?.['twitter'] ?? 0,
  ];

  const breachesByStatusData = [
    brandMonitoringResume?.['open'] ?? 0,
    brandMonitoringResume?.['closed'] ?? 0,
    brandMonitoringResume?.['in_migration'] ?? 0,
  ];

  const series = {
    name: 'Breaches',
    data: polygonValues,
  };

  const [startDate, setStartDate] = useState<Date | null>(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  });
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Loader />
      </Box>
    );
  }

  return (
    <PageContainer title="Darwin's project">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/monitoring/threats-overview">
              {t('menu.monitoring')}
            </Link>
            {selectedScan ? (
              <Link
                component={RouterLink}
                color="inherit"
                to={`/monitoring/threats-overview/${selectedScan}`}
              >
                {t('menu.dark_web_monitoring')}
              </Link>
            ) : (
              <Typography color="textPrimary">{t('menu.dark_web_monitoring')}</Typography>
            )}
            {selectedScan && <Typography color="textPrimary">{selectedScan}</Typography>}
          </Breadcrumbs>
          <Box flexGrow={1} />
        </Box>
      </Box>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12}>
          <TopCardsDarkWeb values={cardsValues} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box style={{ display: 'flex', height: '100%' }}>
            <SecurityIncidentsPolygon series={[series]} labels={polygonLabels} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box style={{ display: 'flex', height: '100%' }}>
            <BreachElementTypeChart series={polygonValues} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box style={{ display: 'flex', height: '100%' }}>
            <CompromisedTypesChart data={elementsBySocialNetwork} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box style={{ display: 'flex', height: '100%' }}>
            <ThreatTypesBarChart data={topDetectedThreatTypesData} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <VIPsHeatmapChart varList={brandMonitoringData.latest_data?.slice(0, 3) ?? []} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ThreatsOverview;