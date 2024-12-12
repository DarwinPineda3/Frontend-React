import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  TableContainer,
  Box,
  Pagination,
  Paper,
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'src/store/Store';
import { fetchCloudScans, setPage } from 'src/store/vulnerabilities/cloud/CloudSlice';
import Loader from 'src/components/shared/Loader/Loader';

interface CloudScanTableProps {
  onScanClick: (scanId: string) => void;
}

const CloudScanTable: React.FC<CloudScanTableProps> = ({ onScanClick }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);


  const cloudScans = useSelector((state: any) => state.cloudScanReducer.cloudScans);
  const currentPage = useSelector((state: any) => state.cloudScanReducer.page);
  const totalPages = useSelector((state: any) => state.cloudScanReducer.totalPages);
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState('');
  // const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
  // const [wpScanToDelete, setWPScanToDelete] = useState<null | string>(null);
  // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const {t} = useTranslation();

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchCloudScans(currentPage));
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage]);



  return (
    <DashboardCard title={t("vulnerabilities.scans")!} subtitle={t("vulnerabilities.list_of_all_scans")!}>
        <>
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
                                    {t("vulnerabilities.provider")}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {t("vulnerabilities.cloud_id")}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {t("vulnerabilities.date")}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cloudScans.map((scan: any) => (
                            <TableRow key={scan.id}>
                                <TableCell>
                                    <Typography variant="body2">{scan.provider}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        color="primary"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => onScanClick(scan.id)}
                                    >
                                        {scan.cloud_id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{scan.timestamp}</Typography>
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
            </>
              )}
        </>
    </DashboardCard>
  );
};

export default CloudScanTable;
