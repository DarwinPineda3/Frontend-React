import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Table, TableBody, TableCell, TableRow, Stack, Chip, TableContainer, TableHead, InputAdornment, TextField } from "@mui/material";
import DashboardCard from 'src/components/shared/DashboardCard';
import { IconAlertCircle, IconAlertTriangle, IconAlertOctagon, IconCheck, IconSearch } from '@tabler/icons-react';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import { useTranslation } from 'react-i18next';

const CloudScanDetailView = () => {
    const { t } = useTranslation();
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
            checkDescription: "GCP `Firewall Rules` are specific to a `VPC Network`. Each rule either `allows` or `denies` traffic when its conditions are met.",
            extendedStatus: "Firewall default-allow-rdp does expose port 3389 (RDP) to the internet.",
            recommendation: "Ensure that Google Cloud Virtual Private Cloud (VPC) firewall rules do not allow unrestricted access (i.e. 0.0.0.0/0) on TCP port 3389.",
            recommendationUrl: "https://docs.bridgecrew.io/docs/bc_gcp_networking_2#terraform"
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
    const scanName = "Scan Name Example";
    const mockProvider = 'gcp';

    const handleRiskFilter = (riskLevel: string) => {
        setSelectedRiskLevel((prev) => (prev === riskLevel ? null : riskLevel));
    };

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
                        <Chip label={`${t("vulnerabilities.date")}: ${mockDate.toLocaleString()}`} color="primary" variant="outlined" />
                        <Chip label={`${t("vulnerabilities.cloud_id")}: ${mockId}`} color="secondary" variant="outlined" />
                        <Chip label={`${t("vulnerabilities.version")}: ${mockVersion}`} color="warning" variant="outlined" />
                        <Chip label={`${t("vulnerabilities.provider")}: ${mockProvider}`} color="info" variant="outlined" />
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
                                    <Typography color="background.default">{t("vulnerabilities.critical")}</Typography>
                                    <Typography fontWeight={500} color="background.default">
                                        {counts.critical} {t("vulnerabilities.alerts")}
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
                                    <Typography color="background.default">{t("vulnerabilities.high")}</Typography>
                                    <Typography fontWeight={500} color="background.default">
                                        {counts.high} {t("vulnerabilities.alerts")}
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
                                    <Typography color="error.main">{t("vulnerabilities.medium")}</Typography>
                                    <Typography fontWeight={500} color="error.main">
                                        {counts.medium} {t("vulnerabilities.alerts")}
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
                                    <Typography color="warning.main">{t("vulnerabilities.low")}</Typography>
                                    <Typography fontWeight={500} color="warning.main">
                                        {counts.low} {t("vulnerabilities.alerts")}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
    
            {/* Service Summary */}
            <Grid item xs={12} xl={12}>
                <DashboardCard title={t("vulnerabilities.service_summary")}>
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
            </Grid>
    
            {/* Reports Table */}
            <Grid item xs={12} xl={12}>
                <DashboardCard title={t("vulnerabilities.report")}>
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
                </DashboardCard>
            </Grid>
        </Grid>
    );
    
};

export default CloudScanDetailView;
