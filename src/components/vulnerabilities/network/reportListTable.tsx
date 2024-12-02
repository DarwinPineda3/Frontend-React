import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
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
import { IconDownload, IconSearch, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import { useDispatch, useSelector } from 'src/store/Store';
import {
  fetchNetworkScansReports,
  setPage,
  setPageSize,
} from 'src/store/vulnerabilities/network/NetworkScansSlice';
import { NetworkScanReport } from 'src/types/vulnerabilities/network/networkScansType';

interface ScanAlertTableProps {
  scanId: string;
  onAlertClick: (alertId: string) => void;
}

const ReportListTable: React.FC<ScanAlertTableProps> = ({ scanId, onAlertClick }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const networkScanReports = useSelector(
    (state: any) => state.networkScanReducer.networkScanReports,
  );
  const currentPage = useSelector((state: any) => state.networkScanReducer.page);
  const totalPages = useSelector((state: any) => state.networkScanReducer.totalPages);
  const pageSize = useSelector((state: any) => state.networkScanReducer.pageSize);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchNetworkScansReports(currentPage, pageSize, scanId));
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage, pageSize, scanId]);

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
  // Fulltext Search Filter
  const filteredAlerts = networkScanReports.filter(
    (alert: NetworkScanReport) =>
      alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.severity.toString().includes(searchTerm.toLowerCase()) ||
      alert.scan_run_status.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Grid container>
      <DashboardCard>
        <Box>
          {/* Search Bar */}
          <Box mb={3} my={3}>
            <TextField
              placeholder={t('vulnerabilities.search_alerts')!}
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconSearch size={18} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
              <Loader />
            </Box>
          ) : (
            <>
              {/* Alerts Table */}
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('vulnerabilities.id')}</TableCell>
                      <TableCell>{t('vulnerabilities.report_date')}</TableCell>
                      <TableCell>{t('vulnerabilities.severity')}</TableCell>
                      <TableCell>{t('vulnerabilities.status')}</TableCell>
                      <TableCell>{t('vulnerabilities.actions')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAlerts.map((alert: NetworkScanReport) => (
                      <TableRow key={alert.id}>
                        <TableCell>
                          <Typography
                            color="primary"
                            fontWeight={500}
                            onClick={() => onAlertClick(alert.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            {alert.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <HumanizedDate dateString={alert.name} />
                        </TableCell>
                        <TableCell>
                          <Typography>{alert.severity}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{alert.scan_run_status}</Typography>
                        </TableCell>
                        <TableCell>
                          <Tooltip title={t('vulnerabilities.download_report')}>
                            <IconButton color="primary">
                              <IconDownload />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('vulnerabilities.delete_report')}>
                            <IconButton color="error">
                              <IconTrash />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
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
    </Grid>
  );
};

export default ReportListTable;
