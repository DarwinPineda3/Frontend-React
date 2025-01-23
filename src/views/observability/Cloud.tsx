import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import CloudInventoryTable from 'src/components/observability/cloud/cloudInventoryTable';
import CloudScansDetailObs from 'src/components/observability/cloud/cloudScanDetail';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';

const CloudInventory = () => {
  const { scanId } = useParams<{ scanId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCloud, setSelectedCloud] = useState<string | null>(null);

  const [snackBarInfo, setSnackBarInfo] = useState<{
    color: 'error' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
  } | null>(null);

  const { t } = useTranslation();
  useEffect(() => {
    if (scanId) {
      setSelectedCloud(scanId);
    } else {
      setSelectedCloud(null);
    }
  }, [scanId, location]);

  useEffect(() => {
    if (location.state?.message) {
      setSnackBarInfo({
        color: location.state.severity || 'success',
        title: location.state.title || 'Info',
        message: location.state.message,
      });
    }
  }, [location.state]);

  const handleInventoryClick = (scanId: string) => {
    navigate(`/observability/cloud/scans/${scanId}`);
  };

  return (
    <PageContainer title="Akila">
      <>
        <Box mb={2}>
          <Box display="flex" alignItems="center" mt={2}>
            <IconButton onClick={() => navigate(-1)} color="primary">
              <ArrowBackIcon />
            </IconButton>
            <Breadcrumbs aria-label="breadcrumb">
              <Link component={RouterLink} color="inherit" to="/observability/cloud">
                {t('menu.observability')}
              </Link>
              <Typography color="textPrimary">{t('menu.cloud')}</Typography>
            </Breadcrumbs>
          </Box>
        </Box>
        {selectedCloud ? (
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <CloudScansDetailObs scanId={selectedCloud!} />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CloudInventoryTable onScanClick={handleInventoryClick} />
            </Grid>
          </Grid>
        )}

        {snackBarInfo && (
          <SnackBarInfo
            color={snackBarInfo.color}
            title={snackBarInfo.title}
            message={snackBarInfo.message}
          />
        )}
      </>
    </PageContainer>
  );
};

export default CloudInventory;
