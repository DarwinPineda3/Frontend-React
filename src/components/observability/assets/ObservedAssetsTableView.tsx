import { Info } from '@mui/icons-material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import {
  Box,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchObservedAssetData } from 'src/store/observability/ObservedAssetsSlice';
import { AppState, useDispatch, useSelector } from 'src/store/Store';
interface ObservedAssetsProps {
  onScanClick: (scanId: string) => void;
}

const ObservedAssetsTable: React.FC<ObservedAssetsProps> = ({ onScanClick }) => {
  const { observedAssetsData, error, page, totalPages, pageSize, loading } = useSelector(
    (state: AppState) => state.ObservedAssetsReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchObservedAssetData(
      page,
      pageSize
    ));
  }, [dispatch]);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const grey = theme.palette.grey[300];
  const primarylight = theme.palette.primary.light;
  const greylight = theme.palette.grey[100];

  const { t } = useTranslation();

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    dispatch(fetchObservedAssetData(page, pageSize));
  };

  const handleDownload = (scanId: string) => {
    console.log(`Downloading scan ${scanId}`);
  };

  const handleDelete = (scanId: string) => {
    console.log(`Deleting scan ${scanId}`);
  };

  if (error) {
    return <Box>{error}</Box>;
  }


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
      >
        <Box>
          <TableContainer>
            <Table aria-label="scan list table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.asset')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.cpu')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.ram')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.storage')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.firewall')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('observability.last_update')}
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
                {observedAssetsData.length > 0 ? (
                  observedAssetsData.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          color="primary"
                          component="a"
                          onClick={() => onScanClick(`${asset.id}`)}
                          style={{ cursor: 'pointer' }}
                        >
                          {asset.Hostname}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <LinearProgress
                          variant="determinate"
                          value={asset.CpuInfo.CpuUsage}
                          sx={{
                            width: '80%',
                            height: 10,
                            borderRadius: 5,
                            bgcolor: '#e0e0e0',
                          }}
                        />
                        <Typography variant="subtitle2">{asset.CpuInfo.CpuUsage}%</Typography>
                      </TableCell>
                      <TableCell>
                        <LinearProgress
                          variant="determinate"
                          value={asset.RamInfo.RamUsagePercentage}
                          color="warning"
                          sx={{
                            width: '80%',
                            height: 10,
                            borderRadius: 5,
                            bgcolor: '#e0e0e0',
                          }}
                        />
                        <Typography variant="subtitle2">
                          {asset.RamInfo.RamUsagePercentage}%
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <LinearProgress
                          variant="determinate"
                          value={asset.Storage.TotalUsagePercentage}
                          color="success"
                          sx={{
                            width: '80%',
                            height: 10,
                            borderRadius: 5,
                            bgcolor: '#e0e0e0',
                          }}
                        />
                        <Typography variant="subtitle2">
                          {asset.Storage.TotalUsagePercentage}%
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          {asset.Firewall === 'Running' ? (
                            <LocalFireDepartmentIcon style={{ color: primary }} />
                          ) : (
                            <LocalFireDepartmentIcon style={{ color: grey }} />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <HumanizedDate dateString={asset.Timestamp} />
                        <Typography variant="body2">{asset.Timestamp}</Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton color="error" onClick={() => onScanClick(`${asset.id}`)}>
                          <Info />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
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
            onRowsPerPageChange={(e) => dispatch(fetchObservedAssetData(page, e.target.value))}
          />
        </Box>
      </DashboardCard>
    </Box>
  );
};

export default ObservedAssetsTable;
