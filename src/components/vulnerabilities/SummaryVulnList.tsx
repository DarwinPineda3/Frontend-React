import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { IconEye } from '@tabler/icons-react';
import dayjs from 'dayjs';
import _ from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import { useDispatch, useSelector } from 'src/store/Store';
import { createVulnerabilities } from 'src/store/vulnerabilities/ManagementVulnSlice';
import {
  fetchSummaryVulnerabilitiesByDateRange,
  setPage,
  setPageSize,
} from 'src/store/vulnerabilities/SummaryVulnSlice';
import { vulnerabilitySolution } from 'src/types/solutions/vulnerabilitySolution';
import { managementVulnerabilityType } from 'src/types/vulnerabilities/vulnerabilityManagementType';
import { getChipColor, getSeverityColor } from 'src/utils/severityUtils';
import AiSolutionModal from '../aisolutioncontent/AiSolutionModal';
import DashboardCard from '../shared/DashboardCard';
import Loader from '../shared/Loader/Loader';
import NoDataAvailable from 'src/views/general/NoDataAvailable';

const SummaryVulnerabilitiesList = () => {
  const [searchParams, setsearchParams] = useSearchParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [showModal, setShowModal] = useState(false);
  const [selectedVulnerability, setSelectedVulnerability] = useState<vulnerabilitySolution | null>(
    null,
  );
  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    now.setDate(1);
    return now.toISOString().split('T')[0];
  });

  const [endDate, setEndDate] = useState(() => {
    const now = new Date();
    now.setMonth(now.getMonth() + 1, 1);
    return now.toISOString().split('T')[0];
  });

  const startISO = startDate ? new Date(`${startDate}T00:00:00.000Z`).toISOString() : '';
  const endISO = endDate ? new Date(`${endDate}T00:00:00.000Z`).toISOString() : '';

  React.useEffect(() => {
    if (endDate < startDate) {
      const newEndDate = new Date(new Date(startDate).setMonth(new Date(startDate).getMonth() + 1))
        .toISOString()
        .split('T')[0];
      if (newEndDate !== endDate) {
        setEndDate(newEndDate);
      }
    }
  }, [startDate, endDate]);

  React.useEffect(() => {
    const urlStart = searchParams.get('startDate');
    const urlEnd = searchParams.get('endDate');

    if (urlStart && urlEnd) {
      setStartDate(urlStart);
      setEndDate(urlEnd);
    }
  }, []);

  React.useEffect(() => {
    const urlStart = searchParams.get('startDate') || '';
    const urlEnd = searchParams.get('endDate') || '';

    if (startDate !== urlStart || endDate !== urlEnd) {
      setsearchParams({ startDate, endDate }, { replace: true });
    }
  }, [startDate, endDate]);

  React.useEffect(() => {
    if (snackbarMessage && snackbarSeverity) {
      setSnackbarOpen(true);
    }
  }, [snackbarMessage, snackbarSeverity]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await dispatch(
          fetchSummaryVulnerabilitiesByDateRange(startISO, endISO, currentPage, pageSize),
        );
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, currentPage, pageSize, startISO, endISO]);

  const handleNavigateVuln = (report_url: string) => {
    navigate(report_url);
  };

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

  const handleFormSubmit = (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error',
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(false);
  };

  const handleFetchByDateRange = async () => {
    if (!startDate || !endDate) {
      return handleFormSubmit(
        `${t('vulnerabilities.management.date_range_selection_error')}`,
        'error',
      );
    }

    if (new Date(endDate) < new Date(startDate)) {
      return handleFormSubmit(
        `${t('vulnerabilities.management.date_error_end_before_start')}`,
        'error',
      );
    }

    setIsLoading(true);
    try {
      await dispatch(
        fetchSummaryVulnerabilitiesByDateRange(startISO, endISO, currentPage, pageSize),
      );
    } catch (error) {
      console.error(error);
      handleFormSubmit(`${t('vulnerabilities.scan_failed')}`, 'error');
    } finally {
      setIsLoading(false);
    }
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

  const handleOpenModal = (vulnerability: managementVulnerabilityType) => {
    const filteredVulnerability: vulnerabilitySolution = {
      report_id: vulnerability.report_id,
      tool: vulnerability.tool,
      vulnerability_name: vulnerability.name,
      vulnerability_id: vulnerability.id!,
    };

    setSelectedVulnerability(filteredVulnerability);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVulnerability(null);
  };

  return (
    <DashboardCard
      title={t('summary.vulnerabilities_summary')!}
      subtitle={t('summary.vulnerabilities_summary_list')!}
      action={
        <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} gap={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('vulnerabilities.start_date')}
              value={startDate ? dayjs(startDate) : null}
              onChange={(date) => {
                if (date) setStartDate(date.format('YYYY-MM-DD'));
              }}
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('vulnerabilities.end_date')!}
              value={endDate ? dayjs(endDate) : null}
              onChange={(date) => {
                if (date) setEndDate(date.format('YYYY-MM-DD'));
              }}
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            disabled={!startDate || !endDate || new Date(endDate) < new Date(startDate)}
            onClick={handleFetchByDateRange}
          >
            {t('vulnerabilities.management.search')!}
          </Button>
        </Box>
      }
    >
      <Box>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ManageAccountsIcon />}
          onClick={handleCreateVulnerabilities}
        >
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
                              label={getChipColor(_.lowerCase(vulnerability.type), theme, t).label}
                              sx={{
                                backgroundColor: getChipColor(
                                  _.lowerCase(vulnerability.type),
                                  theme,
                                  t,
                                ).color,
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
                                backgroundColor: getSeverityColor(vulnerability.severity, theme)
                                  .color,
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
                        <TableCell sx={{ textAlign: 'center' }}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleNavigateVuln(vulnerability.report_url)}
                          >
                            <IconEye />
                          </IconButton>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenModal(vulnerability)}
                          >
                            <AutoAwesomeIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10}>
                       <NoDataAvailable entityType="vulnetability"/>
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
            <AiSolutionModal
              showModal={showModal}
              onClose={handleCloseModal}
              vulnerabilityProps={selectedVulnerability!}
            />
          </>
        )}
      </Box>
    </DashboardCard>
  );
};

export default SummaryVulnerabilitiesList;
