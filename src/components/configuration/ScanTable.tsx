import { Block, Visibility } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import {
  deactivateScheduleScanById,
  fetchScheduleScans,
  setPage,
  setPageSize,
} from 'src/store/sections/schedule-scans-settings/ScheduleScansSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import { ScheduledTaskType } from 'src/types/schedule-scans-settings/schedule_scans_type';
import { getExecutionFrequencyLabels, getScanTypeLabels } from 'src/utils/scanLabels';
import ConfirmActionModal from '../modal/ConfirmActionModal';
import DashboardCard from '../shared/DashboardCard';
import Loader from '../shared/Loader/Loader';

const ScansTable: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const scheduled_scans = useSelector((state: any) => state.scheduleScansReducer.scheduled_scans);
  const currentPage = useSelector((state: any) => state.scheduleScansReducer.page);
  const totalPages = useSelector((state: any) => state.scheduleScansReducer.totalPages);
  const pageSize = useSelector((state: any) => state.scheduleScansReducer.pageSize);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control the snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for the snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');
  const [scheduleScantoDeactivate, setScheduleScantoDeactivate] =
    useState<ScheduledTaskType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (snackbarMessage && snackbarSeverity) {
      setSnackbarOpen(true);
    }
  }, [snackbarMessage, snackbarSeverity]);

  const handleDeactivateClick = (scheduleScan: ScheduledTaskType) => {
    setScheduleScantoDeactivate(scheduleScan);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setScheduleScantoDeactivate(null);
  };
  const handleFormSubmit = (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error',
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(false);
  };

  const handleConfirmDeactivate = async () => {
    if (scheduleScantoDeactivate) {
      try {
        await dispatch(deactivateScheduleScanById(scheduleScantoDeactivate?.id!));
        setScheduleScantoDeactivate(null);
        setOpenModal(false);
        handleFormSubmit(
          `${t('settings.scheduled_scans.desactivate.scheduled_scan_deactivated_successfully')}`,
          'success',
        );
      } catch (error) {
        console.error('Error deactivate scheduled scan:', error);
        setScheduleScantoDeactivate(null);
        setOpenModal(false);
        handleFormSubmit(`${t('settings.scheduled_scans.desactivate.scan_failed')}`, 'error');
      } finally {
        dispatch(fetchScheduleScans(currentPage, pageSize));
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchScheduleScans(currentPage, pageSize));
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

  const handleScanClick = (id: number) => {
    navigate(`/configuration/schedule-scan/detail/${id}`);
  };

  const filteredScans = scheduled_scans.filter((scan: ScheduledTaskType) =>
    (scan.name || '').toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const scanTypeLabels = getScanTypeLabels(t);
  const executionFrequencyLabels = getExecutionFrequencyLabels(t);

  const addButton = (
    <IconButton color="primary" onClick={() => navigate('/configuration/schedule-scan/create')}>
      <AddIcon />
    </IconButton>
  );

  return (
    <DashboardCard
      title={t('menu.scheduled_scans') as string}
      subtitle={t('configuration.scheduled_scans_subtitle') as string}
      action={addButton}
    >
      <Box>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            variant="outlined"
            placeholder={t('settings.scheduled_scans.search_placeholder')!}
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: '150px' }}
          />
        </Box>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Loader />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table aria-label="scheduled_scans table" sx={{ whiteSpace: 'nowrap' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('settings.scheduled_scans.table_headers.name')!}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('settings.scheduled_scans.table_headers.scan_type')!}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('settings.scheduled_scans.table_headers.execution_frequency')!}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('settings.scheduled_scans.table_headers.execution_time')!}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('settings.scheduled_scans.table_headers.status')!}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('settings.scheduled_scans.table_headers.actions')!}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredScans.length > 0 ? (
                    filteredScans.map((scan: ScheduledTaskType) => (
                      <TableRow key={scan.id}>
                        <TableCell>
                          <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            color="primary"
                            component="a"
                            onClick={() => handleScanClick(scan.id)}
                            style={{ cursor: 'pointer', display: 'block' }}
                          >
                            {scan.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {' '}
                            {scanTypeLabels[scan.scan_type] ||
                              t('settings.scheduled_scans.common.unknown')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {' '}
                            {executionFrequencyLabels[scan.execution_frequency] ||
                              t('settings.scheduled_scans.common.unknown')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {new Date(scan.execution_time).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={
                              scan.is_active
                                ? t('settings.scheduled_scans.status.active')
                                : t('settings.scheduled_scans.status.deactivated')
                            }
                            color={scan.is_active ? 'success' : 'error'}
                            variant="filled"
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title={t('settings.scheduled_scans.actions.view_details')}>
                            <IconButton color="primary" onClick={() => handleScanClick(scan.id)}>
                              <Visibility />
                            </IconButton>
                          </Tooltip>

                          {scan.is_active && (
                            <Tooltip title={t('settings.scheduled_scans.actions.deactivate')}>
                              <IconButton color="error" onClick={() => handleDeactivateClick(scan)}>
                                <Block />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          height="100px"
                        >
                          <Typography variant="body2" color="textSecondary">
                            {t('settings.scheduled_scans.messages.no_scheduled_scans_found')}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="primary"
                            component="a"
                            onClick={() => navigate('/configuration/schedule-scan/create')}
                            style={{
                              cursor: 'pointer',
                              textDecoration: 'underline',
                              marginTop: '8px',
                            }}
                          >
                            {t('settings.scheduled_scans.navigation.create_scan_here')}
                          </Typography>
                        </Box>
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
            {snackbarOpen && (
              <SnackBarInfo
                color={snackbarSeverity}
                title="Operation Status"
                message={snackbarMessage}
              />
            )}
            <ConfirmActionModal
              open={openModal}
              handleClose={handleClose}
              handleConfirm={handleConfirmDeactivate}
            />
          </>
        )}
      </Box>
    </DashboardCard>
  );
};

export default ScansTable;
