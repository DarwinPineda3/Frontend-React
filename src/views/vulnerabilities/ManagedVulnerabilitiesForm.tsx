import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import ManagedVulnerabilityForm from 'src/components/vulnerabilities/management/managedVulnerabilityForm';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchVulnerabilityById } from 'src/store/vulnerabilities/ManagementVulnSlice';
import { managementVulnerabilityType } from 'src/types/vulnerabilities/vulnerabilityManagementType';

const ManagedVulnerabilitiesForm = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editManagedVuln, setEditManagedVuln] = useState<null | any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');

  const selectedVulnerability: managementVulnerabilityType = useSelector(
    (state: any) => state.managementVulnReducer.selectedVulnerability,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchVulnerabilityById(Number(id)));
    }
  }, [id, dispatch]);

  const handleFormSubmit = (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error',
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(false);
    setTimeout(() => {
      setSnackbarOpen(true);
    }, 0);
  };
  return (
    <PageContainer title="Akila">
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
              to={`/vulnerabilities/management/detail/${selectedVulnerability?.id}`}
            >
              {selectedVulnerability?.name}
            </Link>
            <Typography color="textPrimary">
              {t('vulnerabilities.management.management_form')}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ManagedVulnerabilityForm
            onSubmit={handleFormSubmit}
            vulnerability={selectedVulnerability}
          />
          <Grid item xs={12}>
            {/* Snackbar */}
            {snackbarOpen && (
              <SnackBarInfo
                color={snackbarSeverity}
                title="Operation Status"
                message={snackbarMessage}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ManagedVulnerabilitiesForm;
