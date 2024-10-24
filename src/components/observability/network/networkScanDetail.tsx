import { Box, Chip, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
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
        // Router connections
        { id: 'r1', source: '1', target: '2', type: 'CONNECTS_TO' }, // Router to Laptop 1
        { id: 'r2', source: '1', target: '3', type: 'CONNECTS_TO' }, // Router to Laptop 2
        { id: 'r3', source: '1', target: '4', type: 'CONNECTS_TO' }, // Router to Desktop
        { id: 'r4', source: '1', target: '8', type: 'CONNECTS_TO' }, // Router to Smart Camera
        { id: 'r5', source: '1', target: '9', type: 'CONNECTS_TO' }, // Router to Smart Thermostat

        // Device communication
        { id: 'r6', source: '2', target: '5', type: 'USES' }, // Laptop 1 to Internal File Server
        { id: 'r7', source: '4', target: '5', type: 'USES' }, // Desktop to Internal File Server
        { id: 'r8', source: '3', target: '6', type: 'USES' }, // Laptop 2 to External Web Service 1
        { id: 'r9', source: '4', target: '7', type: 'USES' }, // Desktop to External Web Service 2

        // IoT device communication
        { id: 'r10', source: '8', target: '6', type: 'USES' }, // Smart Camera to External Web Service 1
        { id: 'r11', source: '9', target: '6', type: 'USES' }, // Smart Thermostat to External Web Service 1
    ]
};


const NetworkScanDetail: React.FC<{ scanId: string }> = ({ scanId }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <NetworkScanCards />
            </Grid>
            <Grid item xs={12}>
                <Breadcrumb title="Detalles del escaneo">
                    <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                        <Chip label={`Settings: ports_tcp`} color="primary" variant="outlined" />
                        <Chip label={`Type: 2`} color="secondary" variant="outlined" />
                        <Chip label={`Objective: 107.173.154.73`} color="info" variant="outlined" />
                    </Box>
                </Breadcrumb>
            </Grid>
            <Grid item xs={12}>
                <DashboardCard title="Ports">
                    <PortTable />
                </DashboardCard>
            </Grid>
            <Grid item xs={12}>
                <DashboardCard title="Network Graph">
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={8}>
                            <NetworkGraph data={mockNeo4jGraph} />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Box sx={{ maxHeight: 600, overflowY: 'auto' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>IP</TableCell>
                                            <TableCell>Name</TableCell>
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
