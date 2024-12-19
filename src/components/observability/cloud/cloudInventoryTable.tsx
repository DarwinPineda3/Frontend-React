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
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import AwsLogo from 'src/assets/images/cloudscans/aws.png';
import AzureLogo from 'src/assets/images/cloudscans/azure.png';
import GcpLogo from 'src/assets/images/cloudscans/gcp.png';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchCloudInventoryList, setPage } from 'src/store/observability/cloud/CloudInventorySlice';

interface CloudScanTableProps {
  onScanClick: (scanId: string) => void;
}

const CloudInventoryTable: React.FC<CloudScanTableProps> = ({ onScanClick }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);


  const cloudInventoryList = useSelector((state: any) => state.cloudInventoryReducer.cloudInventoryList);
  const currentPage = useSelector((state: any) => state.cloudInventoryReducer.page);
  const totalPages = useSelector((state: any) => state.cloudInventoryReducer.totalPages);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };


  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchCloudInventoryList(currentPage));
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage]);

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



  return (
    <DashboardCard
      title={t("vulnerabilities.scans")!}
      subtitle={t("vulnerabilities.list_of_all_scans")!}
      action={
        <IconButton color="primary" onClick={() => navigate('/observability/cloud/create')}>
          <AddIcon />
        </IconButton>
      }>
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
                  {cloudInventoryList.map((scan: any, index: any) => (
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
                        <Typography>{new Date(scan.timestamp).toLocaleString()}</Typography>
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

export default CloudInventoryTable;
