// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  LinearProgress,
  Chip,
  TableContainer,
} from '@mui/material';
import DashboardCard from '../shared/DashboardCard';

const hostData = [
  {
    id: 1,
    hostName: 'OCTAPUS-JUAN',
    cpuUsage: 0,
    ramUsage: 70,
    storageUsage: 36,
    firewallStatus: 'Active',
    lastUpdate: '4 hours ago',
  },
];

const HostResourceTable = () => {
  return (
    <DashboardCard title="Host Resource Monitoring" subtitle="System Resource Usage">
      <TableContainer>
        <Table aria-label="host resource table" sx={{ whiteSpace: 'nowrap' }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  #
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Nombre de Host
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  CPU
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  RAM
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Storage
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Firewall
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Última Actualización
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hostData.map((host) => (
              <TableRow key={host.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {host.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="primary"
                    variant="subtitle2"
                    fontWeight={600}
                    component="a"
                    href="#"
                  >
                    {host.hostName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={host.cpuUsage}
                    sx={{
                      width: '80%',
                      height: 10,
                      borderRadius: 5,
                      bgcolor: '#e0e0e0',
                    }}
                  />
                  <Typography variant="subtitle2">{host.cpuUsage}%</Typography>
                </TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={host.ramUsage}
                    color="warning"
                    sx={{
                      width: '80%',
                      height: 10,
                      borderRadius: 5,
                      bgcolor: '#e0e0e0',
                    }}
                  />
                  <Typography variant="subtitle2">{host.ramUsage}%</Typography>
                </TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={host.storageUsage}
                    color="success"
                    sx={{
                      width: '80%',
                      height: 10,
                      borderRadius: 5,
                      bgcolor: '#e0e0e0',
                    }}
                  />
                  <Typography variant="subtitle2">{host.storageUsage}%</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={host.firewallStatus}
                    color={host.firewallStatus === 'Active' ? 'success' : 'error'}
                    icon={<span role="img" aria-label="firewall">🔥</span>}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{host.lastUpdate}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default HostResourceTable;
