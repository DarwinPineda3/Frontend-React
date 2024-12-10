import {
  Alert,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { useDispatch, useSelector } from 'src/store/Store';
import {
  fetchBrandMonitoringData,
  setPage,
  setPageSize,
} from 'src/store/sections/cyber-guard/BrandMonitoringSlice';
import DashboardCard from '../../../../shared/DashboardCard';

interface BrandMonitoringListProps {
  onBrandMonitoringClick: (id: string) => void;
}

const BrandMonitoringList: React.FC<BrandMonitoringListProps> = ({ onBrandMonitoringClick }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const brandMonitoring = useSelector(
    (state: any) => state.brandMonitoringReducer.brandMonitoringData?.latest_data || [],
  );
  const currentPage = useSelector((state: any) => state.brandMonitoringReducer.page);
  const totalPages = useSelector((state: any) => state.brandMonitoringReducer.totalPages);
  const pageSize = useSelector((state: any) => state.brandMonitoringReducer.pageSize);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success'); // Snackbar severity
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchBrandMonitoringData(currentPage, pageSize));
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <DashboardCard
      title={t('menu.monitoring')!}
      subtitle={t('monitoring.list_of_available_monitoring_scans')!}
    >
      <Box>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Loader />
          </Box>
        ) : (
          <>
            {brandMonitoring.length > 0 && (
              <Alert severity="info" sx={{ mb: 2 }}>
                {t('monitoring.monitoring_times')}
              </Alert>
            )}
            <TableContainer>
              <Table aria-label="Brand Monitoring table" sx={{ whiteSpace: 'nowrap' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('monitoring.parameter')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('monitoring.parameter_type')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('monitoring.total_results')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('monitoring.last_search')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {brandMonitoring.length > 0 ? (
                    brandMonitoring.map((result: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            color="primary"
                            component="a"
                            onClick={() => onBrandMonitoringClick(result.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            {result.query}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            {t(`monitoring.${result.query_type.toLowerCase()}`).toUpperCase()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            {result.total_results}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            <HumanizedDate dateString={result.scan_date} />
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography color="textSecondary" variant="subtitle2" align="center">
                          {t('monitoring.no_data_available')}
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

            {/* Snackbar */}
            {snackbarOpen && (
              <SnackBarInfo
                color={snackbarSeverity}
                title="Operation Status"
                message={snackbarMessage}
              />
            )}
          </>
        )}
      </Box>
    </DashboardCard>
  );
};

export default BrandMonitoringList;
