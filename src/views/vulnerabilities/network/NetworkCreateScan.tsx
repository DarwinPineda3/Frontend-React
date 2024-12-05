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
import NetworkScanCreateForm from 'src/components/vulnerabilities/network/networkScansCreate';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchNetworkScanCreate } from 'src/store/vulnerabilities/network/NetworkScansSlice';
import { ResponseData } from 'src/types/vulnerabilities/network/networkScansType';

const NetworkCreateScan = () => {
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
            <Link component={RouterLink} color="inherit" to="/vulnerabilities/network/scans">
              {t('vulnerabilities.vulnerabilities')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/vulnerabilities/network/scans">
              {t('vulnerabilities.network_vulnerabilities.network')}
            </Link>
            <Typography color="textPrimary">
              {t('vulnerabilities.network_vulnerabilities.add_scan')}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NetworkScanCreateForm
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
                onClose={() => navigate(`/vulnerabilities/network/scans`)}
              >
                <Alert
                  onClose={() => navigate(`/vulnerabilities/network/scans`)}
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

export default NetworkCreateScan;
