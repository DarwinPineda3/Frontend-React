import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from "@mui/material";
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import WpScanDetail from 'src/components/vulnerabilities/web/wordpress/wpscanDetail';
import WPScanListTable from 'src/components/vulnerabilities/web/wordpress/wpsscanTable';
import WpVulDetail from 'src/components/vulnerabilities/web/wordpress/wpVulnerabilityDetail';

const WordpressAplications = () => {
  // Get params from the URL
  const { scanId, vulnerabilityId: vulnId } = useParams<{ scanId?: string, vulnerabilityId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();  // Tracks the current URL location

  const [selectedScan, setSelectedScan] = useState<string | null>(null);
  const [selectedVulnerability, setSelectedVulnerability] = useState<string | null>(null);

  // Synchronize state with URL parameters
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
  }, [scanId, vulnId, location]);

  // Handle navigating to an alert detail
  const handleVulnClick = (vulnOd: string) => {
    navigate(`/vulnerabilities/web/wordpress/${selectedScan}/vulnerabilities/${vulnOd}`);
  };

  // Handle navigating to a scan detail
  const handleScanClick = (scanId: string) => {
    navigate(`/vulnerabilities/web/wordpress/${scanId}`);
  };
  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/vulnerabilities/web">
              {t('menu.vulnerabilities')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/vulnerabilities/web/wordpress">
              {t('menu.wordpress')}
            </Link>
            {selectedScan && (
              <Link component={RouterLink} color="inherit" to={`/vulnerabilities/web/wordpress/${selectedScan}`}>
                {t('vulnerabilities.wordpress_scans')}
              </Link>
            )}
            {selectedVulnerability && (
              <Typography color="textPrimary">
                {t('vulnerabilities.vulnerability')}
              </Typography>
            )}
          </Breadcrumbs>
        </Box>
      </Box>

      {/* If a scan is selected and no alert is selected, show scan details */}
      {selectedScan && !selectedVulnerability ? (
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <WpScanDetail scanId={selectedScan!} onAlertClick={handleVulnClick} />
          </Grid>
        </Grid>
      ) : selectedVulnerability ? (
        // If an alert is selected, show alert detail
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <WpVulDetail scanId={selectedScan!} vulnId={selectedVulnerability!} />
          </Grid>
        </Grid>
      ) : (
        // Default view: show scan list
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <WPScanListTable onScanClick={handleScanClick} />
          </Grid>
        </Grid>
      )}
    </PageContainer>
  );
};

export default WordpressAplications;
