import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, Grid, IconButton, Breadcrumbs, Link, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScanListTable from "src/components/vulnerabilities/web/applications/webScansTable"; // New Detail Component
import AlertDetail from 'src/components/vulnerabilities/web/applications/alertDetail';
import ScanListDetail from 'src/components/vulnerabilities/web/applications/scanDetail';

const WebApplications = () => {
  // Get params from the URL
  const { scanId, alertId } = useParams<{ scanId?: string, alertId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();  // Tracks the current URL location
  
  const [selectedScan, setSelectedScan] = useState<number | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null); 

  // Synchronize state with URL parameters
  useEffect(() => {
    if (scanId) {
      setSelectedScan(Number(scanId));
    } else {
      setSelectedScan(null);
    }

    if (alertId) {
      setSelectedAlert(Number(alertId));
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
    <Box>
      <Box display="flex" alignItems="center" mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} color="inherit" to="/vulnerabilities/web">
            Vulnerabilidades
          </Link>
          <Link component={RouterLink} color="inherit" to="/vulnerabilities/web/applications">
            Aplicaciones Web
          </Link>
          {selectedScan && (
            <Link component={RouterLink} color="inherit" to={`/vulnerabilities/web/applications/${selectedScan}`}>
              Escaneos de aplicaciones web
            </Link>
          )}
          {selectedAlert && (
            <Typography color="textPrimary">
              Alerta
            </Typography>
          )}
        </Breadcrumbs>
      </Box>

      {/* If a scan is selected and no alert is selected, show scan details */}
      {selectedScan && !selectedAlert ? (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <ScanListDetail scanId={selectedScan!} onAlertClick={handleAlertClick} />
          </Grid>
        </Grid>
      ) : selectedAlert ? (
        // If an alert is selected, show alert detail
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <AlertDetail alertId={selectedAlert} />
          </Grid>
        </Grid>
      ) : (
        // Default view: show scan list
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} xl={12}>
            <ScanListTable onScanClick={handleScanClick} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default WebApplications;
