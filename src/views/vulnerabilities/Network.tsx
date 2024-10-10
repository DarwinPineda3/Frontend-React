import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, Grid, IconButton, Typography, Breadcrumbs, Link } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NetworkScanTable from 'src/components/vulnerabilities/network/networkScansTable';
import ReportListTable from 'src/components/vulnerabilities/network/reportListTable';
import ReportDetail from 'src/components/vulnerabilities/network/reportDetail';
import VulnerabilityDetailView from 'src/components/vulnerabilities/network/vulnerabilityDetail';


const NetworkVulnerabilities = () => {
  // Get params from the URL
  const { scanId, alertId, vulnerabilityId } = useParams<{ scanId?: string, alertId?: string, vulnerabilityId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();  // Tracks the current URL location
  
  const [selectedScan, setSelectedScan] = useState<number | null>(null);
  const [selectedReport, setSelectedReport] = useState<string | null>(null); 
  const [selectedVulnerability, setSelectedVulnerability] = useState<string | null>(null);

  
  // Synchronize state with URL parameters
  useEffect(() => {
    if (scanId) {
      setSelectedScan(Number(scanId));
    } else {
      setSelectedScan(null);
    }

    if (alertId) {
      setSelectedReport(alertId);
    } else {
      setSelectedReport(null);
    }

    if (vulnerabilityId) {
      setSelectedVulnerability(vulnerabilityId);
    } else {
      setSelectedVulnerability(null);
    }
  }, [scanId, alertId, vulnerabilityId, location]);

  // Handle navigating to an alert detail
  const handleReportClick = (reportId: string) => {
    navigate(`/vulnerabilities/network/scans/${selectedScan}/reports/${reportId}`);
  };

  // Handle navigating to a scan detail
  const handleScanClick = (scanId: number) => {
    navigate(`/vulnerabilities/network/scans/${scanId}`);
  };

  // Handle navigating to a vulnerability detail
  const handleVulnerabilityClick = (vulnerabilityId: string) => {
    navigate(`/vulnerabilities/network/scans/${selectedScan}/reports/${selectedReport}/vulnerabilities/${vulnerabilityId}`);
  };

  // Handle navigating back to the scan list
  const handleBackToScans = () => {
    navigate('/vulnerabilities/network/scans');
  };

  // Handle navigating back to the report list
  const handleBackToReports = () => {
    navigate(`/vulnerabilities/network/scans/${selectedScan}`);
  };

  // Handle navigating back to report from vulnerability detail
  const handleBackToVulnerabilities = () => {
    navigate(`/vulnerabilities/network/scans/${selectedScan}/reports/${selectedReport}`);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} color="inherit" to="/vulnerabilities/network">
            Vulnerabilidades
          </Link>
          <Link component={RouterLink} color="inherit" to="/vulnerabilities/network">
            Red
          </Link>
          {selectedScan && (
            <Link component={RouterLink} color="inherit" to={`/vulnerabilities/network/scans/${selectedScan}`}>
              Escaneos vulnerabilidades Red
            </Link>
          )}
          {selectedReport && (
            <Link component={RouterLink} color="inherit" to={`/vulnerabilities/network/scans/${selectedScan}/reports/${selectedReport}`}>
              Reportes de escaneo
            </Link>
          )}
          {selectedVulnerability && (
            <Typography color="textPrimary">
              Vulnerabilidad
            </Typography>
          )}
        </Breadcrumbs>
      </Box>

      {/* If a vulnerability is selected, show the vulnerability detail */}
      {selectedVulnerability ? (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <VulnerabilityDetailView />
          </Grid>
        </Grid>
      ) : selectedScan && selectedReport ? (
        // If a report is selected, show report detail
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <ReportDetail reportID={selectedReport} onClickVulnerability={handleVulnerabilityClick}/>
          </Grid>
        </Grid>
      ) : selectedScan ? (
        // If a scan is selected and no alert is selected, show scan details
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <ReportListTable onAlertClick={handleReportClick} />
          </Grid>
        </Grid>
      ) : (
        // Default view: show scan list
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} xl={12}>
            <NetworkScanTable onScanClick={handleScanClick} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default NetworkVulnerabilities;
