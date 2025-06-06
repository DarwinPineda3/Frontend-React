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
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import EmptyState from 'src/components/shared/EmptyState';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import NoDataAvailable from 'src/views/general/NoDataAvailable';

interface ObservedAssetsProps {
  onScanClick: (scanId: string) => void;
}

const ObservedAssetsTable: React.FC<ObservedAssetsProps> = ({ onScanClick }) => {
  const [observedAssetsData, setObservedAssetsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItemsAmount, setTotalItemsAmount] = useState<number>(0);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const grey = theme.palette.grey[300];

  const { t } = useTranslation();

  useEffect(() => {
    // Simular la carga de datos estáticos
    const fetchData = () => {
      try {
        setLoading(true);
        const exampleData = [
          {
            id: 1,
            Hostname: 'Asset 1',
            CpuInfo: { CpuUsage: 45 },
            RamInfo: { RamUsagePercentage: 55 },
            Storage: { TotalUsagePercentage: 65 },
            Firewall: 'Running',
            Timestamp: '2023-03-13T12:00:00Z',
          },
          {
            id: 2,
            Hostname: 'Asset 2',
            CpuInfo: { CpuUsage: 25 },
            RamInfo: { RamUsagePercentage: 35 },
            Storage: { TotalUsagePercentage: 45 },
            Firewall: 'Stopped',
            Timestamp: '2023-03-13T12:00:00Z',
          },
          // Agrega más datos de ejemplo según sea necesario
        ];
        setObservedAssetsData(exampleData);
        setTotalItemsAmount(exampleData.length);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(1);
  };

  if (error) {
    return <Box>{error}</Box>;
  }

  if (loading) {
    return (
      <DashboardCard>
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <Loader />
        </Box>
      </DashboardCard>
    );
  }

  if (observedAssetsData.length === 0) {
    return (
      <DashboardCard
        title={t('observability.scans')!}
        subtitle={t('observability.list_of_all_scans')!}
      >
        <EmptyState />
      </DashboardCard>
    );
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
                          color={
                            asset.CpuInfo.CpuUsage < 30
                              ? 'success'
                              : asset.CpuInfo.CpuUsage > 80
                              ? 'primary'
                              : 'warning'
                          }
                        />
                        <Typography variant="subtitle2">{asset.CpuInfo.CpuUsage}%</Typography>
                      </TableCell>
                      <TableCell>
                        <LinearProgress
                          variant="determinate"
                          value={asset.RamInfo.RamUsagePercentage}
                          sx={{
                            width: '80%',
                            height: 10,
                            borderRadius: 5,
                            bgcolor: '#e0e0e0',
                          }}
                          color={
                            asset.RamInfo.RamUsagePercentage < 30
                              ? 'success'
                              : asset.RamInfo.RamUsagePercentage > 80
                              ? 'error'
                              : 'warning'
                          }
                        />
                        <Typography variant="subtitle2">
                          {asset.RamInfo.RamUsagePercentage}%
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <LinearProgress
                          variant="determinate"
                          value={asset.Storage.TotalUsagePercentage}
                          sx={{
                            width: '80%',
                            height: 10,
                            borderRadius: 5,
                            bgcolor: '#e0e0e0',
                          }}
                          color={
                            asset.Storage.TotalUsagePercentage < 30
                              ? 'success'
                              : asset.Storage.TotalUsagePercentage > 80
                              ? 'error'
                              : 'warning'
                          }
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
                      <NoDataAvailable entityType="asset" />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={totalItemsAmount}
            rowsPerPage={pageSize}
            page={page - 1}
            onPageChange={(e, destPage) => handlePageChange(e, destPage)}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </Box>
      </DashboardCard>
    </Box>
  );
};

export default ObservedAssetsTable;