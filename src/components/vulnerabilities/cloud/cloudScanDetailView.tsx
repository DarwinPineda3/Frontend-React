import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Table, TableBody, TableCell, TableRow, Button, Stack, Chip, Paper, TableContainer, TableHead, InputAdornment, TextField } from "@mui/material";
import DashboardCard from 'src/components/shared/DashboardCard';
import { IconAlertCircle, IconAlertTriangle, IconAlertOctagon, IconCheck, IconSearch } from '@tabler/icons-react';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';


const CloudScanDetailView = () => {

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
            checkDescription: "GCP `Firewall Rules` are specific to a `VPC Network`. Each rule either `allows` or `denies` traffic when its conditions are met. Its conditions allow users to specify the type of traffic, such as ports and protocols, and the source or destination of the traffic.",
            extendedStatus: "Firewall default-allow-rdp does expose port 3389 (RDP) to the internet.",
            recommendation: "Ensure that Google Cloud Virtual Private Cloud (VPC) firewall rules do not allow unrestricted access (i.e. 0.0.0.0/0) on TCP port 3389.",
            recommendationUrl: "https://docs.bridgecrew.io/docs/bc_gcp_networking_2#terraform"
        },
        {
            status: "FAIL",
            severity: "Critical",
            serviceName: "networking",
            region: "global",
            checkTitle: "Ensure That SSH Access Is Restricted From the Internet",
            id: "default-allow-ssh",
            checkDescription: "GCP `Firewall Rules` are specific to a `VPC Network`. Each rule either `allows` or `denies` traffic when its conditions are met.",
            extendedStatus: "Firewall default-allow-ssh does expose port 22 (SSH) to the internet.",
            recommendation: "Check your Google Cloud Virtual Private Cloud (VPC) firewall rules for inbound rules that allow unrestricted access (i.e. 0.0.0.0/0) on TCP port 22.",
            recommendationUrl: "https://docs.bridgecrew.io/docs/bc_gcp_networking_1#terraform"
        },
        {
            status: "FAIL",
            severity: "High",
            serviceName: "compute",
            region: "global",
            checkTitle: "Ensure that the default network does not exist",
            id: "default",
            checkDescription: "Ensure that the default network does not exist.",
            extendedStatus: "Default network is in use in project totemic-ground-385019.",
            recommendation: "When an organization deletes the default network, it may need to migrate or service onto a new network.",
            recommendationUrl: "https://docs.bridgecrew.io/docs/bc_gcp_networking_7#terraform"
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
    const scanName = "Scan Name Example"
    const mockProvider = 'gcp';

    // Filter based on selected risk level
    const handleRiskFilter = (riskLevel: string) => {
        setSelectedRiskLevel((prev) => (prev === riskLevel ? null : riskLevel));
    };

    // Filter reports based on search term and selected risk level
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
                        <Chip label={`Date: ${mockDate.toLocaleString()}`} color="primary" variant="outlined" />
                        <Chip label={`CloudId: ${mockId}`} color="secondary" variant="outlined" />
                        <Chip label={`Version: ${mockVersion}`} color="warning" variant="outlined" />
                        <Chip label={`Provider: ${mockProvider}`} color="info" variant="outlined" />
                    </Box>
                </Breadcrumb>
            </Grid>

            {/* Top Cards */}
            <Grid item xs={12} xl={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Box bgcolor="primary.light" p={3} onClick={() => handleRiskFilter('Critical')} sx={{ cursor: 'pointer' }}>
                            <Stack direction="row" gap={2} alignItems="center">
                                <Box width={38} height={38} bgcolor="primary.main" display="flex" alignItems="center" justifyContent="center">
                                    <Typography color="primary.contrastText">
                                        <IconAlertCircle width={22} />
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography color="background.default">Critical</Typography>
                                    <Typography fontWeight={500} color="background.default">
                                        {counts.critical} Alerts
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Box bgcolor="secondary.light" p={3} onClick={() => handleRiskFilter('High')} sx={{ cursor: 'pointer' }}>
                            <Stack direction="row" gap={2} alignItems="center">
                                <Box width={38} height={38} bgcolor="secondary.main" display="flex" alignItems="center" justifyContent="center">
                                    <Typography color="background.default">
                                        <IconAlertTriangle width={22} />
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography color="background.default">High</Typography>
                                    <Typography fontWeight={500} color="background.default">
                                        {counts.high} Alerts
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Box bgcolor="error.light" p={3} onClick={() => handleRiskFilter('Medium')} sx={{ cursor: 'pointer' }}>
                            <Stack direction="row" gap={2} alignItems="center">
                                <Box width={38} height={38} bgcolor="error.main" display="flex" alignItems="center" justifyContent="center">
                                    <Typography color="primary.contrastText">
                                        <IconAlertOctagon width={22} />
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography color="error.main">Medium</Typography>
                                    <Typography fontWeight={500} color="error.main">
                                        {counts.medium} Alerts
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Box bgcolor="warning.light" p={3} onClick={() => handleRiskFilter('Low')} sx={{ cursor: 'pointer' }}>
                            <Stack direction="row" gap={2} alignItems="center">
                                <Box width={38} height={38} bgcolor="warning.main" display="flex" alignItems="center" justifyContent="center">
                                    <Typography color="primary.contrastText">
                                        <IconCheck width={22} />
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography color="warning.main">Low</Typography>
                                    <Typography fontWeight={500} color="warning.main">
                                        {counts.low} Alerts
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>


            {/* Service Summary */}
            <Grid item xs={12} xl={12}>
                <DashboardCard title="Service Summary">
                    <>

                        <TableContainer >
                            <Table aria-label="service table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Servicio
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Estado
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Crítica
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Alta
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Media
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Baja
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Silenciado
                                            </Typography>
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
                    </>
                </DashboardCard>
            </Grid>

            {/* Reports Table */}
            <Grid item xs={12} xl={12}>
                <DashboardCard title="Report">
                    <>
                        <Box mb={3} my={3}>
                            <TextField
                                placeholder="Search Reports"
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
                        <TableContainer >
                            <Table aria-label="compliance table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Estado</TableCell>
                                        <TableCell>Severidad</TableCell>
                                        <TableCell>Nombre del Servicio</TableCell>
                                        <TableCell>Región</TableCell>
                                        <TableCell>Verificar título</TableCell>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Verificar descripción</TableCell>
                                        <TableCell>Estado extendido</TableCell>
                                        <TableCell>Recomendación</TableCell>
                                        <TableCell>URL de recomendación</TableCell>
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
            </Grid>
        </Grid>
    );
};

export default CloudScanDetailView;
