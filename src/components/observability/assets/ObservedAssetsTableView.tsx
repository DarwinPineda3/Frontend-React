import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  Box,
  Pagination,
  LinearProgress,
  Stack,
  useTheme,
  IconButton,
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import DeleteIcon from '@mui/icons-material/Delete';
import { Props } from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

const burntScansData = [
  {
    "id": 1,
    "assetName": "Server A",
    "cpuPercentage": 45,
    "ramPercentage": 72,
    "storagePercentage": 78,
    "firewallStatus": "active",
    "lastUpdate": "2024-10-22T10:30:00Z"
  },
  {
    "id": 2,
    "assetName": "Server B",
    "cpuPercentage": 32,
    "ramPercentage": 57,
    "storagePercentage": 60,
    "firewallStatus": "active",
    "lastUpdate": "2024-10-21T14:45:00Z"
  },
  {
    "id": 3,
    "assetName": "Workstation 1",
    "cpuPercentage": 52,
    "ramPercentage": 75,
    "storagePercentage": 82,
    "firewallStatus": "inactive",
    "lastUpdate": "2024-10-21T12:10:00Z"
  },
  {
    "id": 4,
    "assetName": "Laptop X",
    "cpuPercentage": 25,
    "ramPercentage": 48,
    "storagePercentage": 55,
    "firewallStatus": "active",
    "lastUpdate": "2024-10-20T16:25:00Z"
  },
  {
    "id": 5,
    "assetName": "Workstation 2",
    "cpuPercentage": 42,
    "ramPercentage": 65,
    "storagePercentage": 65,
    "firewallStatus": "inactive",
    "lastUpdate": "2024-10-19T11:40:00Z"
  },
  {
    "id": 6,
    "assetName": "Server C",
    "cpuPercentage": 71,
    "ramPercentage": 85,
    "storagePercentage": 90,
    "firewallStatus": "active",
    "lastUpdate": "2024-10-18T13:15:00Z"
  },
  {
    "id": 7,
    "assetName": "Workstation 3",
    "cpuPercentage": 44,
    "ramPercentage": 62,
    "storagePercentage": 70,
    "firewallStatus": "active",
    "lastUpdate": "2024-10-17T15:30:00Z"
  },
  {
    "id": 8,
    "assetName": "Server D",
    "cpuPercentage": 56,
    "ramPercentage": 73,
    "storagePercentage": 79,
    "firewallStatus": "inactive",
    "lastUpdate": "2024-10-16T10:05:00Z"
  },
  {
    "id": 9,
    "assetName": "Laptop Y",
    "cpuPercentage": 29,
    "ramPercentage": 52,
    "storagePercentage": 68,
    "firewallStatus": "active",
    "lastUpdate": "2024-10-15T17:20:00Z"
  },
  {
    "id": 10,
    "assetName": "Workstation 4",
    "cpuPercentage": 63,
    "ramPercentage": 76,
    "storagePercentage": 85,
    "firewallStatus": "active",
    "lastUpdate": "2024-10-14T09:50:00Z"
  }
];

interface ObservedAssetsProps {
  onScanClick: (scanId: string) => void;
}

const ObservedAssetsTable: React.FC<ObservedAssetsProps> = ({ onScanClick }) => {

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const grey = theme.palette.grey[300];
  const primarylight = theme.palette.primary.light;
  const greylight = theme.palette.grey[100];

  const { t } = useTranslation();


  const optionsRamChart: Props = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: primary,
      toolbar: {
        show: false,
      },
      height: 35,
      width: 100,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [primary],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      enabled: false,
    },
  };

  const optionsCpuChart: Props = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 35,
      width: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [greylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      enabled: false,
    },
  };


  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1; // Adjust based on the number of pages

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleDownload = (scanId: string) => {
    console.log(`Downloading scan ${scanId}`);
  };

  const handleDelete = (scanId: string) => {
    console.log(`Deleting scan ${scanId}`);
  };

  return (
    <Box>
      <DashboardCard title={t('observability.scans')!} subtitle={t('observability.list_of_all_scans')!}>
        <Box>
          <TableContainer>
            <Table aria-label="scan list table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.asset')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.cpu')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.ram')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.storage')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.firewall')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.last_update')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.actions')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {burntScansData.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        color="primary"
                        component="a"
                        onClick={() => onScanClick(`${asset.id}`)}
                        style={{ cursor: 'pointer' }}
                      >
                        {asset.assetName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <LinearProgress
                        variant="determinate"
                        value={asset.cpuPercentage}
                        sx={{
                          width: '80%',
                          height: 10,
                          borderRadius: 5,
                          bgcolor: '#e0e0e0',
                        }}
                      />
                      <Typography variant="subtitle2">{asset.cpuPercentage}%</Typography>
                    </TableCell>
                    <TableCell>
                      <LinearProgress
                        variant="determinate"
                        value={asset.ramPercentage}
                        color="warning"
                        sx={{
                          width: '80%',
                          height: 10,
                          borderRadius: 5,
                          bgcolor: '#e0e0e0',
                        }}
                      />
                      <Typography variant="subtitle2">{asset.ramPercentage}%</Typography>
                    </TableCell>
                    <TableCell>
                      <LinearProgress
                        variant="determinate"
                        value={asset.storagePercentage}
                        color="success"
                        sx={{
                          width: '80%',
                          height: 10,
                          borderRadius: 5,
                          bgcolor: '#e0e0e0',
                        }}
                      />
                      <Typography variant="subtitle2">{asset.storagePercentage}%</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        {asset.firewallStatus === 'active' ? (
                          <LocalFireDepartmentIcon style={{ color: primary }} />
                        ) : (
                          <LocalFireDepartmentIcon style={{ color: grey }} />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{asset.lastUpdate}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDelete(`${asset.id}`)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box my={3} display="flex" justifyContent={'center'}>
            <Pagination
              count={totalPages}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      </DashboardCard>
    </Box>
  );
};

export default ObservedAssetsTable;
