import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
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
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { useDispatch, useSelector } from 'src/store/Store';
import {
  deleteWPScan,
  downloadWPScanReport,
  fetchWPScans,
  setPage,
  setPageSize,
} from 'src/store/vulnerabilities/web/WPScanSlice';
import CreateWPScan from './wpscanCreate';

import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router';
import NoDataAvailable from 'src/views/general/NoDataAvailable';

interface ScanListTableProps {
  onScanClick: (scanId: string) => void;
}

const WPScanListTable: React.FC<ScanListTableProps> = ({ onScanClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const wpscans = useSelector((state: any) => state.wpscanReducer.wpscans);
  const currentPage = useSelector((state: any) => state.wpscanReducer.page);
  const totalPages = useSelector((state: any) => state.wpscanReducer.totalPages);
  const pageSize = useSelector((state: any) => state.wpscanReducer.pageSize);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState< 'success' | 'info' | 'warning' | 'error' >('success');
  const [wpScanToDelete, setWPScanToDelete] = useState<null | string>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchWPScans(currentPage, pageSize));
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

  const handleOpenModal = () => {
    setOpenDialog(true);
  };

  const handleCloseModal = () => {
    setOpenDialog(false);
  };

  const handleDownload = async (id: string) => {
    try {
      await dispatch(downloadWPScanReport(id));
    } catch (error: any) {
      setSnackbarMessage(error || '');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setWPScanToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (wpScanToDelete !== null) {
      try {
        await dispatch(deleteWPScan(wpScanToDelete));
        setSnackbarMessage(t('wpscan.wpscan_deleted_successfully') || '');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } catch (error: any) {
        setSnackbarMessage(error.error || '');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
    setDeleteDialogOpen(false);
    setWPScanToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setWPScanToDelete(null);
  };

  const handleFormSubmit = (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error',
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(false);
    setTimeout(() => {
      setSnackbarOpen(true);
    }, 0);
    handleCloseModal();
  };

  return (
    <DashboardCard
      title={t('wpscan.wordpress_scans') || ''}
      subtitle={t('wpscan.list_all_wordpress_scans') || ''}
      action={
        <IconButton
          color="primary"
          onClick={() => navigate('/vulnerabilities/web/wordpress/create')}
        >
          <AddIcon />
        </IconButton>
      }
    >
      <>
        <Box>
          {isLoading ? (
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
                          {t('wpscan.url')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {t('wpscan.date')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {t('wpscan.scan_type')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {t('wpscan.actions')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wpscans.length > 0 ? (
                      wpscans.map((scan: any, index: any) => (
                        <TableRow key={scan.id || index}>
                          <TableCell>
                            <Typography
                              variant="subtitle2"
                              fontWeight={600}
                              color="primary"
                              component="a"
                              onClick={() => onScanClick(scan.id)}
                              style={{ cursor: 'pointer' }}
                            >
                              {scan.target_url}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              <HumanizedDate dateString={scan.scan_start} />
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {scan.scan_type === 'scan_normal'
                              ? 'Scan normal'
                              : scan.scan_type === 'scan_deep'
                              ? 'Scan deep'
                              : 'Unknown scan type'}
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          <NoDataAvailable entityType="scan" formUrl='/vulnerabilities/web/wordpress/create'/>
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

        <Dialog
          open={openDialog}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
          aria-labelledby="create-wpscan-dialog-title"
        >
          <DialogContent>
            <CreateWPScan onSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>

        <Dialog open={deleteDialogOpen} onClose={cancelDelete} maxWidth="xs" fullWidth>
          <DialogTitle>{t('wpscan.delete_scan')}</DialogTitle>
          <DialogContent>
            <Typography>{t('wpscan.are_you_sure_you_want_to_delete_this_scan')}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete} color="info">
              {t('wpscan.cancel')}
            </Button>
            <Button onClick={confirmDelete} color="primary" variant="contained">
              {t('wpscan.confirm')}
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
  );
};

export default WPScanListTable;