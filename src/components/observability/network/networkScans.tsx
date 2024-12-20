import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Box,
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
import { fetchNetworkObservabilityData } from 'src/store/observability/ObservabilityNetworkSlice';
import { AppState, useDispatch, useSelector } from 'src/store/Store';

interface ScanListTableProps {
  onScanClick: (scanId: string) => void;
}

const NetworkScanListTable: React.FC<ScanListTableProps> = ({ onScanClick }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1; // Adjust based on the number of pages
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { networkScansData } = useSelector((state: AppState) => state.NetworkObservabilityReducer);

  useEffect(() => {
    dispatch(fetchNetworkObservabilityData());
  }, [dispatch]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleDownload = (scanId: string) => {
    console.log(`Downloading scan ${scanId}`);
  };

  const handleDelete = (scanId: string) => {
    console.log(`Deleting scan ${scanId}`);
  };

  const addButton = (
    <IconButton color="primary" onClick={() => navigate('/observability/network/create')}>
      <AddIcon />
    </IconButton>
  );

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
    </Box>
  );
};

export default NetworkScanListTable;
