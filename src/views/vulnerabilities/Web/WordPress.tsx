import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from "@mui/material";
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import WpScanDetail from 'src/components/vulnerabilities/web/wordpress/wpscanDetail';
import WPScanListTable from 'src/components/vulnerabilities/web/wordpress/wpsscanTable';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';

const WordpressAplications = () => {
  const { scanId, vulnerabilityId: vulnId } = useParams<{ scanId?: string, vulnerabilityId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedScan, setSelectedScan] = useState<string | null>(null);
  const [selectedVulnerability, setSelectedVulnerability] = useState<string | null>(null);

  const [snackBarInfo, setSnackBarInfo] = useState<{
    color: 'error' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (scanId) {
      setSelectedScan(scanId);
    } else {
      setSelectedScan(null);
    }

    if (vulnId) {
      setSelectedVulnerability(vulnId);
    } else {
      setSelectedVulnerability(null);
    }

    if (location.state?.message) {
      setSnackBarInfo({
        color: location.state.severity || 'success',
        title: location.state.title || 'Info',
        message: location.state.message,
      });
    }
  }, [scanId, vulnId, location]);

  const handleScanClick = (scanId: string) => {
    navigate(`/vulnerabilities/web/wordpress/${scanId}`);
  };
  return (
    <PageContainer title="Darwin's project">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/vulnerabilities/web/wordpress">
              {t('menu.vulnerabilities')}
            </Link>
            {selectedScan ? (
              <Link component={RouterLink} color="inherit" to={`/vulnerabilities/web/wordpress`}>
                {t('vulnerabilities.wordpress_scans')}
              </Link>
            ) : (
              <Typography color="textPrimary">{t('vulnerabilities.wordpress_scans')}</Typography>
            )}
            {selectedScan && (
              <Typography color="textPrimary">{selectedScan}</Typography>
            )}
            {selectedVulnerability && (
              <Typography color="textPrimary">
                {t('vulnerabilities.vulnerability')}
              </Typography>
            )}
          </Breadcrumbs>
        </Box>
      </Box>

      {selectedScan ? (
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <WpScanDetail />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <WPScanListTable onScanClick={handleScanClick} />
          </Grid>
          {snackBarInfo && (
            <SnackBarInfo
              color={snackBarInfo.color}
              title={snackBarInfo.title}
              message={snackBarInfo.message}
            />
          )}
        </Grid>
      )}


    </PageContainer>
  );
};

export default WordpressAplications;
