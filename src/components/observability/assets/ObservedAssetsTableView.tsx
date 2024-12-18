import { Info } from '@mui/icons-material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import {
  Box,
  IconButton,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import { fetchObservedAssetData } from 'src/store/observability/ObservedAssetsSlice';
import { AppState, useDispatch, useSelector } from 'src/store/Store';
interface ObservedAssetsProps {
  onScanClick: (scanId: string) => void;
}

const ObservedAssetsTable: React.FC<ObservedAssetsProps> = ({ onScanClick }) => {

  const { observedAssetsData, error } = useSelector((state: AppState) => state.ObservedAssetsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchObservedAssetData());
  }, [dispatch]);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const grey = theme.palette.grey[300];
  const primarylight = theme.palette.primary.light;
  const greylight = theme.palette.grey[100];

  const { t } = useTranslation();


  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1; // Adjust based on the number of pages

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
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

  return (
    <Box>
      <DashboardCard title={t('observability.scans')!} subtitle={t('observability.list_of_all_scans')!}>
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
                {observedAssetsData.map((asset) => (
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
                      <Typography variant="subtitle2">{asset.RamInfo.RamUsagePercentage}%</Typography>
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
                      <Typography variant="subtitle2">{asset.Storage.TotalUsagePercentage}%</Typography>
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
    </Box>
  );
};

export default ObservedAssetsTable;
