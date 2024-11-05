import React, { useState } from 'react';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme, Box, Chip, Button, Dialog, Toolbar, Slide, AppBar, IconButton } from "@mui/material";
import Chart, { Props } from 'react-apexcharts';
import DashboardCard from 'src/components/shared/DashboardCard';
import ReportTopCards from './reportTopCards';
import { ApexOptions } from 'apexcharts';
import { TransitionProps } from '@mui/material/transitions';
import { IconEye, IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface ReportDetailProps {
    reportID: string;
    onClickVulnerability: (vulnerabilityId: string) => void;
}

const mockData = {
  hosts: [
    { ip: '104.21.37.171', id: 'e36c9607-b0c4-43c6-b356-8eb588901f03', startDate: '29 de agosto de 2024 a las 10:40', endDate: '29 de agosto de 2024 a las 20:14' },
    { ip: '172.67.210.197', id: 'f344035e-5793-4d2b-a25d-7d9cd495bec9', startDate: '29 de agosto de 2024 a las 10:40', endDate: '29 de agosto de 2024 a las 20:14' },
  ],
  escaneos: [
    { host: '104.21.37.171', os: 'Linux Kernel', source: 'Operating System (OS) Detection (ICMP)' },
    { host: '172.67.210.197', os: 'Linux Kernel', source: 'Operating System (OS) Detection (ICMP)' },
  ],
  puertos: [
    { port: 'general/tcp', host: '104.21.37.171', type: 'Low', severity: 2.6 },
    { port: 'general/tcp', host: '172.67.210.197', type: 'Low', severity: 2.6 },
    { port: '2052/tcp', host: '104.21.37.171', type: 'Info', severity: 0.0 },
  ],
  vulnerabilities: [
    { id:'1', name: 'TCP Timestamps Information Disclosure', host: '172.67.210.197', port: 'general/tcp', type: 'Low', severity: 2.6, date: '29 de agosto de 2024 a las 13:27' },
    { id:'2', name: 'TCP Timestamps Information Disclosure', host: '104.21.37.171', port: 'general/tcp', type: 'Low', severity: 2.6, date: '29 de agosto de 2024 a las 13:27' },
    { id:'3', name: 'WordPress Plugins Detection (HTTP)', host: '172.67.210.197', port: '443/tcp', type: 'Informational', severity: 0.0, date: '29 de agosto de 2024 a las 13:30' },
    { id:'4', name: 'WordPress Plugins Detection (HTTP)', host: '104.21.37.171', port: '443/tcp', type: 'Informational', severity: 0.0, date: '29 de agosto de 2024 a las 13:30' },
  ],
};

  // chart color

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const ReportDetail: React.FC<ReportDetailProps> = ({ reportID, onClickVulnerability }) => {

    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primarylight = theme.palette.primary.light;
    const secondary = theme.palette.secondary.main;
    const secondarylight = theme.palette.secondary.light;
    const warning = theme.palette.warning.main;
  
    const {t} = useTranslation();
  
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
        enabled: true,  // Enable data labels to show values by default
        formatter: function (val: any, opts: any) {
          return `${val.toFixed(1)}%`;  // Format the values to show percentages
        },
        dropShadow: {
          enabled: false,  // You can enable drop shadows if you like
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
      labels: ['Critical', 'High', 'Medium', 'Low'],  // Dynamically use labels from state
    };    
    const seriesdoughnutchart = [45, 15, 27, 18];


    const handleClickOpen = (vulnerabilityId:string) => {
      onClickVulnerability(vulnerabilityId);
    };
    return (
      <>
      <Grid container spacing={3}>
          <Grid item xs={12}>
              <ReportTopCards />
          </Grid>
          <Grid item xs={12} xl={6}>
              <DashboardCard title={t("vulnerabilities.scan_results")!}>
                  <Chart
                      options={optionspiechart}
                      series={seriesdoughnutchart}
                      type="donut"
                      height="300px"
                  />
              </DashboardCard>
          </Grid>

          <Grid item xs={12} xl={6}>
              <DashboardCard title={t("vulnerabilities.technical_summary_details")!}>
                  <Box p={2}>
                      <Typography variant="body2" fontWeight={600}>{t("vulnerabilities.scan_name")!}</Typography>
                      <Typography variant="body2" mb={2}>Escaneo Octapus</Typography>

                      <Typography variant="body2" fontWeight={600}>{t("vulnerabilities.scan_id")!}</Typography>
                      <Typography variant="body2" mb={2}>063268c2-6662-43ba-a3f9-3690f612da4f</Typography>

                      <Typography variant="body2" fontWeight={600}>{t("vulnerabilities.scan_start")!}</Typography>
                      <Typography variant="body2" mb={2}>29 de agosto de 2024 a las 10:40</Typography>

                      <Typography variant="body2" fontWeight={600}>{t("vulnerabilities.scan_end")!}</Typography>
                      <Typography variant="body2" mb={2}>29 de agosto de 2024 a las 20:14</Typography>

                      <Typography variant="body2" fontWeight={600}>{t("vulnerabilities.comment")!}</Typography>
                      <Typography variant="body2">NA</Typography>
                  </Box>
              </DashboardCard>
          </Grid>

          {/* Hosts Section */}
          <Grid item xs={12} xl={6}>
              <DashboardCard title={t("vulnerabilities.hosts")!}>
                  <TableContainer>
                      <Table>
                          <TableHead>
                              <TableRow>
                                  <TableCell>{t("vulnerabilities.ip")!}</TableCell>
                                  <TableCell>{t("vulnerabilities.id")!}</TableCell>
                                  <TableCell>{t("vulnerabilities.start_date")!}</TableCell>
                                  <TableCell>{t("vulnerabilities.end_date")!}</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {mockData.hosts.map((host) => (
                                  <TableRow key={host.id}>
                                      <TableCell>{host.ip}</TableCell>
                                      <TableCell>{host.id}</TableCell>
                                      <TableCell>{host.startDate}</TableCell>
                                      <TableCell>{host.endDate}</TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
              </DashboardCard>
          </Grid>

          {/* Escaneos Section */}
          <Grid item xs={12} xl={6}>
              <DashboardCard title={t("vulnerabilities.scans")!}>
                  <TableContainer>
                      <Table>
                          <TableHead>
                              <TableRow>
                                  <TableCell>{t("vulnerabilities.host_name")!}</TableCell>
                                  <TableCell>{t("vulnerabilities.os_name")!}</TableCell>
                                  <TableCell>{t("vulnerabilities.source_description")!}</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {mockData.escaneos.map((escaneo) => (
                                  <TableRow key={escaneo.host}>
                                      <TableCell>{escaneo.host}</TableCell>
                                      <TableCell>{escaneo.os}</TableCell>
                                      <TableCell>{escaneo.source}</TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
              </DashboardCard>
          </Grid>

          {/* Puertos Section */}
          <Grid item xs={12}>
              <DashboardCard title={t("vulnerabilities.ports")!}>
                  <TableContainer>
                      <Table>
                          <TableHead>
                              <TableRow>
                                  <TableCell>{t("vulnerabilities.port")!}</TableCell>
                                  <TableCell>{t("vulnerabilities.host")!}</TableCell>
                                  <TableCell>{t("vulnerabilities.type")!}</TableCell>
                                  <TableCell>{t("vulnerabilities.severity")!}</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {mockData.puertos.map((puerto) => (
                                  <TableRow key={puerto.port}>
                                      <TableCell>{puerto.port}</TableCell>
                                      <TableCell>{puerto.host}</TableCell>
                                      <TableCell>
                                          <Chip 
                                              label={puerto.type}
                                              color={
                                                  puerto.type === 'Info'
                                                      ? 'info'
                                                      : puerto.type === 'Low'
                                                      ? 'warning'
                                                      : puerto.type === 'Medium'
                                                      ? 'secondary'
                                                      : puerto.type === 'High'
                                                      ? 'primary'
                                                      : 'info'
                                              }
                                          />
                                      </TableCell>
                                      <TableCell>{puerto.severity}</TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
              </DashboardCard>
          </Grid>

          {/* Vulnerabilities Section */}
          <Grid item xs={12}>
              <DashboardCard title={t("vulnerabilities.vulnerabilities")!}>
                  <TableContainer>
                      <Table>
                          <TableHead>
                              <TableRow>
                                  <TableCell>{t("vulnerabilities.name")!}</TableCell>
                                  <TableCell>{t("vulnerabilities.host")!}</TableCell>
                                  <TableCell>{t("vulnerabilities.port")!}</TableCell>
                                  <TableCell>{t("vulnerabilities.type")!}</TableCell>
                                  <TableCell>{t("vulnerabilities.severity")!}</TableCell>
                                  <TableCell>{t("vulnerabilities.report_date")!}</TableCell>
                                  <TableCell>{t("vulnerabilities.details")!}</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {mockData.vulnerabilities.map((vulnerability) => (
                                  <TableRow key={vulnerability.name + vulnerability.host}>
                                      <TableCell>{vulnerability.name}</TableCell>
                                      <TableCell>{vulnerability.host}</TableCell>
                                      <TableCell>{vulnerability.port}</TableCell>
                                      <TableCell>
                                          <Chip
                                              label={vulnerability.type}
                                              color={
                                                  vulnerability.type === 'Info'
                                                      ? 'info'
                                                      : vulnerability.type === 'Low'
                                                      ? 'warning'
                                                      : vulnerability.type === 'Medium'
                                                      ? 'secondary'
                                                      : vulnerability.type === 'High'
                                                      ? 'primary'
                                                      : 'info'
                                              }
                                          />
                                      </TableCell>
                                      <TableCell>{vulnerability.severity}</TableCell>
                                      <TableCell>{vulnerability.date}</TableCell>
                                      <TableCell>
                                          <Chip
                                              label={t("vulnerabilities.view")!}
                                              color="primary"
                                              icon={<IconEye />}
                                              onClick={() => handleClickOpen(vulnerability.id)}
                                              style={{ cursor: 'pointer' }}
                                          />
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
              </DashboardCard>
          </Grid>
      </Grid>
      </>
  );
};

export default ReportDetail;
