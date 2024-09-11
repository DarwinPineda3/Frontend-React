// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';

import TopVulnerabilityData from './TopVulnerability';
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
} from '@mui/material';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import DashboardCard from '../shared/DashboardCard';

const reports = TopVulnerabilityData;

const TopVulnerabilities = () => {
  // for select
  const [month, setMonth] = React.useState('1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

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
          <TableCell>
            <Typography variant="subtitle2" fontWeight={600}>
              Type
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle2" fontWeight={600}>
              Hosts
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle2" fontWeight={600}>
              Severity
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle2" fontWeight={600}>
              Name
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle2" fontWeight={600}>
              Date
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle2" fontWeight={600}>
              Tool
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle2" fontWeight={600}>
              View Report
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle2" fontWeight={600}>
              AI Assistant Solution
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {reports.map((report) => (
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
