import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import ThresholdForm from 'src/components/observability/thresholdform/ThresholdForm';
import Loader from 'src/components/shared/Loader/Loader';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { fetchThresholdSettings, updateThresholdSettings } from 'src/store/observability/ThresholdSettingsSlice';
import { AppState, useDispatch, useSelector } from 'src/store/Store';

const ThresholdSettings: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { settingsId } = useParams<{ settingsId?: string }>();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Ref to track the first render
  const isFirstRender = useRef(true);

  const { thresholds, error } = useSelector((state: AppState) => state.ThresholdSlice);

  useEffect(() => {
    // Skip showing the snackbar on the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);  // Show snackbar when there is an error
    }
  }, [error]);

  useEffect(() => {
    // Skip showing the snackbar on the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (thresholds) {
      setSnackbarMessage('Threshold settings updated successfully');
      setSnackbarSeverity('success');
    }
  }, [thresholds]);

  useEffect(() => {
    dispatch(fetchThresholdSettings());
  }, [dispatch]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleFormSubmit = (data: {
    cpu: number;
    ram: number;
    storage: number;
    email: string;
  }) => {
    dispatch(updateThresholdSettings(
      data,
      () => {
        console.log('Threshold settings updated successfully');
        setSnackbarOpen(true);
      }
    ));
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
            <Link component={RouterLink} color="inherit" to="/observability/threshold-settings">
              {t('breadcrumb.threshold_settings')}
            </Link>
            {settingsId && (
              <Link component={RouterLink} color="inherit" to={`/observability/threshold-settings/${settingsId}`}>
                {t('breadcrumb.threshold_details')}
              </Link>
            )}
          </Breadcrumbs>
        </Box>
      </Box>

      <Grid item xs={12}>
        <ThresholdForm onSubmit={handleFormSubmit} initialValues={thresholds} />
      </Grid>

      {snackbarOpen && (
        <SnackBarInfo
          color={snackbarSeverity}
          title={t('dashboard.operation_status')}
          message={snackbarMessage}
          onClose={handleCloseSnackbar}  // Close snackbar on close event
        />
      )}
    </PageContainer>
  );
};

export default ThresholdSettings;
