import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Box,
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
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import { AppState, useDispatch, useSelector } from 'src/store/Store';
import {
  fetchWebApplicationsData,
  setPage,
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
  useEffect(() => {
    dispatch(fetchWebApplicationsData());
  }, [dispatch]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  const handleDownload = (scanId: number) => {
    console.log(`Downloading scan ${scanId}`);
  };

  const handleDelete = (scanId: number) => {
    console.log(`Deleting scan ${scanId}`);
  };

  if (loading || data == null) {
    return (
      <DashboardCard title={t('vulnerabilities.scans')!} subtitle={t('vulnerabilities.scan_list')!}>
        <Box display="flex" justifyContent="center" mt={4} mb={4}>
          <Loader />
        </Box>
      </DashboardCard>
    );
  }
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
        <Box>
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
                  data.map((scan, index) => (
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
                          {scan.scan_type == 'active_scan'
                            ? t('vulnerabilities.web_app.active_scan')
                            : t('vulnerabilities.web_app.passive_scan')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{`${scan.progress}%`}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {scan.progressTime}
                        </Typography>
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
          <Box my={3} display="flex" justifyContent="center">
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={totalPages * pageSize}
              rowsPerPage={pageSize}
              page={currentPage - 1}
              onPageChange={(e, destPage) => handlePageChange(e, destPage + 1)}
              onRowsPerPageChange={(e) => dispatch(fetchWebApplicationsData())}
            />
          </Box>
        </Box>
      </DashboardCard>
    </Box>
  );
};

export default ScanListTable;
