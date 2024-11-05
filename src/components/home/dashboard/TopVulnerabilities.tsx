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
  IconButton,
  Box,
} from '@mui/material';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import DashboardCard from '../../shared/DashboardCard';
import Loader from '../../shared/Loader/Loader';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { IconEye } from '@tabler/icons-react';

import { useDispatch, useSelector } from 'src/store/Store';
import { fetchVulnerabilityReports } from 'src/store/sections/dashboard/TopVulnerabilitiesSlice';
import { AppState } from 'src/store/Store';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

const TopVulnerabilities = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state: AppState) => state.dashboard.vulnerabilities);

  const [month, setMonth] = React.useState('1');
  const currentYear = new Date().getFullYear();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchVulnerabilityReports());
  }, [dispatch]);

  if (loading) {
    return (
      <DashboardCard title={t("dashboard.vulnerability_reports")} subtitle={t("dashboard.most_recent_scans")}>
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
    <DashboardCard
      title={t("dashboard.vulnerability_reports")}
      subtitle={t("dashboard.most_recent_scans")}
      action={
        <CustomSelect
          labelId="month-dd"
          id="month-dd"
          size="small"
          value={month}
          onChange={handleChange}
        >
          <MenuItem value={1}>{`${t("dashboard.march")} ${currentYear}`}</MenuItem>
          <MenuItem value={2}>{`${t("dashboard.april")} ${currentYear}`}</MenuItem>
          <MenuItem value={3}>{`${t("dashboard.may")} ${currentYear}`}</MenuItem>
        </CustomSelect>
      }
    >
      <TableContainer>
        <Table aria-label="vulnerability report table" sx={{ whiteSpace: 'nowrap' }}>
          <TableHead>
            <TableRow>
              {['type', 'hosts', 'severity', 'name', 'date', 'tool', 'view_report', 'ai_assistant_solution'].map((key) => (
                <TableCell key={key}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t(`dashboard.${key}`)}
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
                      <Chip
                        sx={{
                            bgcolor:
                            _.capitalize(report.type) === 'Critical'
                            ? (theme) => theme.palette.level.critical
                            : _.capitalize(report.type) === 'High'
                            ? (theme) => theme.palette.level.high
                            : _.capitalize(report.type) === 'Medium'
                            ? (theme) => theme.palette.level.medium
                            : _.capitalize(report.type) === 'Low'
                            ? (theme) => theme.palette.level.low
                            : (theme) => theme.palette.level.unknown,
                        color: (theme) => theme.palette.background.default,
                            borderRadius: '8px',
                        }}
                        size="small"
                        label={_.capitalize(report.type)}
                      />
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
                        report.severity > 9.0
                        ? (theme) => theme.palette.level.critical
                        : report.severity > 7.0
                        ? (theme) => theme.palette.level.high
                        : report.severity > 4.0
                        ? (theme) => theme.palette.level.medium
                        : report.severity > 0
                        ? (theme) => theme.palette.level.low
                        : (theme) => theme.palette.level.unknown,
                    color: (theme) => theme.palette.background.default,
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
                    <IconButton
                        size="small"
                        color="primary"
                        href="#"
                        target="_blank"
                    >
                        <IconEye />
                    </IconButton>
                </TableCell>
                <TableCell>
                    <IconButton
                        size="small"
                        color="primary"
                        href="#"
                        target="_blank"
                        >
                            <AutoAwesomeIcon />
                    </IconButton>
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
