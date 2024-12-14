import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import BreachElementTypeChart from 'src/components/observability/dark-web/breachByElementTypeChart';
import SecurityIncidentsPolygon from 'src/components/observability/dark-web/SecurityIncidentsPolygon';
import ThreatTypesBarChart from 'src/components/observability/dark-web/threatTypesBarChart';
import TopCardsDarkWeb from 'src/components/observability/dark-web/topCardsDarkWeb';
import VIPsHeatmapChart from 'src/components/observability/dark-web/vipHeatMap';
import CompromisedTypesChart from 'src/components/observability/dark-web/vipsRadarChart';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchBrandMonitoringData, fetchBrandMonitoringResume } from 'src/store/sections/cyber-guard/BrandMonitoringSlice';
import { useDispatch, useSelector } from 'src/store/Store';

const DarkWeb = () => {
  const brandMonitoringResume: any = useSelector((state: any) => state.brandMonitoringReducer.brandMonitoringResume);

  const brandMonitoringData: any = useSelector((state: any) => state.brandMonitoringReducer.brandMonitoringData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchBrandMonitoringResume());
    dispatch(fetchBrandMonitoringData());
  }, [dispatch]);

  const cardsValues = [
    brandMonitoringResume?.['total'] ?? 0, // Total Compromises
    brandMonitoringResume?.['domains'] ?? 0, // Domains
    brandMonitoringResume?.['emails'] ?? 0, // Emails
    brandMonitoringResume?.['ip'] ?? 0, // IPs
    brandMonitoringResume?.['usernames'] ?? 0, // Usernames
    brandMonitoringResume?.['phones'] ?? 0, // Phones
    brandMonitoringResume?.['social_network_total'] ?? 0, // Malware Count
    brandMonitoringResume?.['vins'] ?? 0, // Compromised VIPs Count
    brandMonitoringResume?.['dark_web_total'] ?? 0, // Fake Applications Count
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
  ]

  const topDetectedThreatTypesData = [
    brandMonitoringResume?.['security_leaks_total'] ?? 0,
    brandMonitoringResume?.['dark_web_total'] ?? 0,
    brandMonitoringResume?.['phishing'] ?? 0,
    brandMonitoringResume?.['social_network_total'] ?? 0,
  ]

  const elementsBySocialNetwork = [
    brandMonitoringResume?.['facebook'] ?? 0,
    brandMonitoringResume?.['instagram'] ?? 0,
    brandMonitoringResume?.['linkedin'] ?? 0,
    brandMonitoringResume?.['twitter'] ?? 0,
  ]

  const breachesByStatusData = [
    brandMonitoringResume?.['open'] ?? 0,
    brandMonitoringResume?.['closed'] ?? 0,
    brandMonitoringResume?.['in_migration'] ?? 0,
  ]

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


  if (Object.keys(brandMonitoringResume).length === 0) {
    return <Box display="flex" justifyContent="center" mt={4} mb={4}>
      <Loader />
    </Box>
  }

  return (

    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/monitoring/threats-overview">
              {t('menu.monitoring')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/monitoring/threats-overview">
              {t('menu.dark_web_monitoring')}
            </Link>
          </Breadcrumbs>
          <Box flexGrow={1} />
          {/*          <Box display="flex" alignItems="center" mt={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                renderInput={(props) => (
                  <CustomTextField
                    {...props}
                    fullWidth
                    size="small"
                    sx={{
                      '& .MuiSvgIcon-root': {
                        width: '18px',
                        height: '18px',
                      },
                      '& .MuiFormHelperText-root': {
                        display: 'none',
                      },
                    }}
                  />
                )}
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
              />
            </LocalizationProvider>
            -
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                renderInput={(props) => (
                  <CustomTextField
                    {...props}
                    fullWidth
                    size="small"
                    sx={{
                      '& .MuiSvgIcon-root': {
                        width: '18px',
                        height: '18px',
                      },
                      '& .MuiFormHelperText-root': {
                        display: 'none',
                      },
                    }}
                  />
                )}
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
              />
            </LocalizationProvider>
            
          </Box>
          */}
        </Box>
      </Box>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12}>
          <TopCardsDarkWeb values={cardsValues} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box style={{ display: 'flex', height: '100%' }}>
            <SecurityIncidentsPolygon
              series={[series]}
              labels={polygonLabels}
            />
          </Box>
        </Grid>
        {/*
        <Grid item xs={12} lg={3}>
          <Box style={{ display: 'flex', height: '100%' }}>
            <BreachStatusChart data={breachesByStatusData} />
          </Box>
        </Grid>
        */}
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
        {/* Optional chart
        <Grid item xs={12} lg={12}>
          <ThreatsByFuzzerChart />
        </Grid>
        
            <Grid item xs={12} lg={12}>
                <UsernamesTable />
            </Grid>
            <Grid item xs={12} lg={12}>
                <DomainTable />
            </Grid>
            */}
      </Grid>
    </PageContainer>
  );
};

export default DarkWeb;

