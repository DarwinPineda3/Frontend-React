import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Grid,
  IconButton,
  Link,
  Snackbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import NetworkObsScansCreate from 'src/components/observability/network/networkObsScansCreate';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchNetworkScanCreate } from 'src/store/vulnerabilities/network/NetworkScansSlice';
import { ResponseData } from 'src/types/vulnerabilities/network/networkScansType';

const NetworkObservabilityCreateScan = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');

  const networkScanCreate: ResponseData = useSelector(
    (state: any) => state.networkScanReducer.networkScanCreate,
  );

  const { error } = useSelector(
    (state: any) => state.NetworkObservabilityReducer,
  );

  useEffect(() => {
    dispatch(fetchNetworkScanCreate());
    if (snackbarMessage && snackbarSeverity) {
      setSnackbarOpen(true);
    }
  }, [dispatch, snackbarMessage, snackbarSeverity]);

  const handleFormSubmit = (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error',
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(false);
  };
  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/observability/network">
              {t('menu.observability')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/observability/network">
              {t('observability.network_scans')}
            </Link>
            <Typography color="textPrimary">
              {t('dashboard.create')}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NetworkObsScansCreate
            onSubmit={handleFormSubmit}
            networkScanCreate={networkScanCreate}
          />
          <Grid item xs={12}>
            {/* Snackbar */}
            {snackbarOpen && (
              <Snackbar
                open={snackbarOpen}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={2000}
                onClose={() => navigate(`/observability/network`)}
              >
                <Alert
                  onClose={() => navigate(`/observability/network`)}
                  severity={snackbarSeverity}
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  <AlertTitle>
                    {t('vulnerabilities.network_vulnerabilities.network_scan_created')}
                  </AlertTitle>{' '}
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            )}
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default NetworkObservabilityCreateScan;
