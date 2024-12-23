import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Box,
  Button,
  Dialog,
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
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import { deleteNetworkObservabilityScan, fetchNetworkObservabilityById, fetchNetworkObservabilityData } from 'src/store/observability/ObservabilityNetworkSlice';
import { AppState, useDispatch, useSelector } from 'src/store/Store';

const burntScansData = [
  {
    id: '1',
    url: 'google.com',
    date: '8 de octubre de 2024 a las 07:47',
    scanSetting: 'Escaneo de puertos TCP',
  },
  {
    id: '2',
    url: 'google.com',
    date: '1 de octubre de 2024 a las 10:05',
    scanSetting: 'Escaneo de puertos TCP',
  },
  {
    id: '3',
    url: 'google.com',
    date: '10 de septiembre de 2024 a las 23:00',
    scanSetting: 'Escaneo de puertos TCP',
  },
  {
    id: '4',
    url: 'google.com/',
    date: '9 de septiembre de 2024 a las 23:00',
    scanSetting: 'Escaneo de puertos TCP',
  },
  {
    id: '5',
    url: 'google.com',
    date: '8 de septiembre de 2024 a las 23:00',
    scanSetting: 'Escaneo de puertos TCP',
  },
  {
    id: '6',
    url: 'google.com',
    date: '7 de septiembre de 2024 a las 23:00',
    scanSetting: 'Escaneo de puertos TCP',
  },
  {
    id: '7',
    url: 'google.com',
    date: '6 de septiembre de 2024 a las 23:00',
    scanSetting: 'Escaneo de puertos TCP',
  },
  {
    id: '8',
    url: 'google.com',
    date: '3 de septiembre de 2024 a las 12:11',
    scanSetting: 'Escaneo de puertos TCP',
  },
];

interface ScanListTableProps {
  onScanClick: (scanId: string) => void;
}

const NetworkScanListTable: React.FC<ScanListTableProps> = ({ onScanClick }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1; // Adjust based on the number of pages
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { networkScansData, networkScansDetail } = useSelector((state: AppState) => state.NetworkObservabilityReducer);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedScanId, setSelectedScanId] = useState('');

  useEffect(() => {
    dispatch(fetchNetworkObservabilityData());
  }, [dispatch]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
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
      console.log('Deleting scan:', selectedScanId);
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

  return (
    <Box>
      <DashboardCard title={t('observability.scans')!} subtitle={t('observability.list_of_all_scans')!} action={addButton}>
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
                {networkScansData.map((scan) => (
                  <TableRow key={scan["id"]}>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        color="primary"
                        component="a"
                        onClick={() => onScanClick(scan["id"])}
                        style={{ cursor: 'pointer' }}
                      >
                        {scan["name"]}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <HumanizedDate dateString={scan["scan_start"]} />
                      <Typography>{new Date(scan["scan_start"]).toLocaleString()}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{scan["scan_type"]}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleDownload(scan["id"])}>
                        <DownloadIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(scan["id"])}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
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
