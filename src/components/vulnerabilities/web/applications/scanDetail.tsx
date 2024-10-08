import React from 'react';
import { Grid, Box, Chip } from '@mui/material';
import ScanAlertTable from './scanAlertTable';
import DashboardCard from 'src/components/shared/DashboardCard';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';

const ScanListDetail: React.FC<{ scanId: number, onAlertClick: (alertId: number) => void; }> = ({ scanId, onAlertClick }) => {

  
  const mockAlerts = [
    { id: 1, name: 'Absence of Anti-CSRF Tokens', riskLevel: 'Medium (Low)', instances: 5, riskColor: 'secondary' },
    { id: 2, name: 'Content Security Policy (CSP) Header Not Set', riskLevel: 'Medium (High)', instances: 81, riskColor: 'primary' },
    { id: 3, name: 'Missing Anti-clickjacking Header', riskLevel: 'Medium (Medium)', instances: 65, riskColor: 'primary' },
    { id: 4, name: 'Application Error Disclosure', riskLevel: 'Low (Medium)', instances: 5, riskColor: 'error' },
    { id: 5, name: 'Cookie No HttpOnly Flag', riskLevel: 'Low (Medium)', instances: 5, riskColor: 'warning' },
  ];

  const mockDate = new Date('2024-09-23T10:20:30Z');
  const mockVersion = '1.0.0';
  const mockSitesUrl = 'https://example.com';
  const mockFalsePositive = 1;
  const scanName = "Scan Name Example"


  return (
    <Grid container >
      {/* Scan Metadata Section */}
      <Grid item xs={12} xl={12}>
        <Breadcrumb title={scanName}>
            <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
              <Chip label={`Date: ${mockDate.toLocaleString()}`} color="primary" variant="outlined" />
              <Chip label={`Version: ${mockVersion}`} color="secondary" variant="outlined"/>
              <Chip label={`Site URL: ${mockSitesUrl}`} color="info" variant="outlined"/>
              <Chip label={`False Positives: ${mockFalsePositive}`} color="warning" variant="outlined" />
          </Box>
        </Breadcrumb>
    </Grid>
      {/* Alerts Table Section */}
      <Grid item xs={12} xl={12}>
      <DashboardCard>
            <ScanAlertTable alerts={mockAlerts} onAlertClick={onAlertClick} />
      </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default ScanListDetail;
