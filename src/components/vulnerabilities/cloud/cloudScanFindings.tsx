import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { Box, Chip, Grid, InputAdornment, Link, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from "@mui/material";
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const CloudScanFindings: React.FC<{ findings: any }> = ({ findings }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string | null>(null);

  // console.log(findings);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;

  const totalPages = Math.ceil(findings?.length / rowsPerPage);

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
  };

  const currentData = findings?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const theme = useTheme();
  const { critical, high, medium, low } = theme.palette.level;

  // const filteredReports = findingsArray.filter((report) => {
  //   const matchesSearch = report.checkTitle.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesRiskLevel = selectedRiskLevel
  //     ? report.severity.toLowerCase() === selectedRiskLevel.toLowerCase()
  //     : true;
  //   return matchesSearch && matchesRiskLevel;
  // });

  return (

    <DashboardCard title={t("vulnerabilities.report")!}>
      <>
        <Box mb={3} my={3}>
          <TextField
            placeholder={t("vulnerabilities.search_reports") || ''}
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
        {findings?.length > 0 ? (
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
                {currentData?.map((row: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{row.status}</TableCell>
                    <TableCell style={{ color: row.severity === "Critical" ? critical : row.severity === "Medium" ? high : low }}>
                      <Chip
                        label={
                          row.severity
                        }
                        color="secondary"
                        size="small"
                        style={{
                          backgroundColor:
                            row.severity === "Critical" ? critical : row.severity === "High" ? high : row.severity === "Medium" ? medium : low,
                          color: 'white',
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.resources[0].group.name}</TableCell>
                    <TableCell>{row.cloud.region}</TableCell>
                    <TableCell>{row.finding_info.title}</TableCell>
                    <TableCell>{row.resources[0].name}</TableCell>
                    <TableCell>{row.finding_info.desc}</TableCell>
                    <TableCell>{row.finding_info.uid}</TableCell>
                    <TableCell>{row.remediation.desc}</TableCell>
                    <TableCell>
                      {/* <a href={row.remediation.references[0]} target="_blank" rel="noopener noreferrer">
                      {row.remediation.references[0]}
                    </a> */}

                      {row.remediation.references?.map((ref: any, index: any) =>
                        ref.startsWith('https://') ? (
                          <Link key={index} href={ref} target="_blank" rel="noopener">
                            <InsertLinkIcon />
                          </Link>
                        ) : null
                      )}

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">{t('vulnerabilities.no_data_available')}</Typography>
            </Grid>
          </Grid>
        )
        }
        <Box my={3} display="flex" justifyContent="center">
          {totalPages > 0 && (
            <Pagination
              count={totalPages}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          )}
        </Box>

      </>
    </DashboardCard>
  );

};

export default CloudScanFindings;
