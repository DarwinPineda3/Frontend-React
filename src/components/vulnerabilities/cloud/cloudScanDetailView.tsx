import { Box, Chip, Grid } from "@mui/material";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import CloudScanFindings from './cloudScanFindings';
import CloudScanSummaryService from './cloudScanServiceSummary';
import CloudScanTopCards from './cloudScanTopCards';

const CloudScanDetailView = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string | null>(null);

  const sumaryData = [
    {
      service: "networking",
      status: "FAIL (2)",
      critical: 2,
      high: 0,
      medium: 0,
      low: 0,
      silenced: 0
    },
    {
      service: "compute",
      status: "FAIL (43)",
      critical: 0,
      high: 1,
      medium: 41,
      low: 1,
      silenced: 0
    },
    {
      service: "Google Container Registry (GCR)",
      status: "FAIL (1)",
      critical: 0,
      high: 0,
      medium: 1,
      low: 0,
      silenced: 0
    },
    {
      service: "iam",
      status: "FAIL (8)",
      critical: 0,
      high: 3,
      medium: 3,
      low: 2,
      silenced: 0
    },
    {
      service: "logging",
      status: "FAIL (10)",
      critical: 0,
      high: 0,
      medium: 10,
      low: 0,
      silenced: 0
    }
  ];

  const ReportData = [
    {
      status: "FAIL",
      severity: "Critical",
      serviceName: "networking",
      region: "global",
      checkTitle: "Ensure That RDP Access Is Restricted From the Internet",
      id: "default-allow-rdp",
      checkDescription: "GCP `Firewall Rules` are specific to a `VPC Network`. Each rule either `allows` or `denies` traffic when its conditions are met.",
      extendedStatus: "Firewall default-allow-rdp does expose port 3389 (RDP) to the internet.",
      recommendation: "Ensure that Google Cloud Virtual Private Cloud (VPC) firewall rules do not allow unrestricted access (i.e. 0.0.0.0/0) on TCP port 3389.",
      recommendationUrl: "https://docs.bridgecrew.io/docs/bc_gcp_networking_2#terraform"
    }
  ];

  const counts = {
    critical: sumaryData.filter((item) => item.critical > 0).length,
    high: sumaryData.filter((item) => item.high > 0).length,
    medium: sumaryData.filter((item) => item.medium > 0).length,
    low: sumaryData.filter((item) => item.low > 0).length,
  };

  const mockDate = new Date('2024-09-23T10:20:30Z');
  const mockId = '104892762537578212777';
  const mockVersion = 1;
  const scanName = "Scan Name Example";
  const mockProvider = 'gcp';

  const handleRiskFilter = (riskLevel: string) => {
    setSelectedRiskLevel((prev) => (prev === riskLevel ? null : riskLevel));
  };

  const filteredReports = ReportData.filter((report) => {
    const matchesSearch = report.checkTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRiskLevel = selectedRiskLevel
      ? report.severity.toLowerCase() === selectedRiskLevel.toLowerCase()
      : true;
    return matchesSearch && matchesRiskLevel;
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} xl={12}>
        <Breadcrumb title={scanName}>
          <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
            <Chip label={`${t("vulnerabilities.date")}: ${mockDate.toLocaleString()}`} color="primary" variant="outlined" />
            <Chip label={`${t("vulnerabilities.cloud_id")}: ${mockId}`} color="secondary" variant="outlined" />
            <Chip label={`${t("vulnerabilities.version")}: ${mockVersion}`} color="warning" variant="outlined" />
            <Chip label={`${t("vulnerabilities.provider")}: ${mockProvider}`} color="info" variant="outlined" />
          </Box>
        </Breadcrumb>
      </Grid>

      {/* Top Cards */}
      <Grid item xs={12} xl={12}>
        <CloudScanTopCards />
      </Grid>

      {/* Service Summary */}
      <Grid item xs={12} xl={12}>
        <CloudScanSummaryService />
      </Grid>

      {/* Reports Table */}
      <Grid item xs={12} xl={12}>
        <CloudScanFindings />
      </Grid>
    </Grid>
  );

};

export default CloudScanDetailView;
