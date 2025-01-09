import GiottoGroupReducer from './sections/compliance/giottoGroupsSlice';
giottoProjectsReducer: GiottoProjectsReducer,


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
import CreateGiottoProjectForm from 'src/components/compliance/giotto-projects/createGiottoProject';
import PageContainer from 'src/components/container/PageContainer';
import { useDispatch, useSelector } from 'src/store/Store';
import { ResponseData } from 'src/types/vulnerabilities/network/networkScansType';

const CreateComplianceProjects = () => {
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
            <Link component={RouterLink} color="inherit" to="/compliance/projects">
              {t('compliance_menu.compliance')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/compliance/projects">
              {t('compliance_menu.compliance_projects')}
            </Link>
            <Typography color="textPrimary">{t('dashboard.create')}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CreateGiottoProjectForm
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
                onClose={() => navigate(`/compliance/projects`)}
              >
                <Alert
                  onClose={() => navigate(`/compliance/projects`)}
                  severity={snackbarSeverity}
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  <AlertTitle>{t('compliance_projects.project_created')}</AlertTitle>{' '}
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

export default CreateComplianceProjects;
