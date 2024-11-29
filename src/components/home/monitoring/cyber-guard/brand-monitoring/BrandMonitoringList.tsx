import {
  Alert,
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success'); // Snackbar severity
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchBrandMonitoringData(currentPage));
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
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
            <Box my={3} display="flex" justifyContent={'center'}>
              <Pagination
                count={totalPages}
                color="primary"
                page={currentPage}
                onChange={handlePageChange}
              />
            </Box>

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
