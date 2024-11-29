import React from 'react';
import { Grid, Box, Chip } from '@mui/material';
import ScanAlertTable from './scanAlertTable';
import DashboardCard from 'src/components/shared/DashboardCard';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import { useTranslation } from 'react-i18next';

const ScanListDetail: React.FC<{ scanId: number, onAlertClick: (alertId: number) => void; }> = ({ scanId, onAlertClick }) => {
  const { t } = useTranslation();

  const mockAlerts = [
    { id: 1, name: t('vulnerabilities.absence_of_anti_csrf_tokens'), riskLevel: t('vulnerabilities.medium_low'), instances: 5, riskColor: 'secondary' },
    { id: 2, name: t('vulnerabilities.csp_header_not_set'), riskLevel: t('vulnerabilities.medium_high'), instances: 81, riskColor: 'primary' },
    { id: 3, name: t('vulnerabilities.missing_anti_clickjacking_header'), riskLevel: t('vulnerabilities.medium_medium'), instances: 65, riskColor: 'primary' },
    { id: 4, name: t('vulnerabilities.application_error_disclosure'), riskLevel: t('vulnerabilities.low_medium'), instances: 5, riskColor: 'error' },
    { id: 5, name: t('vulnerabilities.cookie_no_httponly_flag'), riskLevel: t('vulnerabilities.low_medium'), instances: 5, riskColor: 'warning' },
  ];

  const mockDate = new Date('2024-09-23T10:20:30Z');
  const mockVersion = '1.0.0';
  const mockSitesUrl = 'https://example.com';
  const mockFalsePositive = 1;
  const scanName = t('vulnerabilities.scan_name_example');

  return (
    <Grid container>
      {/* Scan Metadata Section */}
      <Grid item xs={12} xl={12}>
        <Breadcrumb title={scanName}>
          <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
            <Chip label={`${t('vulnerabilities.date')}: ${mockDate.toLocaleString()}`} color="primary" variant="outlined" />
            <Chip label={`${t('vulnerabilities.version')}: ${mockVersion}`} color="secondary" variant="outlined"/>
            <Chip label={`${t('vulnerabilities.site_url')}: ${mockSitesUrl}`} color="info" variant="outlined"/>
            <Chip label={`${t('vulnerabilities.false_positives')}: ${mockFalsePositive}`} color="warning" variant="outlined" />
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
