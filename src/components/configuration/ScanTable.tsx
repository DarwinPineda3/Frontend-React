import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
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
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  fetchScheduleScans,
  setPage,
  setPageSize,
} from 'src/store/sections/schedule-scans-settings/ScheduleScansSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import { ScheduledTaskType } from 'src/types/schedule-scans-settings/schedule_scans_type';
import DashboardCard from '../shared/DashboardCard';
import Loader from '../shared/Loader/Loader';

interface ScansTableProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const ScansTable: React.FC<ScansTableProps> = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const scheduled_scans = useSelector((state: any) => state.scheduleScansReducer.scheduled_scans);
  const currentPage = useSelector((state: any) => state.scheduleScansReducer.page);
  const totalPages = useSelector((state: any) => state.scheduleScansReducer.totalPages);
  const pageSize = useSelector((state: any) => state.scheduleScansReducer.pageSize);
  const [isLoading, setIsLoading] = useState(false);

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
    scan.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (id: number) => {
    console.log('Delete scan with id:', id);
  };
  const scanTypeLabels: Record<number, string> = {
    1: t('settings.scheduled_scans.scan_types.network_vulnerability'),
    2: t('settings.scheduled_scans.scan_types.web_vulnerability'),
    3: t('settings.scheduled_scans.scan_types.wordpress_vulnerability'),
    4: t('settings.scheduled_scans.scan_types.network_observability'),
  };

  const executionFrequencyLabels: Record<number, string> = {
    1: t('settings.scheduled_scans.execution_frequencies.every_day'),
  };

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
                                : t('settings.scheduled_scans.status.inactive')
                            }
                            color={scan.is_active ? 'success' : 'error'}
                            variant="filled"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            sx={{ marginLeft: 1 }}
                            onClick={() => handleDelete(scan.id)}
                          >
                            {t('settings.scheduled_scans.actions.deactivate')!}
                          </Button>
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
          </>
        )}
      </Box>
    </DashboardCard>
  );
};

export default ScansTable;
