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
  Typography
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import ThresholdForm from 'src/components/observability/thresholdform/ThresholdForm';
import Loader from 'src/components/shared/Loader/Loader';
import {
  fetchThresholdSettings,
  updateThresholdSettings,
} from 'src/store/observability/ThresholdSettingsSlice';
import { AppState, useDispatch, useSelector } from 'src/store/Store';

const ThresholdSettings: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { settingsId } = useParams<{ settingsId?: string }>();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Ref to track the first render
  const isFirstRender = useRef(true);

  const { thresholds } = useSelector((state: AppState) => state.ThresholdSlice);

  useEffect(() => {
    dispatch(fetchThresholdSettings());
  }, [dispatch]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleFormSubmit = (data: { cpu: number; ram: number; storage: number; email: string }) => {
    dispatch(updateThresholdSettings(data))
      .then(() => {
        setSnackbarMessage(t('thresholdForm.success_message')!);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch((err) => {
        setSnackbarMessage(t('thresholdForm.error_message')!);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (!thresholds) {
    return (
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Loader />
      </Box>
    );
  }

  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={handleBack} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/observability/threshold-settings">
              {t('breadcrumb.observability')}
            </Link>
            {settingsId ? (
              <Link component={RouterLink} color="inherit" to={`/observability/threshold-settings/${settingsId}`}>
                {t('threshold.threshold_settings')}
              </Link>
            ) : (
              <Typography color="textPrimary">{t('threshold.threshold_settings')}</Typography>
            )}
            {settingsId && (
              <Typography color="textPrimary">{settingsId}</Typography>
            )}
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid item xs={12}>
        <ThresholdForm onSubmit={handleFormSubmit} initialValues={thresholds} />
      </Grid>
      <Grid item xs={12}>
        {snackbarOpen && (
          <Snackbar
            open={snackbarOpen}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
          >
            <Alert severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>
              <AlertTitle>{t('dashboard.operation_status')}</AlertTitle> {snackbarMessage}
            </Alert>
          </Snackbar>
        )}
      </Grid>
    </PageContainer>
  );
};

export default ThresholdSettings;
