import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Grid, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NetworkScanTable from 'src/components/vulnerabilities/network/networkScansTable';
import ReportListTable from 'src/components/vulnerabilities/network/reportListTable';
import ReportDetail from 'src/components/vulnerabilities/network/reportDetail';



const NetworkVulnerabilities = () => {
  // Get params from the URL
  const { scanId, alertId } = useParams<{ scanId?: string, alertId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();  // Tracks the current URL location
  
  const [selectedScan, setSelectedScan] = useState<number | null>(null);
  const [selectedReport, setSelectedReport] = useState<string | null>(null); 

  
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
  }, [scanId, alertId, location]);

  // Handle navigating to an alert detail
  const handleReportClick = (reportId: string) => {
    navigate(`/vulnerabilities/network/scans/${selectedScan}/reports/${reportId}`);
  };

  // Handle navigating to a scan detail
  const handleScanClick = (scanId: number) => {
    navigate(`/vulnerabilities/network/scans/${scanId}`);
  };

  // Handle navigating back to the scan list
  const handleBackToScans = () => {
    navigate('/vulnerabilities/network/scans');
  };

  // Handle navigating back to the alert list
  const handleBackToReports = () => {
    navigate(`/vulnerabilities/network/scans/${selectedScan}`);
  };

  return (
    <Box>
      {/* If a scan is selected and no alert is selected, show scan details */}
      {selectedScan && !selectedReport ? (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <IconButton onClick={handleBackToScans} color="primary">
                <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} xl={12}>
            <ReportListTable onAlertClick={handleReportClick}/>
          </Grid>
        </Grid>
      ) : selectedReport ? (
        // If a report is selected, show report detail
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
          <IconButton onClick={handleBackToReports} color="primary">
            <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} xl={12}>
            <ReportDetail reportID={selectedReport} />
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
