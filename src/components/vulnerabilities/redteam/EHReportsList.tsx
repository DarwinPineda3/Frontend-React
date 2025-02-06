import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchEHReports, setPage } from 'src/store/vulnerabilities/redteam/EHReportSlice';
import NoDataAvailable from 'src/views/general/NoDataAvailable';

interface EHReportTableListProps {
  onEHReportClick: (ehReportId: string) => void;
}

const EHReportList: React.FC<EHReportTableListProps> = ({ onEHReportClick }) => {
  const dispatch = useDispatch();
  const ehReports = useSelector((state: any) => state.ehReportsReducer.ehReports);
  const currentPage = useSelector((state: any) => state.ehReportsReducer.page);
  const totalPages = useSelector((state: any) => state.ehReportsReducer.totalPages);
  const pageSize = useSelector((state: any) => state.cloudInventoryReducer.pageSize);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchEHReports(currentPage, pageSize));
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  return (
    <DashboardCard title={t('redteam.ethical_hacking_reports') || ''}>

      <Box>
        <TableContainer>
          <Table aria-label="ehReport table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>{t('redteam.name')}</TableCell>
                <TableCell>{t('redteam.start_date')}</TableCell>
                <TableCell>{t('redteam.end_date')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                      <Loader />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                ehReports.length > 0 ? (
                  ehReports.map((ehReport: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          color="primary"
                          component="a"
                          onClick={() => onEHReportClick(ehReport.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          {ehReport.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={400}>{ehReport.start_date_report}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={400}>{ehReport.end_date_report}</Typography>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                     <NoDataAvailable entityType="report"/>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={totalPages * pageSize}
          rowsPerPage={pageSize}
          page={currentPage - 1}
          onPageChange={(e: any, destPage: any) => handlePageChange(e, destPage + 1)}
          onRowsPerPageChange={(e: any) => dispatch(fetchEHReports(currentPage, e.target.value))}
        />
      </Box>
    </DashboardCard>
  );
};
export default EHReportList;
