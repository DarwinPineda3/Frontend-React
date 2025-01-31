import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography, } from "@mui/material";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import CloudScanTable from 'src/components/vulnerabilities/cloud/cloudScansTable';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';


const CloudVulnerabilities = () => {
  const { cloudId } = useParams<{ cloudId?: string }>();
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
    if (cloudId) {
      setSelectedCloud(cloudId);
    } else {
      setSelectedCloud(null);
    }
  }, [cloudId, location]);

  useEffect(() => {
    if (location.state?.message) {
      setSnackBarInfo({
        color: location.state.severity || 'success',
        title: location.state.title || 'Info',
        message: location.state.message,
      });
    }

  }, [location.state]);

  const handleCloudClick = (cloudId: string) => {
    navigate(`/vulnerabilities/cloud/vulnerabilities/${cloudId}`);
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
              <Link component={RouterLink} color="inherit" to="/vulnerabilities/cloud">
                {t('vulnerabilities.vulnerabilities')}
              </Link>
              {selectedCloud ? (
                <Link component={RouterLink} color="inherit" to={`/vulnerabilities/cloud/${selectedCloud}`}>
                  {t('vulnerabilities.vulnerabilities')}
                </Link>
              ) : (
                <Typography color="textPrimary">{t('vulnerabilities.cloud')}</Typography>
              )}
              {selectedCloud && (
                <Typography color="textPrimary">{selectedCloud}</Typography>
              )}
            </Breadcrumbs>
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CloudScanTable onScanClick={handleCloudClick} />
          </Grid>
        </Grid>

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


export default CloudVulnerabilities;
