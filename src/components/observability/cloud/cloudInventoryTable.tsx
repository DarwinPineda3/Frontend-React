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
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import AwsLogo from 'src/assets/images/cloudscans/aws.png';
import AzureLogo from 'src/assets/images/cloudscans/azure.png';
import GcpLogo from 'src/assets/images/cloudscans/gcp.png';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import NoDataAvailable from 'src/views/general/NoDataAvailable';

interface CloudScanTableProps {
  onScanClick: (scanId: string) => void;
}

const CloudInventoryTable: React.FC<CloudScanTableProps> = ({ onScanClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cloudInventoryList, setCloudInventoryList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [pageSize, setPageSize] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular la carga de datos estáticos
    const fetchData = () => {
      setIsLoading(true);
      try {
        const exampleData = [
          {
            id: '1',
            provider: 'AWS',
            cloud_id: 'aws-123',
            timestamp: '2023-03-13T12:00:00Z',
          },
          {
            id: '2',
            provider: 'Azure',
            cloud_id: 'azure-456',
            timestamp: '2023-03-12T12:00:00Z',
          },
          {
            id: '3',
            provider: 'GCP',
            cloud_id: 'gcp-789',
            timestamp: '2023-03-11T12:00:00Z',
          },
          // Agrega más datos de ejemplo según sea necesario
        ];
        setCloudInventoryList(exampleData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number,
  ) => {
    const newPage = page + 1;
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newPageSize = event.target.value as number;
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const getProviderIcon = (provider: string) => {
    switch (provider?.toLowerCase()) {
      case 'aws':
        return <img src={AwsLogo} alt="AWS" style={{ width: 24, height: 24 }} />;
      case 'azure':
        return <img src={AzureLogo} alt="Azure" style={{ width: 24, height: 24 }} />;
      case 'gcp':
        return <img src={GcpLogo} alt="GCP" style={{ width: 24, height: 24 }} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <DashboardCard>
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <Loader></Loader>
        </Box>
      </DashboardCard>
    );
  }

  if (error) {
    return (
      <DashboardCard>
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <Typography color="error" variant="h6">
            {t('dashboard.errorMessage')}
          </Typography>
        </Box>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard
      title={t('vulnerabilities.scans')!}
      subtitle={t('vulnerabilities.list_of_all_scans')!}
      action={
        <IconButton color="primary" onClick={() => navigate('/observability/cloud/create')}>
          <AddIcon />
        </IconButton>
      }
    >
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
                        {t('vulnerabilities.provider')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('vulnerabilities.cloud_id')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('vulnerabilities.date')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cloudInventoryList.length > 0 ? (
                    cloudInventoryList.map((scan: any, index: any) => (
                      <TableRow key={scan.id || `scan-${index}`}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {getProviderIcon(scan.provider)}
                            <Typography variant="body2" style={{ marginLeft: '8px' }}>
                              ({scan.provider})
                            </Typography>
                          </Box>
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
                          <Typography>
                            <HumanizedDate dateString={scan.timestamp} />
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                       <NoDataAvailable 
                         entityType="scan"
                         formUrl='/observability/cloud/create'
                       />
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
              page={currentPage - 1}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handlePageSizeChange}
            />
          </>
        )}
      </>
    </DashboardCard>
  );
};

export default CloudInventoryTable;