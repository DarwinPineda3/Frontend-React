import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import NetworkScanTable from 'src/components/vulnerabilities/network/networkScansTable';
import ReportDetail from 'src/components/vulnerabilities/network/reportDetail';
import ReportListTable from 'src/components/vulnerabilities/network/reportListTable';
import VulnerabilityDetailView from 'src/components/vulnerabilities/network/vulnerabilityDetail';

const NetworkVulnerabilities = () => {
  const { t } = useTranslation();
  const { scanId, alertId, vulnerabilityId } = useParams<{
    scanId?: string;
    alertId?: string;
    vulnerabilityId?: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedScan, setSelectedScan] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedVulnerability, setSelectedVulnerability] = useState<string | null>(null);

  useEffect(() => {
    setSelectedScan(scanId ? String(scanId) : null);
    setSelectedReport(alertId || null);
    setSelectedVulnerability(vulnerabilityId || null);
  }, [scanId, alertId, vulnerabilityId, location]);
  const handleReportClick = (reportId: string) => {
    navigate(`/vulnerabilities/network/scans/${selectedScan}/reports/${reportId}`);
  };

  const handleScanClick = (scanId: string) => {
    navigate(`/vulnerabilities/network/scans/${scanId}`);
  };

  const handleVulnerabilityClick = (vulnerabilityId: string, index: number) => {
    navigate(
      `/vulnerabilities/network/scans/${selectedScan}/reports/${selectedReport}/vulnerabilities/${vulnerabilityId}/${index}`,
    );
  };

  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/vulnerabilities/network/scans">
              {t('vulnerabilities.breadcrumb_vulnerabilidades')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/vulnerabilities/network/scans">
              {t('vulnerabilities.breadcrumb_red')}
            </Link>
            {selectedScan && (
              <Link
                component={RouterLink}
                color="inherit"
                to={`/vulnerabilities/network/scans/${selectedScan}`}
              >
                {t('vulnerabilities.breadcrumb_escaneos')}
              </Link>
            )}
            {selectedReport && (
              <Link
                component={RouterLink}
                color="inherit"
                to={`/vulnerabilities/network/scans/${selectedScan}/reports/${selectedReport}`}
              >
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
      </Box>

      {selectedVulnerability ? (
        <Grid container spacing={0}>
          <Grid item xs={12} xl={12}>
            <VulnerabilityDetailView scanID={selectedScan!} reportID={selectedReport!} />
          </Grid>
        </Grid>
      ) : selectedScan && selectedReport ? (
        <Grid container spacing={0}>
          <Grid item xs={12} xl={12}>
            <ReportDetail
              scanID={selectedScan}
              reportID={selectedReport}
              onClickVulnerability={handleVulnerabilityClick}
            />
          </Grid>
        </Grid>
      ) : selectedScan ? (
        <Grid container spacing={0}>
          <Grid item xs={12} xl={12}>
            <ReportListTable scanId={selectedScan} onAlertClick={handleReportClick} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} xl={12}>
            <NetworkScanTable onScanClick={handleScanClick} />
          </Grid>
        </Grid>
      )}
    </PageContainer>
  );
};

export default NetworkVulnerabilities;
