import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, Grid, IconButton, Typography, Breadcrumbs, Link } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NetworkScanTable from 'src/components/vulnerabilities/network/networkScansTable';
import ReportListTable from 'src/components/vulnerabilities/network/reportListTable';
import ReportDetail from 'src/components/vulnerabilities/network/reportDetail';
import VulnerabilityDetailView from 'src/components/vulnerabilities/network/vulnerabilityDetail';
import { useTranslation } from 'react-i18next';

const NetworkVulnerabilities = () => {
  const { t } = useTranslation();
  const { scanId, alertId, vulnerabilityId } = useParams<{ scanId?: string, alertId?: string, vulnerabilityId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedScan, setSelectedScan] = useState<number | null>(null);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedVulnerability, setSelectedVulnerability] = useState<string | null>(null);

  useEffect(() => {
    setSelectedScan(scanId ? Number(scanId) : null);
    setSelectedReport(alertId || null);
    setSelectedVulnerability(vulnerabilityId || null);
  }, [scanId, alertId, vulnerabilityId, location]);

  const handleReportClick = (reportId: string) => {
    navigate(`/vulnerabilities/network/scans/${selectedScan}/reports/${reportId}`);
  };

  const handleScanClick = (scanId: number) => {
    navigate(`/vulnerabilities/network/scans/${scanId}`);
  };

  const handleVulnerabilityClick = (vulnerabilityId: string) => {
    navigate(`/vulnerabilities/network/scans/${selectedScan}/reports/${selectedReport}/vulnerabilities/${vulnerabilityId}`);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} color="inherit" to="/vulnerabilities/network">
            {t('vulnerabilities.breadcrumb_vulnerabilidades')}
          </Link>
          <Link component={RouterLink} color="inherit" to="/vulnerabilities/network">
            {t('vulnerabilities.breadcrumb_red')}
          </Link>
          {selectedScan && (
            <Link component={RouterLink} color="inherit" to={`/vulnerabilities/network/scans/${selectedScan}`}>
              {t('vulnerabilities.breadcrumb_escaneos')}
            </Link>
          )}
          {selectedReport && (
            <Link component={RouterLink} color="inherit" to={`/vulnerabilities/network/scans/${selectedScan}/reports/${selectedReport}`}>
              {t('vulnerabilities.breadcrumb_reportes')}
            </Link>
          )}
          {selectedVulnerability && (
            <Typography color="textPrimary">
              {t('vulnerabilities.breadcrumb_vulnerabilidad')}
            </Typography>
          )}
        </Breadcrumbs>
      </Box>

      {selectedVulnerability ? (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <VulnerabilityDetailView />
          </Grid>
        </Grid>
      ) : selectedScan && selectedReport ? (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <ReportDetail reportID={selectedReport} onClickVulnerability={handleVulnerabilityClick}/>
          </Grid>
        </Grid>
      ) : selectedScan ? (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <ReportListTable onAlertClick={handleReportClick} />
          </Grid>
        </Grid>
      ) : (
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
