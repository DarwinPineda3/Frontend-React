import { Box, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const CloudScanFindings = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string | null>(null);

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
    },
    {
      status: "FAIL",
      severity: "Critical",
      serviceName: "azul",
      region: "global",
      checkTitle: "azul",
      id: "default-allow-rdp",
      checkDescription: "GCP `Firewall Rules` are specific azul millonarios to a `VPC Network`. Each rule either `allows` or `denies` traffic when its conditions are met.",
      extendedStatus: "Firewall default-allow-rdp does expose port 3389 (RDP) to the internet.",
      recommendation: "Ensure that Google Cloud Virtual Private Cloud (VPC) firewall rules do not allow unrestricted access (i.e. 0.0.0.0/0) on TCP port 3389.",
      recommendationUrl: "https://docs.bridgecrew.io/docs/bc_gcp_networking_2#terraform"
    },
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



  const filteredReports = ReportData.filter((report) => {
    const matchesSearch = report.checkTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRiskLevel = selectedRiskLevel
      ? report.severity.toLowerCase() === selectedRiskLevel.toLowerCase()
      : true;
    return matchesSearch && matchesRiskLevel;
  });

  return (

    <DashboardCard title={t("vulnerabilities.report")!}>
      <>
        <Box mb={3} my={3}>
          <TextField
            placeholder={t("vulnerabilities.search_reports")}
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconSearch size={18} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <TableContainer>
          <Table aria-label="compliance table">
            <TableHead>
              <TableRow>
                <TableCell>{t("vulnerabilities.state")}</TableCell>
                <TableCell>{t("vulnerabilities.severity")}</TableCell>
                <TableCell>{t("vulnerabilities.service_name")}</TableCell>
                <TableCell>{t("vulnerabilities.region")}</TableCell>
                <TableCell>{t("vulnerabilities.check_title")}</TableCell>
                <TableCell>{t("vulnerabilities.id")}</TableCell>
                <TableCell>{t("vulnerabilities.check_description")}</TableCell>
                <TableCell>{t("vulnerabilities.extended_status")}</TableCell>
                <TableCell>{t("vulnerabilities.recommendation")}</TableCell>
                <TableCell>{t("vulnerabilities.recommendation_url")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.status}</TableCell>
                  <TableCell style={{ color: row.severity === "Critical" ? "red" : "orange" }}>
                    {row.severity}
                  </TableCell>
                  <TableCell>{row.serviceName}</TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>{row.checkTitle}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.checkDescription}</TableCell>
                  <TableCell>{row.extendedStatus}</TableCell>
                  <TableCell>{row.recommendation}</TableCell>
                  <TableCell>
                    <a href={row.recommendationUrl} target="_blank" rel="noopener noreferrer">
                      {row.recommendationUrl}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </DashboardCard>
  );

};

export default CloudScanFindings;
