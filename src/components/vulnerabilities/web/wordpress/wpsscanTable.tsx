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
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { useDispatch, useSelector } from 'src/store/Store';
import { deleteWPScan, downloadWPScanReport, fetchWPScans, setPage } from 'src/store/vulnerabilities/web/WPScanSlice';
import CreateWPScan from './wpscanCreate';

import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';


interface ScanListTableProps {
  onScanClick: (scanId: string) => void;
}

const WPScanListTable: React.FC<ScanListTableProps> = ({ onScanClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const wpscans = useSelector((state: any) => state.wpscanReducer.wpscans);
  const currentPage = useSelector((state: any) => state.wpscanReducer.page);
  const totalPages = useSelector((state: any) => state.wpscanReducer.totalPages);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
  const [wpScanToDelete, setWPScanToDelete] = useState<null | string>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const error = useSelector((state: any) => state.wpscanReducer.error);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchWPScans(currentPage));
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  const handleOpenModal = () => {
    setOpenDialog(true);
  };

  const handleCloseModal = () => {
    setOpenDialog(false);
  };

  const handleDownload = (id: string) => {
    dispatch(downloadWPScanReport(id));

  };

  const handleDelete = (id: string) => {
    setWPScanToDelete(id);
    setDeleteDialogOpen(true);
    // dispatch(deleteWPScan(scanId));
  };

  const confirmDelete = async () => {
    if (wpScanToDelete !== null) {
      await dispatch(deleteWPScan(wpScanToDelete));
      if (await error) {
        setSnackbarMessage(t("wpscan.wpscan_deleted_successfully") || '');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage(error || '');
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

  const handleFormSubmit = (message: string, severity: 'success' | 'info' | 'warning' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(false);
    setTimeout(() => {
      setSnackbarOpen(true);
    }, 0);
    handleCloseModal();
  };

  return (
    <DashboardCard title={t('wpscan.wordpress_scans') || ''} subtitle={t('wpscan.list_all_wordpress_scans') || ''}
      action={
        <IconButton color="primary" onClick={handleOpenModal}>
          <AddIcon />
        </IconButton>
      }>
      <>
        <Box>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
              <Loader />
            </Box>
          ) : (
            <>
              {wpscans.length > 0 ? (
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
                      {wpscans.map((scan: any, index: any) => (
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
                            <Typography variant="body2"><HumanizedDate dateString={scan.scan_start} /></Typography>
                          </TableCell>
                          <TableCell>
                            {scan.scan_type === 'scan_normal' ? 'Scan normal' : scan.scan_type === 'scan_deep' ? 'Scan deep' : 'Unknown scan type'}
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
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6">{t('wpscan.no_data_available')}</Typography>
                  </Grid>
                </Grid>
              )
              }

              <Box my={3} display="flex" justifyContent={'center'}>
                <Pagination
                  count={totalPages}
                  color="primary"
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </Box>
            </>
          )}
        </Box>


        <Dialog open={openDialog} onClose={handleCloseModal} maxWidth="sm" fullWidth aria-labelledby="create-wpscan-dialog-title">
          <DialogContent>
            <CreateWPScan onSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>

        <Dialog open={deleteDialogOpen} onClose={cancelDelete} maxWidth="xs" fullWidth>
          <DialogTitle>{t("wpscan.delete_scan")}</DialogTitle>
          <DialogContent>
            <Typography>{t("wpscan.are_you_sure_you_want_to_delete_this_scan")}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete} color="info">
              {t("wpscan.cancel")}
            </Button>
            <Button onClick={confirmDelete} color="primary" variant="contained">
              {t("wpscan.confirm")}
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
