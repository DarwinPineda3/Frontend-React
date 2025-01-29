import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Chip,
  LinearProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { AppState, useDispatch, useSelector } from 'src/store/Store';
import {
  deleteWebApplicationScan,
  downloadWebApplicationReport,
  fetchWebApplicationsData,
  setLoading,
  setPage,
  setPageSize,
} from 'src/store/vulnerabilities/web/WebAplicationsSlice';

interface ScanListTableProps {
  onScanClick: (scanId: number) => void;
}

const ScanListTable: React.FC<ScanListTableProps> = ({ onScanClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loading, data, error } = useSelector((state: AppState) => state.WebApplicationsReducer);
  const currentPage = useSelector((state: any) => state.WebApplicationsReducer.page);
  const totalPages = useSelector((state: any) => state.WebApplicationsReducer.totalPages);
  const pageSize = useSelector((state: any) => state.WebApplicationsReducer.pageSize);
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');

  const [scanToDelete, setScanToDelete] = useState<null | string>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchWebApplicationsData(currentPage, pageSize));
      setLoading(false);
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

  const handleDownload = async (scanId: string) => {
    try {
      await dispatch(downloadWebApplicationReport(scanId));
    } catch (error: any) {
      setSnackbarMessage(error || '');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDelete = (scanId: string) => {
    setScanToDelete(scanId);
    setDeleteDialogOpen(true);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setScanToDelete(null);
  };

  const confirmDelete = async () => {
    if (scanToDelete !== null) {
      try {
        await dispatch(deleteWebApplicationScan(scanToDelete));
        setSnackbarMessage(t('web_app.scan_deleted_successfully') || '');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } catch (error: any) {
        setSnackbarMessage(error.error || '');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
    setDeleteDialogOpen(false);
    setScanToDelete(null);
  };

  if (error) {
    return <div>{t('dashboard.error', { error })}</div>;
  }

  const addButton = (
    <IconButton
      color="primary"
      onClick={() => {
        navigate('/vulnerabilities/web/applications/create');
      }}
    >
      <AddIcon />
    </IconButton>
  );

  return (
    <Box>
      <DashboardCard
        title={t('vulnerabilities.scans')!}
        subtitle={t('vulnerabilities.scan_list')!}
        action={addButton}
      >
        <>
          <Box>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                <Loader />
              </Box>
            ) : (
              <>
                <TableContainer>
                  <Table aria-label="scan list table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {t('vulnerabilities.name')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {t('vulnerabilities.hosts')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {t('vulnerabilities.date')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {t('vulnerabilities.type')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {t('vulnerabilities.progress')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {t('vulnerabilities.actions')}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.length > 0 ? (
                      data.map((scan: any, index: number) => {
                        let progressColor: 'error' | 'warning' | 'success' = 'error'; 
                        if (scan.progress >= 80) {
                          progressColor = 'success'; 
                        } else if (scan.progress >= 50) {
                          progressColor = 'warning'; 
                        } else {
                          progressColor = 'error'; 
                        }

                          return (
                            <TableRow key={index}>
                              <TableCell>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={600}
                                  color="primary"
                                  component="a"
                                  onClick={() => onScanClick(scan.id)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  {scan.name}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2">{scan.hosts}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2">
                                  <HumanizedDate dateString={scan.scan_start} />
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2">
                                  {scan.scan_type === 'active_scan'
                                    ? t('vulnerabilities.web_app.active_scan')
                                    : t('vulnerabilities.web_app.passive_scan')}
                                </Typography>
                              </TableCell>
                              <TableCell>
                              <Box display="flex" flexDirection="column" alignItems="center">
                                <LinearProgress
                                  variant="determinate"
                                  value={scan.progress}
                                  color={progressColor}
                                  sx={{
                                    width: '80%',
                                    height: 10,
                                    borderRadius: 5,
                                    bgcolor: '#e0e0e0',
                                    marginBottom: 1,
                                  }}
                                />
                                <Typography variant="caption" color="textSecondary">
                                  {scan.progress}%
                                </Typography>
                              </Box>
                              </TableCell>
                              <TableCell>
                                <IconButton color="primary" onClick={() => handleDownload(scan.id)}>
                                  <DownloadIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDelete(scan.id)}>
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              justifyContent="center"
                              height="100px"
                            >
                              <Typography variant="body2" color="textSecondary">
                                {t('vulnerabilities.no_data_available')}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="primary"
                                component="a"
                                onClick={() => navigate('/vulnerabilities/web/applications/create')}
                                style={{
                                  cursor: 'pointer',
                                  textDecoration: 'underline',
                                  marginTop: '8px',
                                }}
                              >
                                {t('vulnerabilities.create_scan_here')}
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

          <Dialog open={deleteDialogOpen} onClose={cancelDelete} maxWidth="xs" fullWidth>
            <DialogTitle>{t('vulnerabilities.web_app.delete_title')}</DialogTitle>
            <DialogContent>
              <Typography>{t('vulnerabilities.web_app.delete_message')}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelDelete} color="info">
                {t('vulnerabilities.web_app.delete_cancel')}
              </Button>
              <Button onClick={confirmDelete} color="primary" variant="contained">
                {t('vulnerabilities.web_app.delete_confirm')}
              </Button>
            </DialogActions>
          </Dialog>

          {snackbarOpen && (
            <SnackBarInfo
              open={snackbarOpen}
              color={snackbarSeverity}
              title={snackbarSeverity === 'success' ? 'Success' : 'Error'}
              message={snackbarMessage}
              onClose={() => setSnackbarOpen(false)}
            />
          )}
        </>
      </DashboardCard>
    </Box>
  );
};

export default ScanListTable;
