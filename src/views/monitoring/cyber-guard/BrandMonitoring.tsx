import { useEffect, useState } from 'react';
import { Grid, Box, IconButton, Breadcrumbs, Link, Typography } from '@mui/material';
import { useParams, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageContainer from 'src/components/container/PageContainer';
import BrandMonitoringList from 'src/components/home/monitoring/cyber-guard/brand-monitoring/BrandMonitoringList';
import { useSelector } from 'src/store/Store';
import BrandMonitoringChart from 'src/components/home/monitoring/cyber-guard/brand-monitoring/charts/BrandMonitoringChart';
import BrandMonitoringDetail from 'src/components/home/monitoring/cyber-guard/brand-monitoring/BrandMonitoringDetail';

const BrandMonitoringCyberGuard = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const brandMonitoringChart = useSelector(
    (state: any) => state.brandMonitoringReducer.brandMonitoringData?.summary_data || [],
  );
  const [selectedBrandMonitoring, setselectedBrandMonitoring] = useState<string | null>(null);

  const handleBrandMonitoringClick = (id: string) => {
    navigate(`/monitoring/cyber-guard/brand-monitoring/${id}`);
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
            <Link
              component={RouterLink}
              color="inherit"
              to="/monitoring/cyber-guard/brand-monitoring"
            >
              Cyber Guard
            </Link>
            <Link
              component={RouterLink}
              color="inherit"
              to="/monitoring/cyber-guard/brand-monitoring"
            >
              Brand Monitoring
            </Link>
            {selectedBrandMonitoring ? (
                <Link
                  component={RouterLink}
                  color="inherit"
                  to={`/monitoring/cyber-guard/brand-monitoring/${selectedBrandMonitoring}`}
                >
                  {selectedBrandMonitoring}
                </Link>
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
