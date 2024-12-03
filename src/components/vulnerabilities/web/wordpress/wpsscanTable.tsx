import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Dialog,
  DialogContent,
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
import { useNavigate } from 'react-router';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchWPScans, setPage, downloadWPScanReport, deleteWPScan } from 'src/store/vulnerabilities/web/WPScanSlice';
import CreateWPScan from './wpscanCreate';

import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';


interface ScanListTableProps {
  onScanClick: (scanId: string) => void;
}

const WPScanListTable: React.FC<ScanListTableProps> = ({ onScanClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const wpscans = useSelector((state: any) => state.wpscanReducer.wpscans);
  const currentPage = useSelector((state: any) => state.wpscanReducer.page);
  const totalPages = useSelector((state: any) => state.wpscanReducer.totalPages);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');

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

  const handleDelete = (scanId: string) => {
    dispatch(deleteWPScan(scanId));
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
                          {t('vulnerabilities.actions')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wpscans.map((scan: any) => (
                      <TableRow key={scan.id}>
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


      <Dialog open={openDialog} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogContent>
          <CreateWPScan onSubmit={handleFormSubmit} />
        </DialogContent>
      </Dialog>

      {snackbarOpen && (
        <SnackBarInfo
          color={snackbarSeverity}
          title={t("wpscan.operation_status")}
          message={snackbarMessage}
        />
      )}
    </DashboardCard>
  );
};

export default WPScanListTable;
