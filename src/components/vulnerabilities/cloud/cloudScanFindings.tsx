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


  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
  };

  const theme = useTheme();
  const { critical, high, medium, low } = theme.palette.level;

  const filteredFindings = findings?.filter((row: any) => {
    const matchesSearch =
      row.finding_info?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.resources[0]?.group?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity = selectedRiskLevel
      ? row.severity.toLowerCase() === selectedRiskLevel.toLowerCase()
      : true;

    return matchesSearch && matchesSeverity;
  });

  const totalPages = Math.ceil(filteredFindings?.length / rowsPerPage);
  const currentData = filteredFindings?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (

    <DashboardCard title={t("vulnerabilities.report")!}>
      <>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6} xl={6}>
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
          </Grid>

          <Grid item xs={6} xl={6}>
            <TextField
              select
              label={t("vulnerabilities.severity") || ''}
              value={selectedRiskLevel || ''}
              onChange={(e) => setSelectedRiskLevel(e.target.value || null)}
              fullWidth
              SelectProps={{
                native: true,
              }}
            >
              <option disabled value=""></option>
              <option value="">{t("vulnerabilities.cloud_scans.all_severities")}</option>
              <option value="Critical">{t("vulnerabilities.cloud_scans.critical")}</option>
              <option value="High">{t("vulnerabilities.cloud_scans.high")}</option>
              <option value="Medium">{t("vulnerabilities.cloud_scans.medium")}</option>
              <option value="Low">{t("vulnerabilities.cloud_scans.low")}</option>
            </TextField>
          </Grid>
        </Grid>
        {filteredFindings?.length > 0 ? (
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
                            row.severity === "Critical" ?
                              critical : row.severity === "High" ?
                                high : row.severity === "Medium" ?
                                  medium : low,
                          color: 'white',
                        }}
                      />
                    </TableCell>
                    <TableCell >{row.resources[0].group.name}</TableCell>
                    <TableCell>{row.cloud.region}</TableCell>
                    <TableCell sx={{ width: "10%", wordBreak: "break-all" }}>{row.finding_info.title}</TableCell>
                    <TableCell sx={{ width: "10%", wordBreak: "break-all" }}>{row.resources[0].name}</TableCell>
                    <TableCell sx={{ width: "10%", wordBreak: "break-all" }}>{row.finding_info.desc}</TableCell>
                    <TableCell sx={{ width: "10%", wordBreak: "break-all" }}>{row.finding_info.uid}</TableCell>
                    <TableCell sx={{ width: "20%", wordBreak: "break-all" }}>{row.remediation.desc}</TableCell>
                    <TableCell sx={{ width: "10%", wordBreak: "break-all" }}>
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
