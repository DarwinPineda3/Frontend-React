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

const burntScansData = [
  {
    "id": 1,
    "assetName": "Server A",
    "cpuPercentage": [45, 50, 48, 42],
    "ramPercentage": [68, 72, 70, 65],
    "storagePercentage": 78,
    "firewallStatus": "active",
    "lastUpdate": "2024-10-22T10:30:00Z"
  },
  {
    "id": 2,
    "assetName": "Server B",
    "cpuPercentage": [32, 35, 30, 28],
    "ramPercentage": [54, 60, 57, 52],
    "storagePercentage": 60,
    "firewallStatus": "active",
    "lastUpdate": "2024-10-21T14:45:00Z"
  },
  {
    "id": 3,
    "assetName": "Workstation 1",
    "cpuPercentage": [50, 55, 52, 49],
    "ramPercentage": [73, 75, 72, 70],
    "storagePercentage": 82,
    "firewallStatus": "inactive",
    "lastUpdate": "2024-10-21T12:10:00Z"
  },
  {
    "id": 4,
    "assetName": "Laptop X",
    "cpuPercentage": [21, 25, 23, 20],
    "ramPercentage": [47, 50, 48, 45],
    "storagePercentage": 55,
    "firewallStatus": "active",
    "lastUpdate": "2024-10-20T16:25:00Z"
  },
  {
    "id": 5,
    "assetName": "Workstation 2",
    "cpuPercentage": [38, 42, 40, 36],
    "ramPercentage": [60, 65, 62, 58],
    "storagePercentage": 65,
    "firewallStatus": "inactive",
    "lastUpdate": "2024-10-19T11:40:00Z"
  },
  {
    "id": 6,
    "assetName": "Server C",
    "cpuPercentage": [71, 75, 72, 70],
    "ramPercentage": [85, 90, 88, 82],
    "storagePercentage": 90,
    "firewallStatus": "active",
    "lastUpdate": "2024-10-18T13:15:00Z"
  },
  {
    "id": 7,
    "assetName": "Workstation 3",
    "cpuPercentage": [44, 50, 46, 42],
    "ramPercentage": [62, 65, 60, 58],
    "storagePercentage": 70,
    "firewallStatus": "active",
    "lastUpdate": "2024-10-17T15:30:00Z"
  },
  {
    "id": 8,
    "assetName": "Server D",
    "cpuPercentage": [56, 60, 58, 54],
    "ramPercentage": [73, 78, 75, 70],
    "storagePercentage": 79,
    "firewallStatus": "inactive",
    "lastUpdate": "2024-10-16T10:05:00Z"
  },
  {
    "id": 9,
    "assetName": "Laptop Y",
    "cpuPercentage": [29, 32, 30, 27],
    "ramPercentage": [52, 55, 53, 50],
    "storagePercentage": 68,
    "firewallStatus": "active",
    "lastUpdate": "2024-10-15T17:20:00Z"
  },
  {
    "id": 10,
    "assetName": "Workstation 4",
    "cpuPercentage": [63, 68, 65, 60],
    "ramPercentage": [76, 80, 78, 72],
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
      <DashboardCard title="Scans" subtitle="List of all scans">
        <Box>
          <TableContainer>
            <Table aria-label="scan list table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Asset
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
                      Last Update
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Actions
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
                    <Chart
                        options={optionsCpuChart}
                        series={[{ data: asset.cpuPercentage, color: secondary }]}
                        type="area"
                        height="35px"
                        width="100px"
                      />
                    </TableCell>
                    <TableCell>
                      <Chart
                        options={optionsRamChart}
                        series={[{ data: asset.ramPercentage, color: primary }]}
                        type="area"
                        height="35px"
                        width="100px"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box width="100%">
                          <LinearProgress variant="determinate" value={asset.storagePercentage} color="info" />
                        </Box>
                        <Typography variant="subtitle2" color="textSecondary">
                          {asset.storagePercentage}%
                        </Typography>
                      </Stack>
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
