import {
  Box,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { IconEye } from '@tabler/icons-react';
import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchNetworkScanReportDetail } from 'src/store/vulnerabilities/network/NetworkScansSlice';
import { NetworkScanReportDetail } from 'src/types/vulnerabilities/network/networkScansType';
import { getSeverityColor } from 'src/utils/severityUtils';
import ReportTopCards from './reportTopCards';

interface ReportDetailProps {
  reportID: string;
  scanID: string;
  onClickVulnerability: (vulnerabilityId: string, index: number) => void;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ reportID, scanID, onClickVulnerability }) => {
  const networkScanReportDetail: NetworkScanReportDetail = useSelector(
    (state: any) => state.networkScanReducer.networkScanReportDetail,
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [pageScans, setPageScans] = useState(0);
  const [rowsPerPageScans, setRowsPerPageScans] = useState(25);

  const [pageHosts, setPageHosts] = useState(0);
  const [rowsPerPageHosts, setRowsPerPageHosts] = useState(25);

  const [pagePorts, setPagePorts] = useState(0);
  const [rowsPerPagePorts, setRowsPerPagePorts] = useState(25);

  const [pageVulnerabilities, setPageVulnerabilities] = useState(0);
  const [rowsPerPageVulnerabilities, setRowsPerPageVulnerabilities] = useState(25);
  let counters = {
    vulnerabilities_counter: 0,
    hosts_counter: 0,
    os_scan_counter: 0,
    scanned_ports_counter: 0,
  };
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchNetworkScanReportDetail(scanID, reportID));
      setIsLoading(false);
    };
    fetchData();
  }, [scanID, reportID, dispatch]);

  if (!isLoading && networkScanReportDetail && networkScanReportDetail.report) {
    counters = {
      vulnerabilities_counter: networkScanReportDetail.report.statistics.count_vulnerabilities,
      hosts_counter: parseInt(networkScanReportDetail.report.report.hosts.count),
      os_scan_counter: networkScanReportDetail.report.report.os.count,
      scanned_ports_counter: networkScanReportDetail.report.report.ports.length,
    };
  }

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const secondary = theme.palette.secondary.main;
  const secondarylight = theme.palette.secondary.light;
  const warning = theme.palette.warning.main;

  //level colors
  const low = theme.palette.level.low;
  const medium = theme.palette.level.medium;
  const high = theme.palette.level.high;
  const none = theme.palette.level.none;
  const { t } = useTranslation();

  const labels = networkScanReportDetail?.report_detail_chart_data?.labels || [];
  const values = networkScanReportDetail?.report_detail_chart_data?.values || [];
  const optionspiechart: ApexOptions = {
    chart: {
      id: 'pie-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true, // Enable data labels to show values by default
      formatter: function (val: any, opts: any) {
        return `${val.toFixed(1)}%`; // Format the values to show percentages
      },
      dropShadow: {
        enabled: false, // You can enable drop shadows if you like
      },
      style: {
        fontSize: '14px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        colors: ['#fff'],
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '40px',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a: number, b: number) => {
                  return a + b;
                }, 0);
              },
            },
          },
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
    },
    colors: [primary, primarylight, secondary, secondarylight, warning],
    tooltip: {
      fillSeriesColor: false,
    },
    labels: labels, // Dynamically use labels from state
  };
  const seriesdoughnutchart = values;

  const handleClickOpen = (vulnerabilityId: string, index: number) => {
    onClickVulnerability(vulnerabilityId, index);
  };

  const handleChangePageHosts = (event: unknown, newPage: number) => {
    setPageHosts(newPage);
  };

  const handleChangeRowsPerPageHosts = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPageHosts(parseInt(event.target.value, 10));
    setPageHosts(0);
  };

  const handleChangePagePorts = (event: unknown, newPage: number) => {
    setPagePorts(newPage);
  };

  const handleChangeRowsPerPagePorts = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPagePorts(parseInt(event.target.value, 10));
    setPagePorts(0);
  };

  const handleChangePageScans = (event: unknown, newPage: number) => {
    setPagePorts(newPage);
  };

  const handleChangeRowsPerPageScans = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPagePorts(parseInt(event.target.value, 10));
    setPagePorts(0);
  };

  const handleChangePageVulns = (event: unknown, newPage: number) => {
    setPageVulnerabilities(newPage);
  };

  const handleChangeRowsPerPageVulns = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPageVulnerabilities(parseInt(event.target.value, 10));
    setPageVulnerabilities(0);
  };

  const displayHostList = networkScanReportDetail?.report?.report?.host_list?.slice(
    pageHosts * rowsPerPageHosts,
    pageHosts * rowsPerPageHosts + rowsPerPageHosts,
  );

  const flattenedHostList = networkScanReportDetail.list_os.flatMap((result) =>
    result.result.host.details
      .filter((detail) => detail.name === 'OS' && !detail.value.includes('cpe'))
      .map((detail) => ({
        value: detail.value,
        sourceDescription: detail.source.description,
      })),
  );

  const displayScansList = flattenedHostList.slice(
    pageScans * rowsPerPageScans,
    pageScans * rowsPerPageScans + rowsPerPageScans,
  );

  const displayPorts = networkScanReportDetail?.report?.report?.ports?.slice(
    pagePorts * rowsPerPagePorts,
    pagePorts * rowsPerPagePorts + rowsPerPagePorts,
  );

  const displayVulns = networkScanReportDetail.report.report.results.slice(
    pageVulnerabilities * rowsPerPageVulnerabilities,
    pageVulnerabilities * rowsPerPageVulnerabilities + rowsPerPageVulnerabilities,
  );

  return (
    <>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <Loader />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ReportTopCards counters={counters} />
            </Grid>
            <Grid item xs={12} xl={6}>
              <DashboardCard title={t('vulnerabilities.scan_results')!}>
                <Chart
                  options={optionspiechart}
                  series={seriesdoughnutchart}
                  type="donut"
                  height="300px"
                />
              </DashboardCard>
            </Grid>

            <Grid item xs={12} xl={6}>
              <DashboardCard title={t('vulnerabilities.technical_summary_details')!}>
                <Box p={2}>
                  <Typography variant="body2" fontWeight={600}>
                    {t('vulnerabilities.scan_name')!}
                  </Typography>
                  <Typography variant="body2" mb={2}>
                    {networkScanReportDetail.report.task.name}
                  </Typography>

                  <Typography variant="body2" fontWeight={600}>
                    {t('vulnerabilities.scan_id')!}
                  </Typography>
                  <Typography variant="body2" mb={2}>
                    {networkScanReportDetail.report.task.id}
                  </Typography>

                  <Typography variant="body2" fontWeight={600}>
                    {t('vulnerabilities.scan_start')!}
                  </Typography>
                  <Typography variant="body2" mb={2}>
                    <HumanizedDate dateString={networkScanReportDetail.report.report.scan_start} />
                  </Typography>

                  <Typography variant="body2" fontWeight={600}>
                    {t('vulnerabilities.scan_end')!}
                  </Typography>
                  <Typography variant="body2" mb={2}>
                    {networkScanReportDetail.report.report.scan_end === null ? (
                      'NA'
                    ) : (
                      <HumanizedDate dateString={networkScanReportDetail.report.report.scan_end} />
                    )}
                  </Typography>

                  <Typography variant="body2" fontWeight={600}>
                    {t('vulnerabilities.comment')!}
                  </Typography>
                  <Typography variant="body2">
                    {networkScanReportDetail.report.comment === null
                      ? 'NA'
                      : networkScanReportDetail.report.comment}
                  </Typography>
                </Box>
              </DashboardCard>
            </Grid>

            {/* Hosts Section */}
            <Grid item xs={12} xl={6}>
              <DashboardCard title={t('vulnerabilities.hosts')!}>
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>{t('vulnerabilities.ip')!}</TableCell>
                          <TableCell>{t('vulnerabilities.id')!}</TableCell>
                          <TableCell>{t('vulnerabilities.start_date')!}</TableCell>
                          <TableCell>{t('vulnerabilities.end_date')!}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {displayHostList.length > 0 ? (
                          displayHostList.map((host, key) => (
                            <TableRow key={key}>
                              <TableCell>{host.ip}</TableCell>
                              <TableCell>{host.asset.asset_id}</TableCell>
                              <TableCell>
                                {host.start === null ? (
                                  'NA'
                                ) : (
                                  <HumanizedDate dateString={host.start} />
                                )}
                              </TableCell>
                              <TableCell>
                                {host.end === null ? 'NA' : <HumanizedDate dateString={host.end} />}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                              {t('vulnerabilities.no_data_available')!}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={displayHostList.length}
                    rowsPerPage={rowsPerPageHosts}
                    page={pageHosts}
                    onPageChange={handleChangePageHosts}
                    onRowsPerPageChange={handleChangeRowsPerPageHosts}
                  />
                </>
              </DashboardCard>
            </Grid>

            {/* Escaneos Section */}
            <Grid item xs={12} xl={6}>
              <DashboardCard title={t('vulnerabilities.scans')!}>
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ textAlign: 'center', width: '250px' }}>
                            {t('vulnerabilities.host_name')!}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {t('vulnerabilities.source_description')!}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {displayScansList.length > 0 ? (
                          displayScansList.map((detail, index) => (
                            <TableRow key={index}>
                              <TableCell
                                className="text-break centered"
                                sx={{ textAlign: 'center', width: '250px' }}
                              >
                                {detail.value}
                              </TableCell>
                              <TableCell className="centered" sx={{ textAlign: 'center' }}>
                                {detail.sourceDescription}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                              {t('vulnerabilities.no_data_available')!}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={displayScansList.length}
                    rowsPerPage={rowsPerPageScans}
                    page={pageScans}
                    onPageChange={handleChangePageScans}
                    onRowsPerPageChange={handleChangeRowsPerPageScans}
                  />
                </>
              </DashboardCard>
            </Grid>

            {/* Puertos Section */}
            <Grid item xs={12}>
              <DashboardCard title={t('vulnerabilities.ports')!}>
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>{t('vulnerabilities.port')!}</TableCell>
                          <TableCell>{t('vulnerabilities.host')!}</TableCell>
                          <TableCell>{t('vulnerabilities.type')!}</TableCell>
                          <TableCell>{t('vulnerabilities.severity')!}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {displayPorts.length > 0 ? (
                          displayPorts.map((portInfo, portIndex) => (
                            <TableRow key={portIndex}>
                              <TableCell>{portInfo?.port?.port}</TableCell>
                              <TableCell>{portInfo?.port?.host}</TableCell>
                              <TableCell>
                                <Chip
                                  label={portInfo?.port?.threat}
                                  sx={
                                    portInfo?.port?.threat === 'Info'
                                      ? { backgroundColor: none, color: 'white' }
                                      : portInfo?.port?.threat === 'Low'
                                      ? { backgroundColor: low, color: 'white' }
                                      : portInfo?.port?.threat === 'Medium'
                                      ? { backgroundColor: medium, color: 'white' }
                                      : portInfo?.port?.threat === 'High'
                                      ? { backgroundColor: high, color: 'white' }
                                      : { backgroundColor: none, color: 'white' }
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={portInfo.port.severity}
                                  sx={{
                                    backgroundColor: getSeverityColor(portInfo.port.severity, theme)
                                      .color,
                                    color: 'white',
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                              {t('vulnerabilities.no_data_available')!}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={displayScansList.length}
                    rowsPerPage={rowsPerPagePorts}
                    page={pagePorts}
                    onPageChange={handleChangePagePorts}
                    onRowsPerPageChange={handleChangeRowsPerPagePorts}
                  />
                </>
              </DashboardCard>
            </Grid>

            {/* Vulnerabilities Section */}
            <Grid item xs={12}>
              <DashboardCard title={t('vulnerabilities.vulnerabilities')!}>
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>{t('vulnerabilities.name')!}</TableCell>
                          <TableCell>{t('vulnerabilities.host')!}</TableCell>
                          <TableCell>{t('vulnerabilities.port')!}</TableCell>
                          <TableCell>{t('vulnerabilities.type')!}</TableCell>
                          <TableCell>{t('vulnerabilities.severity')!}</TableCell>
                          <TableCell>{t('vulnerabilities.report_date')!}</TableCell>
                          <TableCell>{t('vulnerabilities.details')!}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {displayVulns.length > 0 ? (
                          displayVulns.map((vulnerability, key) => (
                            <TableRow key={key}>
                              <TableCell>{vulnerability.result.name}</TableCell>
                              <TableCell>{vulnerability.result.host.host}</TableCell>
                              <TableCell>{vulnerability.result.port}</TableCell>
                              <TableCell>
                                <Chip
                                  label={vulnerability.result.threat}
                                  sx={
                                    vulnerability.result.threat === 'INFO'
                                      ? { backgroundColor: none, color: 'white' }
                                      : vulnerability.result.threat === 'LOW'
                                      ? { backgroundColor: low, color: 'white' }
                                      : vulnerability.result.threat === 'MEDIUM'
                                      ? { backgroundColor: medium, color: 'white' }
                                      : vulnerability.result.threat === 'HIGH'
                                      ? { backgroundColor: high, color: 'white' }
                                      : { backgroundColor: none, color: 'white' }
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={vulnerability.result.severity}
                                  sx={{
                                    backgroundColor: getSeverityColor(
                                      vulnerability.result.severity,
                                      theme,
                                    ).color,
                                    color: 'white',
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <HumanizedDate dateString={vulnerability.result.report_date} />{' '}
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={t('vulnerabilities.view')!}
                                  color="primary"
                                  icon={<IconEye />}
                                  onClick={() => handleClickOpen(vulnerability.result.id, key)}
                                  style={{ cursor: 'pointer' }}
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                              {t('vulnerabilities.no_data_available')!}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={displayVulns.length}
                    rowsPerPage={rowsPerPageVulnerabilities}
                    page={pageVulnerabilities}
                    onPageChange={handleChangePageVulns}
                    onRowsPerPageChange={handleChangeRowsPerPageVulns}
                  />
                </>
              </DashboardCard>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ReportDetail;
