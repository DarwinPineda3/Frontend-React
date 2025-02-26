import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import BrandMonitoringDetail from 'src/components/home/monitoring/cyber-guard/brand-monitoring/BrandMonitoringDetail';
import BrandMonitoringList from 'src/components/home/monitoring/cyber-guard/brand-monitoring/BrandMonitoringList';
import BrandMonitoringChart from 'src/components/home/monitoring/cyber-guard/brand-monitoring/charts/BrandMonitoringChart';
import { useSelector } from 'src/store/Store';

//TODO: separate into different views
const BrandMonitoringCyberGuard = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const brandMonitoringChart = useSelector(
    (state: any) => state.brandMonitoringReducer.brandMonitoringData?.summary_data || [],
  );
  const [selectedBrandMonitoring, setselectedBrandMonitoring] = useState<string | null>(null);

  const handleBrandMonitoringClick = (id: string) => {
    navigate(`/monitoring/cyber-guard/monitoring/${id}?dataType=internet`);
  };

  useEffect(() => {
    if (id) {
      setselectedBrandMonitoring(String(id));
    } else {
      setselectedBrandMonitoring(null);
    }
  }, [id, location]);

  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="">
              {t('menu.monitoring')}
            </Link>
            <Link component={RouterLink} color="inherit" to="">
              {t('monitoring.cyber_guard')}
            </Link>
            {selectedBrandMonitoring ? (
              <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard/monitoring">
                {t('menu.monitoring')}
              </Link>
            ) : (
              <Typography color="textPrimary">{t('menu.monitoring')}</Typography>
            )}
            {selectedBrandMonitoring ? (
              <Typography color="textPrimary">{selectedBrandMonitoring}</Typography>
            ) : null}
          </Breadcrumbs>
        </Box>
      </Box>

      {selectedBrandMonitoring ? (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <BrandMonitoringDetail id={selectedBrandMonitoring!} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <BrandMonitoringChart data={brandMonitoringChart} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <BrandMonitoringList onBrandMonitoringClick={handleBrandMonitoringClick} />
          </Grid>
        </Grid>
      )}
    </PageContainer>
  );
};

export default BrandMonitoringCyberGuard;
