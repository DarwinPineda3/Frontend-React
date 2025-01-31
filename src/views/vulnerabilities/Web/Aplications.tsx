import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from "@mui/material";
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import AlertDetail from 'src/components/vulnerabilities/web/applications/alertDetail';
import ScanListDetail from 'src/components/vulnerabilities/web/applications/scanDetail';
import ScanListTable from "src/components/vulnerabilities/web/applications/webScansTable"; // New Detail Component

const WebApplications = () => {
  // Get params from the URL
  const { scanId, alertId } = useParams<{ scanId?: string, alertId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();  // Tracks the current URL location

  const [selectedScan, setSelectedScan] = useState<string | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  // Synchronize state with URL parameters
  useEffect(() => {
    if (scanId) {
      setSelectedScan(scanId);
    } else {
      setSelectedScan(null);
    }

    if (alertId) {
      setSelectedAlert(alertId);
    } else {
      setSelectedAlert(null);
    }
  }, [scanId, alertId, location]);

  // Handle navigating to an alert detail
  const handleAlertClick = (alertId: number) => {
    navigate(`/vulnerabilities/web/applications/${selectedScan}/alerts/${alertId}`);
  };

  // Handle navigating to a scan detail
  const handleScanClick = (scanId: number) => {
    navigate(`/vulnerabilities/web/applications/${scanId}`);
  };

  // Handle navigating back to the scan list
  const handleBackToScans = () => {
    navigate('/vulnerabilities/web/applications');
  };

  // Handle navigating back to the alert list
  const handleBackToAlerts = () => {
    navigate(`/vulnerabilities/web/applications/${selectedScan}`);
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
            {selectedScan ? (
              <Link component={RouterLink} color="inherit" to={`/vulnerabilities/web/applications/${selectedScan}`}>
                {t('menu.applications')}
              </Link>
            ) : (
              <Typography color="textPrimary">{t('menu.applications')}</Typography>
            )}
            {selectedScan && (
              <Typography color="textPrimary">{selectedScan}</Typography>
            )}
            {selectedAlert && (
              <Typography color="textPrimary">
                {t('vulnerabilities.view_alert')}
              </Typography>
            )}
          </Breadcrumbs>
        </Box>
      </Box>

      {/* If a scan is selected and no alert is selected, show scan details */}
      {selectedScan && !selectedAlert ? (
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <ScanListDetail scanId={selectedScan!} onAlertClick={handleAlertClick} />
          </Grid>
        </Grid>
      ) : selectedAlert ? (
        // If an alert is selected, show alert detail
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <AlertDetail alertId={selectedAlert} scanId={selectedScan!} />
          </Grid>
        </Grid>
      ) : (
        // Default view: show scan list
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ScanListTable onScanClick={handleScanClick} />
          </Grid>
        </Grid>
      )}
    </PageContainer>
  );
};

export default WebApplications;
