import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'; 
import PageContainer from 'src/components/container/PageContainer';
import SummaryMonitoringList from 'src/components/home/monitoring/SummaryMonitoringList';

const SummaryMonitoring = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation(); 

  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get('filter') || '';

  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/monitoring/summary-monitoring">
              {t('monitoring.monitoring')}
            </Link>
            <Typography color="textPrimary">{t('summary.summary')}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SummaryMonitoringList filter={filter} /> 
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default SummaryMonitoring;

