import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Loader from 'src/components/shared/Loader/Loader';
import ManagedVulnDetail from 'src/components/vulnerabilities/management/managedVulnerability';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchVulnerabilityById } from 'src/store/vulnerabilities/ManagementVulnSlice';
import { managementVulnerabilityType } from 'src/types/vulnerabilities/vulnerabilityManagementType';

const ManagedVulnerabilitiesDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const selectedVulnerability: managementVulnerabilityType = useSelector(
    (state: any) => state.managementVulnReducer.selectedVulnerability?.vulnerability,
  );
  const error = useSelector((state: any) => state.managementVulnReducer.error);
  const fetchData = async () => {
    setIsLoading(true);
    await dispatch(fetchVulnerabilityById(Number(id)));
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, dispatch]);

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
            <Typography color="textPrimary">{selectedVulnerability?.name}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {selectedVulnerability ? (
            <Box>
              {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                  <Loader />
                </Box>
              ) : (
                <>
                  <ManagedVulnDetail vulnerability={selectedVulnerability!} />
                </>
              )}
            </Box>
          ) : (
            <Typography variant="subtitle2" align="center">
              {t('monitoring.no_data_available')}
            </Typography>
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ManagedVulnerabilitiesDetail;
