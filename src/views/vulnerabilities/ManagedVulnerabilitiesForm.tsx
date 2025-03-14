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
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Loader from 'src/components/shared/Loader/Loader';
import ManagedVulnerabilityForm from 'src/components/vulnerabilities/management/managedVulnerabilityForm';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchVulnerabilityById } from 'src/store/vulnerabilities/ManagementVulnSlice';
import { VulnerabilityResponse } from 'src/types/vulnerabilities/vulnerabilityManagementType';

const ManagedVulnerabilitiesForm = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');
  const [isLoading, setIsLoading] = useState(false);

  const selectedVulnerability: VulnerabilityResponse = useSelector(
    (state: any) => state.managementVulnReducer.selectedVulnerability,
  );

  useEffect(() => {
    if (snackbarMessage && snackbarSeverity) {
      setSnackbarOpen(true);
    }
    if (id) {
      const fetchData = async () => {
        setIsLoading(true);
        await dispatch(fetchVulnerabilityById(Number(id)));
        setIsLoading(false);
      };
      fetchData();
    }
  }, [id, dispatch, snackbarMessage, snackbarSeverity]);

  const handleFormSubmit = (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error',
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(false);
  };
  return (
    <PageContainer title="Darwin's project">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/vulnerabilities/management">
              {t('vulnerabilities.management.vulnerabilities')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/vulnerabilities/management">
              {t('vulnerabilities.management.management')}
            </Link>
            <Link
              component={RouterLink}
              color="inherit"
              to={`/vulnerabilities/management/detail/${selectedVulnerability?.vulnerability?.id!}`}
            >
              {selectedVulnerability?.vulnerability?.name}
            </Link>
            <Typography color="textPrimary">
              {t('vulnerabilities.management.management_form')}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
              <Loader />
            </Box>
          ) : (
            <>
              <ManagedVulnerabilityForm
                onSubmit={handleFormSubmit}
                vulnerability={selectedVulnerability!}
              />
            </>
          )}
          <Grid item xs={12}>
            {/* Snackbar */}
            {snackbarOpen && (
              <Snackbar
                open={snackbarOpen}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={3000}
                onClose={() =>
                  navigate(
                    `/vulnerabilities/management/detail/${selectedVulnerability?.vulnerability
                      ?.id!}`,
                  )
                }
              >
                <Alert
                  onClose={() =>
                    navigate(
                      `/vulnerabilities/management/detail/${selectedVulnerability?.vulnerability
                        ?.id!}`,
                    )
                  }
                  severity={snackbarSeverity}
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  <AlertTitle>
                    {t('vulnerabilities.management.managed_vulnerability_updated')}
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

export default ManagedVulnerabilitiesForm;
