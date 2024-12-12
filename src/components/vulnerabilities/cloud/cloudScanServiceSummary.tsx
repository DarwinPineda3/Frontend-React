import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const CloudScanSummaryService: React.FC<{ services: any }> = ({ services }) => {
  const { t } = useTranslation();

  let servicesArray: any[] = []
  if (services) {
    servicesArray = Object.entries(services).map(([key, value]) => ({
      name: key,
      ...value,
    }));

  }

  console.log(servicesArray);
  const theme = useTheme();
  const { critical, high, medium, low, unknown } = theme.palette.level;


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
            {servicesArray.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell style={{ color: row.passed == row.total ? low : high }}>
                  <Chip
                    label={
                      row.passed == row.total
                        ? `Pass: ${row.passed}`
                        : `Failed: ${row.failed}`
                    }
                    color="secondary"
                    size="small"
                    style={{
                      backgroundColor:
                        row.passed == row.total ? low : high,
                      color: 'white',
                    }}
                  />
                </TableCell>
                <TableCell style={{ color: row.critical > 0 && critical || '' }}>
                  {row.critical}
                </TableCell>
                <TableCell style={{ color: row.high > 0 && high || '' }}>
                  {row.high}
                </TableCell>
                <TableCell style={{ color: row.medium > 0 && medium || '' }}>
                  {row.medium}
                </TableCell>
                <TableCell style={{ color: row.low > 0 && low || '' }}>
                  {row.low}
                </TableCell>
                <TableCell>
                  {row.muted}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );

};

export default CloudScanSummaryService;
