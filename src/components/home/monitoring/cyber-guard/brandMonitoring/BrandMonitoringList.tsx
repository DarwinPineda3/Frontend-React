import React, { useState, } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Box,
  Pagination,
} from '@mui/material';
import DashboardCard from '../../../../shared/DashboardCard';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchBrandMonitoringData, setPage, } from 'src/store/sections/cyber-guard/BrandMonitoringSlice';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import HumanizedDate from 'src/components/shared/HumanizedDate';


interface BrandMonitoringListProps {
  onBrandMonitoringClick: (id: string) => void;
}

const BrandMonitoringList : React.FC<BrandMonitoringListProps> = ({ onBrandMonitoringClick }) => {
  const dispatch = useDispatch();
  const brandMonitoring = useSelector((state: any) => state.brandMonitoringReducer.brandMonitoringData?.latest_data || []);
  const currentPage = useSelector((state: any) => state.brandMonitoringReducer.page);
  const totalPages = useSelector((state: any) => state.brandMonitoringReducer.totalPages);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success'); // Snackbar severity
  

  React.useEffect(() => {
    dispatch(fetchBrandMonitoringData(currentPage));
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
    <DashboardCard title="Brand Monitoring" subtitle="List of Available Brand Monitoring Scans">  
      <Box>    
        <TableContainer>
          <Table aria-label="Brand Monitoring table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Query
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Query Type
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Total Results
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Last Search
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                brandMonitoring.length > 0 ? brandMonitoring.map((result: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography                       variant="subtitle2"
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
                        {result.query_type}
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
                )) : (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography color="textSecondary" variant="subtitle2" align="center">
                        No data available
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              }
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
      </Box>
    </DashboardCard>
  );
};

export default BrandMonitoringList;
