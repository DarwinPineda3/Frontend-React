import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const CloudScanSummaryService = () => {
  const { t } = useTranslation();

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

  return (
    <DashboardCard title={t("vulnerabilities.service_summary")!}>
      <TableContainer>
        <Table aria-label="service table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>{t("vulnerabilities.service")}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>{t("vulnerabilities.status")}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>{t("vulnerabilities.critical")}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>{t("vulnerabilities.high")}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>{t("vulnerabilities.medium")}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>{t("vulnerabilities.low")}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>{t("vulnerabilities.silenced")}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sumaryData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.service}</TableCell>
                <TableCell style={{ color: 'red' }}>{row.status}</TableCell>
                <TableCell>{row.critical}</TableCell>
                <TableCell>{row.high}</TableCell>
                <TableCell>{row.medium}</TableCell>
                <TableCell>{row.low}</TableCell>
                <TableCell>{row.silenced}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );

};

export default CloudScanSummaryService;
