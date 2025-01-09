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
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import NetworkObsScansCreate from 'src/components/observability/network/networkObsScansCreate';

const NetworkObservabilityCreateScan = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');


  const handleFormSubmit = (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error',
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
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
