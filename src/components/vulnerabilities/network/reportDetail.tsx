import React, { useState } from 'react';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme, Box, Chip, Button, Dialog, Toolbar, Slide, AppBar, IconButton } from "@mui/material";
import Chart, { Props } from 'react-apexcharts';
import DashboardCard from 'src/components/shared/DashboardCard';
import ReportTopCards from './reportTopCards';
import { ApexOptions } from 'apexcharts';
import { TransitionProps } from '@mui/material/transitions';
import { IconEye, IconX } from '@tabler/icons-react';

interface ReportDetailProps {
    reportID: number;
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
    { name: 'TCP Timestamps Information Disclosure', host: '172.67.210.197', port: 'general/tcp', type: 'Low', severity: 2.6, date: '29 de agosto de 2024 a las 13:27' },
    { name: 'TCP Timestamps Information Disclosure', host: '104.21.37.171', port: 'general/tcp', type: 'Low', severity: 2.6, date: '29 de agosto de 2024 a las 13:27' },
    { name: 'WordPress Plugins Detection (HTTP)', host: '172.67.210.197', port: '443/tcp', type: 'Informational', severity: 0.0, date: '29 de agosto de 2024 a las 13:30' },
    { name: 'WordPress Plugins Detection (HTTP)', host: '104.21.37.171', port: '443/tcp', type: 'Informational', severity: 0.0, date: '29 de agosto de 2024 a las 13:30' },
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
const ReportDetail: React.FC<ReportDetailProps> = ({ reportID }) => {

    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primarylight = theme.palette.primary.light;
    const secondary = theme.palette.secondary.main;
    const secondarylight = theme.palette.secondary.light;
    const warning = theme.palette.warning.main;
  
  
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
          enabled: false,
        },
        plotOptions: {
          pie: {
            donut: {
              size: '70px',
            },
          },
        },
        legend: {
          show: true,
          position: 'bottom',
          //width: '50px',
        },
        colors: [primary, primarylight, secondary, secondarylight, warning],
        tooltip: {
          fillSeriesColor: false,
        },
        labels: ['Critical', 'High', 'Medium', 'Low'],  // Dynamically use labels from state
      };
    const seriesdoughnutchart = [45, 15, 27, 18, 35];

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
        <Grid container spacing={3} >
            <Grid item xs={12}>
                <ReportTopCards/>
            </Grid>
            <Grid item xs={12} xl={6}>
                <DashboardCard title='Resultados de vulnerabilidades'>
                <Chart
                    options={optionspiechart}
                    series={seriesdoughnutchart}
                    type="donut"
                    height="300px"
                />
                </DashboardCard>
            </Grid>

            <Grid item xs={12} xl={6}>
            <DashboardCard title="Detalles técnicos del resumen">
                <Box p={2}>
                <Typography variant="body2" fontWeight={600}>Nombre del escaneo</Typography>
                <Typography variant="body2" mb={2}>Escaneo Octapus</Typography>

                <Typography variant="body2" fontWeight={600}>Id del escaneo</Typography>
                <Typography variant="body2" mb={2}>063268c2-6662-43ba-a3f9-3690f612da4f</Typography>

                <Typography variant="body2" fontWeight={600}>Inicio del escaneo</Typography>
                <Typography variant="body2" mb={2}>29 de agosto de 2024 a las 10:40</Typography>

                <Typography variant="body2" fontWeight={600}>Fin del escaneo</Typography>
                <Typography variant="body2" mb={2}>29 de agosto de 2024 a las 20:14</Typography>

                <Typography variant="body2" fontWeight={600}>Comentario</Typography>
                <Typography variant="body2">NA</Typography>
                </Box>
            </DashboardCard>
            </Grid>

            {/* Hosts Section */}
            <Grid item xs={12} xl={6}>
                <DashboardCard title="Hosts">
                    <TableContainer >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ip</TableCell>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Fecha de inicio</TableCell>
                                    <TableCell>Fecha de fin</TableCell>
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
                <DashboardCard title="Escaneos">
                    <TableContainer >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre de Host</TableCell>
                                    <TableCell>Nombre SO encontrado</TableCell>
                                    <TableCell>Descripción de fuente</TableCell>
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
                <DashboardCard title="Puertos">
                    <TableContainer >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Puerto</TableCell>
                                    <TableCell>Host</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Severidad</TableCell>
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
                                            >
                                            </Chip>
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
                <DashboardCard title="Vulnerabilidades">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Host</TableCell>
                                    <TableCell>Puerto</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Severidad</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Detalles</TableCell>
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
                                                label="Ver"
                                                color="primary"
                                                icon={<IconEye></IconEye>}
                                                onClick={handleClickOpen}
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
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <IconX width={24} height={24} />
            </IconButton>
            <Typography ml={2} flex={1} variant="h6" component="div">
              Vulnerability Details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        
        {/* Vulnerability Details */}
        <Box p={3}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            LOW (CVSS: 2.6) - TCP Timestamps Information Disclosure
          </Typography>

          {/* Table structure for the details */}
          <Table>
            <TableBody>
              <TableRow>
                <TableCell><strong>Resultado de la detección del producto:</strong></TableCell>
                <TableCell>cpe:/a:hubspot:hubspot:11.1.21 OID: 1.3.6.1.4.1.25623.1.0.113634</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Resumen:</strong></TableCell>
                <TableCell>NA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Calidad de detección:</strong></TableCell>
                <TableCell>80</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Resultado de la detección de vulnerabilidades:</strong></TableCell>
                <TableCell>
                  It was detected that the host implements RFC1323/RFC7323.
                  <br />
                  Packet 1: 159460737
                  <br />
                  Packet 2: 4281332233
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Solución:</strong></TableCell>
                <TableCell>Type:</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Software/SO afectado:</strong></TableCell>
                <TableCell>NA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Información sobre vulnerabilidades:</strong></TableCell>
                <TableCell>
                  The remote host implements TCP timestamps and therefore allows to compute the uptime.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Método de detección de vulnerabilidades:</strong></TableCell>
                <TableCell>NA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Referencias:</strong></TableCell>
                <TableCell>
                  <a href="https://datatracker.ietf.org/doc/html/rfc1323">RFC 1323</a><br />
                  <a href="https://datatracker.ietf.org/doc/html/rfc7323">RFC 7323</a><br />
                  <a href="https://web.archive.org/web/20151213072445/http://www.microsoft.com/en-us/download/details.aspx?id=9152">Microsoft Details</a><br />
                  <a href="https://www.fortiguard.com/psirt/FG-IR-16-090">Fortiguard</a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Action Buttons */}
          <Box mt={2}>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>
              Translate to Spanish
            </Button>
            <Button variant="contained" color="error">
              Manage vulnerability
            </Button>
          </Box>
        </Box>
      </Dialog>
        </>
    );
};

export default ReportDetail;
