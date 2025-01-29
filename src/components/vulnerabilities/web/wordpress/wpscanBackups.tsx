import {
  Grid,
  Link,
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

const WPSBackups: React.FC<{ backups: any[] }> = ({ backups }) => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const paginatedItems = (backups || []).slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <DashboardCard title={t('wpscan.backups')!}>
      <>
        {backups?.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('wpscan.url')}</TableCell>
                  <TableCell>{t('wpscan.found_by')}</TableCell>
                  <TableCell>{t('wpscan.confidence')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems?.map((backup?, index?) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
                        <Link href={backup?.name} target="_blank" rel="noopener">
                          {backup?.name}
                        </Link>
                      </Typography>
                    </TableCell>
                    <TableCell><Typography variant="body2">{backup?.found_by}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{backup?.confidence}%</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={(backups || []).length}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">{t('wpscan.no_data_available')}</Typography>
            </Grid>
          </Grid>
        )
        }

      </>
    </DashboardCard>
  );
};

export default WPSBackups;
