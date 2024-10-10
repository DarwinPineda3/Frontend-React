import React, { useEffect } from 'react';
import {
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  Box,
} from '@mui/material';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import DashboardCard from '../../shared/DashboardCard';
import Loader from '../../shared/Loader/Loader'; // Loader component

import { useDispatch, useSelector } from 'src/store/Store'; // Corrected imports
import { fetchVulnerabilityReports } from 'src/store/sections/dashboard/TopVulnerabilitiesSlice';
import { AppState } from 'src/store/Store'; // App state type

const TopVulnerabilities = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state: AppState) => state.dashboard.vulnerabilities);

  // for select
  const [month, setMonth] = React.useState('1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchVulnerabilityReports());
  }, [dispatch]);

  if (loading) {
    return (
        <DashboardCard
      title="Vulnerability Reports"
      subtitle="Most Recent Scans">
              <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Loader />
      </Box>
      </DashboardCard>

    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <DashboardCard
      title="Vulnerability Reports"
      subtitle="Most Recent Scans"
      action={
        <CustomSelect
          labelId="month-dd"
          id="month-dd"
          size="small"
          value={month}
          onChange={handleChange}
        >
          <MenuItem value={1}>March 2023</MenuItem>
          <MenuItem value={2}>April 2023</MenuItem>
          <MenuItem value={3}>May 2023</MenuItem>
        </CustomSelect>
      }
    >
      <TableContainer>
        <Table
          aria-label="vulnerability report table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              {['Type', 'Hosts', 'Severity', 'Name', 'Date', 'Tool', 'View Report', 'AI Assistant Solution'].map((head) => (
                <TableCell key={head}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {head}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {report.type}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {report.hosts}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      bgcolor:
                        report.severity === 'High'
                          ? (theme) => theme.palette.error.light
                          : report.severity === 'Medium'
                          ? (theme) => theme.palette.warning.light
                          : report.severity === 'Low'
                          ? (theme) => theme.palette.success.light
                          : (theme) => theme.palette.secondary.light,
                      color:
                        report.severity === 'High'
                          ? (theme) => theme.palette.error.main
                          : report.severity === 'Medium'
                          ? (theme) => theme.palette.warning.main
                          : report.severity === 'Low'
                          ? (theme) => theme.palette.success.main
                          : (theme) => theme.palette.background.default,
                      borderRadius: '8px',
                    }}
                    size="small"
                    label={report.severity}
                  />
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {report.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{report.date}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{report.tool}</Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    component="a"
                    target="_blank"
                    href="#"
                  >
                    View Report
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{report.aiAssistantSolution}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default TopVulnerabilities;
