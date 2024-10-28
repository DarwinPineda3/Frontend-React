import { Box, Chip, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import PortTable from "./portTable";
import DashboardCard from "src/components/shared/DashboardCard";
import Breadcrumb from "src/components/shared/breadcrumb/Breadcrumb";
import NetworkScanCards from "./networkScanCards";
import NetworkGraph from "./networkGraph";

const mockNeo4jGraph = {
    nodes: [
        { id: '1', label: 'Router', properties: { ip: '192.168.0.1', name: 'Main Router' } },
        { id: '2', label: 'Device', properties: { ip: '192.168.0.101', name: 'Laptop 1' } },
        { id: '3', label: 'Device', properties: { ip: '192.168.0.102', name: 'Laptop 2' } },
        { id: '4', label: 'Device', properties: { ip: '192.168.0.103', name: 'Desktop' } },
        { id: '5', label: 'Service', properties: { name: 'Internal File Server' } },
        { id: '6', label: 'Service', properties: { name: 'External Web Service 1' } },
        { id: '7', label: 'Service', properties: { name: 'External Web Service 2' } },
        { id: '8', label: 'IoT Device', properties: { ip: '192.168.0.150', name: 'Smart Camera' } },
        { id: '9', label: 'IoT Device', properties: { ip: '192.168.0.151', name: 'Smart Thermostat' } }
    ],
    relationships: [
        { id: 'r1', source: '1', target: '2', type: 'CONNECTS_TO' },
        { id: 'r2', source: '1', target: '3', type: 'CONNECTS_TO' },
        { id: 'r3', source: '1', target: '4', type: 'CONNECTS_TO' },
        { id: 'r4', source: '1', target: '8', type: 'CONNECTS_TO' },
        { id: 'r5', source: '1', target: '9', type: 'CONNECTS_TO' },
        { id: 'r6', source: '2', target: '5', type: 'USES' },
        { id: 'r7', source: '4', target: '5', type: 'USES' },
        { id: 'r8', source: '3', target: '6', type: 'USES' },
        { id: 'r9', source: '4', target: '7', type: 'USES' },
        { id: 'r10', source: '8', target: '6', type: 'USES' },
        { id: 'r11', source: '9', target: '6', type: 'USES' }
    ]
};

const NetworkScanDetail: React.FC<{ scanId: string }> = ({ scanId }) => {
    const { t } = useTranslation();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <NetworkScanCards />
            </Grid>
            <Grid item xs={12}>
                <Breadcrumb title={t('observability.scan_details')}>
                    <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                        <Chip label={`${t('observability.settings')}: ports_tcp`} color="primary" variant="outlined" />
                        <Chip label={`${t('observability.type')}: 2`} color="secondary" variant="outlined" />
                        <Chip label={`${t('observability.objective')}: 107.173.154.73`} color="info" variant="outlined" />
                    </Box>
                </Breadcrumb>
            </Grid>
            <Grid item xs={12}>
                <DashboardCard title={t('observability.ports')!}>
                    <PortTable />
                </DashboardCard>
            </Grid>
            <Grid item xs={12}>
                <DashboardCard title={t('observability.network_graph')!}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={8}>
                            <NetworkGraph data={mockNeo4jGraph} />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Box sx={{ maxHeight: 600, overflowY: 'auto' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>{t('observability.ip')}</TableCell>
                                            <TableCell>{t('observability.name')}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {mockNeo4jGraph.nodes.map((node) => (
                                            <TableRow key={node.id}>
                                                <TableCell>{node.properties.ip || 'N/A'}</TableCell>
                                                <TableCell>{node.properties.name || 'N/A'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Grid>
                    </Grid>
                </DashboardCard>
            </Grid>
        </Grid>
    );
};

export default NetworkScanDetail;
