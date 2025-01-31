import { Chip, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, useTheme } from "@mui/material";
import { useState } from "react";
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

  const theme = useTheme();
  const { critical, high, medium, low } = theme.palette.level;

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const paginatedItems = (servicesArray || []).slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <DashboardCard title={t("vulnerabilities.service_summary")!}>
      <>
        {servicesArray?.length > 0 ? (
          <TableContainer>
            <Table aria-label="service table">
              <TableHead>
                <TableRow>
                  <TableCell>{t("vulnerabilities.service")}</TableCell>
                  <TableCell>{t("vulnerabilities.status")}</TableCell>
                  <TableCell>{t("vulnerabilities.critical")}</TableCell>
                  <TableCell>{t("vulnerabilities.high")}</TableCell>
                  <TableCell>{t("vulnerabilities.medium")}</TableCell>
                  <TableCell>{t("vulnerabilities.low")}</TableCell>
                  <TableCell>{t("vulnerabilities.silenced")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
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
                            row.passed == row.total ? low : critical,
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={(servicesArray || []).length}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">{t('vulnerabilities.no_data_available')}</Typography>
            </Grid>
          </Grid>
        )
        }
      </>
    </DashboardCard>
  );

};

export default CloudScanSummaryService;
