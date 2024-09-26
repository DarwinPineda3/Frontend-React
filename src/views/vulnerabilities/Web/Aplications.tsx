import React, { useState } from 'react';
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import ScanListTable from "src/components/vulnerabilities/web/applications/webScansTable"; // New Detail Component
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ScanTopCards from 'src/components/vulnerabilities/web/applications/scantopCards';
import ScanAlertTable from 'src/components/vulnerabilities/web/applications/scanAlertTable';
import AlertDetail from 'src/components/vulnerabilities/web/applications/alertDetail';
import ScanListDetail from 'src/components/vulnerabilities/web/applications/scanDetail';

const WebApplications = () => {
  // State to toggle between the table and the detail view
  const [selectedScan, setSelectedScan] = useState<number | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null); 


  const mockScans = [
    { id: 1, name: 'Scan 1' },
    { id: 2, name: 'Scan 2' },
    { id: 3, name: 'Scan 3' },
  ];

  const mockAlerts = [
    { id: 1, name: 'Absence of Anti-CSRF Tokens', riskLevel: 'Medium (Low)', instances: 5, riskColor: 'orange' },
    { id: 2, name: 'Content Security Policy (CSP) Header Not Set', riskLevel: 'Medium (High)', instances: 81, riskColor: 'orange' },
    { id: 3, name: 'Missing Anti-clickjacking Header', riskLevel: 'Medium (Medium)', instances: 65, riskColor: 'orange' },
    { id: 4, name: 'Application Error Disclosure', riskLevel: 'Low (Medium)', instances: 5, riskColor: 'yellow' },
  ];

  // Handle navigating to an alert detail
  const handleAlertClick = (alertId: number) => {
    setSelectedAlert(alertId);
  };

  // Handle navigating to a scan detail
  const handleScanClick = (scanId: number) => {
    setSelectedScan(scanId);
  };

  // Handle navigating back to the scan list
  const handleBackToScans = () => {
    setSelectedScan(null);
    setSelectedAlert(null);  // Reset alert as well if viewing a scan
  };

  // Handle navigating back to the alert list
  const handleBackToAlerts = () => {
    setSelectedAlert(null);
  };

  return (
    <Box>
      {/* If a scan is selected and no alert is selected, show scan details */}
      {selectedScan && !selectedAlert ? (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <IconButton onClick={handleBackToScans} color="primary">
                <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} xl={12}>
            <ScanListDetail scanId={selectedScan!} onAlertClick={handleAlertClick} />
          </Grid>
        </Grid>
      ) : selectedAlert ? (
        // If an alert is selected, show alert detail
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
          <IconButton onClick={handleBackToAlerts} color="primary">
            <ArrowBackIcon />
            </IconButton>
          </Grid>
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
