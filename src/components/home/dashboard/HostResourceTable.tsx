import React, { useEffect } from 'react';
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
  Box,
} from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import Loader from '../../shared/Loader/Loader';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchHostData } from 'src/store/sections/dashboard/HostResourceSlice';
import { AppState } from 'src/store/Store';
import { useTranslation } from 'react-i18next';

const HostResourceTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state: AppState) => state.dashboard.hosts);

  useEffect(() => {
    dispatch(fetchHostData());
  }, [dispatch]);

  if (loading) {
    return (
      <DashboardCard title={t("dashboard.host_resource_monitoring") as string} subtitle={t("dashboard.system_resource_usage") as string}>
        <Box display="flex" justifyContent="center" mt={4} mb={4}>
          <Loader />
        </Box>
      </DashboardCard>
    );
  }

  if (error) {
    return <div>{t("dashboard.error", { error })}</div>;
  }

  return (
    <DashboardCard title={t("dashboard.host_resource_monitoring") as string} subtitle={t("dashboard.system_resource_usage") as string}>
      <TableContainer>
        <Table aria-label="host resource table" sx={{ whiteSpace: 'nowrap' }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t("dashboard.number")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t("dashboard.host_name")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t("dashboard.cpu")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t("dashboard.ram")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t("dashboard.storage")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t("dashboard.firewall")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t("dashboard.last_update")}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((host) => (
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
                    label={t(host.firewallStatus === 'Active' ? 'active' : 'inactive')}
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
