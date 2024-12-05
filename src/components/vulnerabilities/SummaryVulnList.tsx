import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconEye } from '@tabler/icons-react';
import _ from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import { useDispatch, useSelector } from 'src/store/Store';
import { createVulnerabilities } from 'src/store/vulnerabilities/ManagementVulnSlice';
import { fetchSummaryVuln, setPage, setPageSize } from 'src/store/vulnerabilities/SummaryVulnSlice';
import { managementVulnerabilityType } from 'src/types/vulnerabilities/vulnerabilityManagementType';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import DashboardCard from '../shared/DashboardCard';
import Loader from '../shared/Loader/Loader';

const SummaryVulnerabilitiesList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const summaryVuln = useSelector((state: any) => state.summaryVulnReducer.summaryVuln);
  const currentPage = useSelector((state: any) => state.summaryVulnReducer.page);
  const totalPages = useSelector((state: any) => state.summaryVulnReducer.totalPages);
  const pageSize = useSelector((state: any) => state.summaryVulnReducer.pageSize);
  const [selectedVulnerabilities, setSelectedVulnerabilities] = useState<
    managementVulnerabilityType[]
  >([]);
  const [allSelected, setAllSelected] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control the snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for the snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success'); // Snackbar severity
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
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
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchSummaryVuln(currentPage, pageSize));
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage, pageSize]);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number,
  ) => {
    const newPage = page + 1;
    if (newPage !== currentPage) {
      dispatch(setPage(newPage));
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newPageSize = event.target.value as number;
    dispatch(setPageSize(newPageSize));
    dispatch(setPage(1));
  };
  const [month, setMonth] = React.useState('1');
  const currentYear = new Date().getFullYear();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAllSelected(isChecked);

    if (isChecked) {
      setSelectedVulnerabilities(summaryVuln);
    } else {
      setSelectedVulnerabilities([]);
    }
  };

  const handleSelectionChange = (vulnerability: managementVulnerabilityType) => {
    setSelectedVulnerabilities((prev) => {
      const exists = prev.find((v) => v.id === vulnerability.id);
      if (exists) {
        return prev.filter((v) => v.id !== vulnerability.id);
      }
      return [...prev, vulnerability];
    });
  };

  const handleCreateVulnerabilities = async () => {
    if (selectedVulnerabilities.length === 0) {
      setSnackbarMessage(t('vulnerabilities.management.select_vulnerabilities')!);
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    setSnackbarOpen(false);

    try {
      const response = await dispatch(createVulnerabilities(selectedVulnerabilities));
      const { managed = [], saved_correctly = [] } = response || {};
      let message = '';
      let severity: 'success' | 'warning' | 'error' = 'success';

      if (managed?.length) {
        message += `${t('vulnerabilities.management.already_managed')}: ${managed.join(', ')}. `;
        severity = 'warning';
      }
      if (saved_correctly?.length) {
        message += `${t('vulnerabilities.management.managed_successfully')}: ${saved_correctly.join(
          ', ',
        )}. `;
        severity = 'success';
      }

      if (!message) {
        message = t('vulnerabilities.management.managed_failed')!;
        severity = 'error';
      }

      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    } catch (error: any) {
      setSnackbarMessage(t('vulnerabilities.management.managed_failed')!);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  return (
    <DashboardCard
      title={t('summary.vulnerabilities_summary')!}
      subtitle={t('summary.vulnerabilities_summary_list')!}
      action={
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
      }
    >
      <Box>
        <Button variant="outlined" color="primary" onClick={handleCreateVulnerabilities}>
          {t('summary.managed_selected_vuulnerabilities')}
        </Button>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Loader />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table aria-label="technology table" sx={{ whiteSpace: 'nowrap' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <input type="checkbox" checked={allSelected} onChange={handleSelectAll} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: 'center' }} fontWeight={600}>
                        {t('summary.type')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('summary.hosts')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: 'center' }} fontWeight={600}>
                        {t('summary.severity')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('summary.name')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('summary.date')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('summary.tool')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('summary.view_report')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('summary.ai_solution')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {summaryVuln.length > 0 ? (
                    summaryVuln.map((vulnerability: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedVulnerabilities.some((v) => v.id === vulnerability.id)}
                            onChange={() => handleSelectionChange(vulnerability)}
                          />
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            <Chip
                              label={getChipColor(_.lowerCase(vulnerability.type)).label}
                              sx={{
                                backgroundColor: getChipColor(_.lowerCase(vulnerability.type))
                                  .color,
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
                          <Typography
                            variant="subtitle2"
                            sx={{ textAlign: 'center' }}
                            fontWeight={600}
                          >
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
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            <HumanizedDate dateString={vulnerability.report_date} />
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            {vulnerability.tool}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            color="primary"
                            href={vulnerability.report_url}
                            target="_blank"
                          >
                            <IconEye />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            color="primary"
                            href={vulnerability.report_url}
                            target="_blank"
                          >
                            <AutoAwesomeIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography color="textSecondary" variant="subtitle2" align="center">
                          {t('vulnerabilities.no_data_available')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={totalPages * pageSize}
              rowsPerPage={pageSize}
              page={currentPage - 1}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handlePageSizeChange}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {snackbarOpen && (
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={6000}
                  onClose={() => setSnackbarOpen(false)}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                  <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                  </Alert>
                </Snackbar>
              )}
            </Box>
          </>
        )}
      </Box>
    </DashboardCard>
  );
};

export default SummaryVulnerabilitiesList;
