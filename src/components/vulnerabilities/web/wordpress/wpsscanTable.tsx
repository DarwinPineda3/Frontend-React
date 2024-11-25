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
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchWPScans, setPage } from 'src/store/vulnerabilities/web/WPScanSlice';
import Loader from 'src/components/shared/Loader/Loader';

interface ScanListTableProps {
  onScanClick: (scanId: string) => void;
}

const WPScanListTable: React.FC<ScanListTableProps> = ({ onScanClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const wpscans = useSelector((state: any) => state.wpscanReducer.wpscans);
  const currentPage = useSelector((state: any) => state.wpscanReducer.page);
  const totalPages = useSelector((state: any) => state.wpscanReducer.totalPages);

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

  // const handleDownload = (newsId: string, nameDownload: string) => {
  //   dispatch(downloadNewsletter(newsId, nameDownload));
  // };

  // const handleDelete = (scanId: string) => {
  //   console.log(`Deleting scan ${scanId}`);
  // };

  return (
      <DashboardCard title={t('vulnerabilities.scans')!} subtitle={t('vulnerabilities.list_of_scans')!}>
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
                      {t('vulnerabilities.url')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('vulnerabilities.date')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('vulnerabilities.scan_type')}
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
                {wpscans.map((scan) => (
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
                        {scan.url}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{scan.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{scan.scanType}</Typography>
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
                <h1>no data</h1> //mejorar el estilo
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
      </DashboardCard>
  );
};

export default WPScanListTable;
