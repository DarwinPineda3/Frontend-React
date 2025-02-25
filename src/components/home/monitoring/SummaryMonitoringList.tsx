import {
  Alert,
  Box,
  Button,
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
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import { useDispatch, useSelector } from 'src/store/Store';
import {
  fetchSummaryMonitoringByDateRange,
  setPage,
  setPageSize,
} from 'src/store/sections/cyber-guard/SummaryMonitoringSlice';
import NoDataAvailable from 'src/views/general/NoDataAvailable';

interface SummaryMonitoringListProps {
  filter: string;
}

const SummaryMonitoringList: React.FC<SummaryMonitoringListProps> = ({ filter }) => {
  const [searchParams, setsearchParams] = useSearchParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const summaryMonitoring = useSelector(
    (state: any) => state.summaryMonitoringReducer?.summaryMonitoring || [],
  );
  const currentPage = useSelector((state: any) => state.summaryMonitoringReducer?.page || 1);
  const totalPages = useSelector((state: any) => state.summaryMonitoringReducer?.totalPages || 0);
  const pageSize = useSelector((state: any) => state.summaryMonitoringReducer?.pageSize || 10);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | 'all'>(filter);
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

  useEffect(() => {
    if (endDate < startDate) {
      const newEndDate = new Date(new Date(startDate).setMonth(new Date(startDate).getMonth() + 1))
        .toISOString()
        .split('T')[0];
      if (newEndDate !== endDate) {
        setEndDate(newEndDate);
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const urlType = searchParams.get('type');
    const urlStart = searchParams.get('startDate');
    const urlEnd = searchParams.get('endDate');

    if (urlType) {
      setTypeFilter(urlType);
    }

    if (urlStart && urlEnd) {
      setStartDate(urlStart);
      setEndDate(urlEnd);
    }
  }, []);

  useEffect(() => {
    const urlStart = searchParams.get('startDate') || '';
    const urlEnd = searchParams.get('endDate') || '';

    if (startDate !== urlStart || endDate !== urlEnd) {
      setsearchParams({ startDate, endDate }, { replace: true });
    }

    if (typeFilter !== null) {
      setsearchParams({ type: typeFilter, startDate, endDate }, { replace: true });
    }
  }, [startDate, endDate, typeFilter]);

  useEffect(() => {
    if (snackbarMessage && snackbarSeverity) {
      setSnackbarOpen(true);
    }
  }, [snackbarMessage, snackbarSeverity]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await dispatch(
          fetchSummaryMonitoringByDateRange(startISO, endISO, currentPage, pageSize, typeFilter),
        );
        console.log('Fetched Data:', { summaryMonitoring, currentPage, totalPages });
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, currentPage, pageSize, startISO, endISO, typeFilter]);

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

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAllSelected(isChecked);

    if (isChecked) {
      setSelectedItems(summaryMonitoring);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectionChange = (item: any) => {
    setSelectedItems((prev) => {
      const exists = prev.find((v) => v.id === item.id);
      if (exists) {
        return prev.filter((v) => v.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const handleCreateItems = async () => {
    if (selectedItems.length === 0) {
      setSnackbarMessage(t('summary.monitoring.select_items')!);
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    setSnackbarOpen(false);

    try {
      setSnackbarMessage(t('summary.monitoring.items_managed')!);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(t('summary.monitoring.manage_failed')!);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <DashboardCard
      title={t('summary.monitoring_summary')!}
      subtitle={t('summary.monitoring_summary_list')!}
      action={
        <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} gap={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('summary.start_date')}
              value={startDate ? dayjs(startDate) : null}
              onChange={(date) => {
                if (date) setStartDate(date.format('YYYY-MM-DD'));
              }}
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('summary.end_date')!}
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
            onClick={async () => {
              // fetch summary data by date range
              await dispatch(
                fetchSummaryMonitoringByDateRange(
                  startISO,
                  endISO,
                  currentPage,
                  pageSize,
                  typeFilter,
                ),
              );
            }}
          >
            {t('summary.search')}
          </Button>
        </Box>
      }
    >
      <Box>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Loader />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table aria-label="monitoring table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <input type="checkbox" checked={allSelected} onChange={handleSelectAll} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: 'center' }} fontWeight={600}>
                        {t('summary.data')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('summary.parameter')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('summary.data_type')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('summary.data_source')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('summary.view_report')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {summaryMonitoring.length > 0 ? (
                    summaryMonitoring.map((item: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedItems.some((i) => i.id === item.id)}
                            onChange={() => handleSelectionChange(item)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {item.data}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {item.parameter}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {item.data_type}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {item.data_source === 'dark_web'
                              ? 'Dark Web'
                              : item.data_source === 'data_leaks'
                              ? 'Data Leaks'
                              : item.data_source === 'internet'
                              ? 'Internet'
                              : '-'}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => navigate(item.report_url)}
                          >
                            <IconEye />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <NoDataAvailable entityType="monitoring" />
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

export default SummaryMonitoringList;
