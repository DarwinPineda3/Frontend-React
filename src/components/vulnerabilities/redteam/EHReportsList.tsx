import {
  Box,
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
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchEHReports, setPage } from "src/store/vulnerabilities/redteam/EthicalHackingReportSlice";

interface EHReportTableListProps {
  onEHReportClick: (ehReportId: string) => void;
}

const EHReportList: React.FC<EHReportTableListProps> = ({ onEHReportClick }) => {
  const dispatch = useDispatch();
  const ehReports = useSelector((state: any) => state.ehReportsReducer.ehReports);
  const currentPage = useSelector((state: any) => state.ehReportsReducer.page);
  const totalPages = useSelector((state: any) => state.ehReportsReducer.totalPages);
  const [snackbarName, setSnackbarName] = useState('');
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(fetchEHReports(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };

  return (
    <DashboardCard
      title={t("redteam.ethical_hacking_reports")}
    >
      <Box>
        <TableContainer>
          <Table aria-label="ehReport table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("redteam.name")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("redteam.start_date")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("redteam.end_date")}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ehReports.map((ehReport: any, index: number) => (
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
                    <Typography fontWeight={400}>
                      {ehReport.start_date_report}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={400}>
                      {ehReport.end_date_report}
                    </Typography>
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
  );
};
export default EHReportList;