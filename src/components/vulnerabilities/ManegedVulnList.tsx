import {
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconDownload, IconEye } from '@tabler/icons-react';
import _ from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchmanagedVuln, setPage } from 'src/store/vulnerabilities/ManagementVulnSlice';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import DashboardCard from '../shared/DashboardCard';

const ManegedVulnerabilitiesList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const manegedVuln = useSelector((state: any) => state.managementVulnReducer.managedVuln);
  const currentPage = useSelector((state: any) => state.managementVulnReducer.page);
  const totalPages = useSelector((state: any) => state.managementVulnReducer.totalPages);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control the snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for the snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success'); // Snackbar severity
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const criticalColor = theme.palette.level.critical;
  const highColor = theme.palette.level.high;
  const mediumColor = theme.palette.level.medium;
  const lowColor = theme.palette.level.low;
  const noneColor = theme.palette.level.none;

  const getChipColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
        return { color: criticalColor, label: t('monitoring.critical') };
      case 'high':
        return { color: highColor, label: t('monitoring.high') };
      case 'medium':
        return { color: mediumColor, label: t('monitoring.medium') };
      case 'low':
        return { color: lowColor, label: t('monitoring.low') };
      default:
        return { color: noneColor, label: 'N/A' };
    }
  };

  const getChipColorSeverity = (severity: number) => {
    if (severity > 9.0) {
      return { color: criticalColor };
    } else if (severity > 7.0) {
      return { color: highColor };
    } else if (severity > 4.0) {
      return { color: mediumColor };
    } else if (severity > 0) {
      return { color: lowColor };
    } else {
      return { color: noneColor };
    }
  };

  React.useEffect(() => {
    dispatch(fetchmanagedVuln(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };
  const handleDownloadExcel = () => {
    setSnackbarSeverity('info');
    setSnackbarMessage('Download Excel...');
    setSnackbarOpen(true);
  };

  const [month, setMonth] = React.useState('1');
  const currentYear = new Date().getFullYear();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  return (
    <DashboardCard
      title={t('vulnerabilities.management.vulnerabilities_management')}
      subtitle={t('vulnerabilities.management.vulnerabilities_management_list')}
      action={
        <Box
          display="flex"
          flexDirection={isSmallScreen ? 'column' : 'row'}
          gap={isSmallScreen ? 2 : 1}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Button variant="outlined" startIcon={<IconDownload />} onClick={handleDownloadExcel}>
            {t('vulnerabilities.management.download_excel')}
          </Button>

          <CustomSelect
            labelId="month-dd"
            id="month-dd"
            size="small"
            value={month}
            onChange={handleChange}
          >
            <MenuItem value={1}>{`${t('dashboard.march')} ${currentYear}`}</MenuItem>
            <MenuItem value={2}>{`${t('dashboard.april')} ${currentYear}`}</MenuItem>
            <MenuItem value={3}>{`${t('dashboard.may')} ${currentYear}`}</MenuItem>
          </CustomSelect>
        </Box>
      }
    >
      <Box>
        <TableContainer sx={{ maxHeight: { xs: 300, sm: 500 } }}>
          <Table aria-label="technology table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                {[
                  t('vulnerabilities.management.type'),
                  t('vulnerabilities.management.hosts'),
                  t('vulnerabilities.management.severity'),
                  t('vulnerabilities.management.name'),
                  t('vulnerabilities.management.date'),
                  t('vulnerabilities.management.tool'),
                  t('vulnerabilities.management.status'),
                  t('vulnerabilities.management.details'),
                ].map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{ display: { xs: index > 3 ? 'none' : 'table-cell', md: 'table-cell' } }}
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      {header}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {manegedVuln.map((vulnerability: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      <Chip
                        label={getChipColor(_.lowerCase(vulnerability.type)).label}
                        sx={{
                          backgroundColor: getChipColor(_.lowerCase(vulnerability.type)).color,
                          color: 'white',
                        }}
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {vulnerability.hosts}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      <Chip
                        label={vulnerability.severity}
                        sx={{
                          backgroundColor: getChipColorSeverity(vulnerability.severity).color,
                          color: 'white',
                        }}
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {vulnerability.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      <HumanizedDate dateString={vulnerability.creation_time} />
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {vulnerability.tool}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      <Chip
                        label={
                          vulnerability.status === 'OPEN'
                            ? t('vulnerabilities.management.open')
                            : t('vulnerabilities.management.closed')
                        }
                        sx={{
                          backgroundColor:
                            vulnerability.status === 'OPEN'
                              ? theme.palette.success.main
                              : theme.palette.error.main,
                          color: 'white',
                        }}
                      />
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <IconButton
                      size="small"
                      color="primary"
                      href={vulnerability.report_url}
                      target="_blank"
                    >
                      <IconEye />
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
        {snackbarOpen && (
          <SnackBarInfo
            color={snackbarSeverity}
            title="Operation Status"
            message={snackbarMessage}
          />
        )}
      </Box>
    </DashboardCard>
  );
};

export default ManegedVulnerabilitiesList;
