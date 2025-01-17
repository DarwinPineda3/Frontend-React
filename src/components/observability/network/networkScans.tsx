import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import { deleteNetworkObservabilityScan, fetchNetworkObservabilityById, fetchNetworkObservabilityData } from 'src/store/observability/ObservabilityNetworkSlice';
import { AppState, useDispatch, useSelector } from 'src/store/Store';

interface ScanListTableProps {
  onScanClick: (scanId: string) => void;
}

const NetworkScanListTable: React.FC<ScanListTableProps> = ({ onScanClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { networkScansData, networkScansDetail, page, totalPages, pageSize, loading } = useSelector((state: AppState) => state.NetworkObservabilityReducer);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedScanId, setSelectedScanId] = useState('');

  useEffect(() => {
    dispatch(fetchNetworkObservabilityData(
      page
    ));
  }, [dispatch]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    dispatch(fetchNetworkObservabilityData(page, pageSize));
  };


  const handleDownload = async (scanId: string) => {
    try {
      const response = await dispatch(fetchNetworkObservabilityById(scanId)); // Returns a plain object
      if (response) {
        const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `network_scan_${scanId}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        console.error('No response data to download');
      }
    } catch (error) {
      console.error('Error downloading the scan:', error);
    }
  };


  const handleDelete = (scanId: string) => {
    setSelectedScanId(scanId);
    setShowDeleteDialog(true);
  };

  const performDelete = async () => {
    try {
      await dispatch(deleteNetworkObservabilityScan(selectedScanId));
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting the scan:', error);
    }
  }

  const addButton = (
    <IconButton color="primary" onClick={() => navigate('/observability/network/create')}>
      <AddIcon />
    </IconButton>
  );

  if (loading) {
    return <DashboardCard>
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Loader></Loader>
      </Box>
    </DashboardCard>
  }

  return (
    <Box>
      <DashboardCard
        title={t('observability.scans')!}
        subtitle={t('observability.list_of_all_scans')!}
        action={addButton}
      >
        <Box>
          <TableContainer>
            <Table aria-label="scan list table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.url')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.date')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.scan_type')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.actions')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {networkScansData.length > 0 ? (
                  networkScansData.map((scan) => (
                    <TableRow key={scan['id']}>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          color="primary"
                          component="a"
                          onClick={() => onScanClick(scan['id'])}
                          style={{ cursor: 'pointer' }}
                        >
                          {scan['name']}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {new Date(scan['scan_start']).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{scan['scan_type']}</Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleDownload(scan['id'])}>
                          <DownloadIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(scan['id'])}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
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
                          onClick={() => navigate('/observability/network/create')}
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
            page={page - 1}
            onPageChange={(e, destPage) => handlePageChange(e, destPage + 1)}
            onRowsPerPageChange={(e) => dispatch(fetchNetworkObservabilityData(page, e.target.value))}
          />
        </Box>
      </DashboardCard>
      {
        showDeleteDialog && (
          <Dialog open={showDeleteDialog} maxWidth="sm">
            <Box p={3}>
              {/* Delete dialog */}
              <Box>
                {/* Dialog content */}
                <Box>
                  <Typography variant="h5">{t('observability.delete_scan')}</Typography>
                  <Typography variant="body2">{t('observability.delete_scan_warning')}</Typography>
                </Box>
                {/* Dialog actions */}
                <Box mt={3} display="flex" justifyContent="space-between">
                  <Button color="info" onClick={() => setShowDeleteDialog(false)}>
                    {t('dashboard.cancel')}
                  </Button>
                  <Button color="secondary" onClick={() => performDelete()}>
                    {t('observability.delete')}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Dialog>
        )
      }
    </Box>
  );
};

export default NetworkScanListTable;
