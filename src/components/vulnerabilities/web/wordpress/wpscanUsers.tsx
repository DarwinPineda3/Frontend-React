import {
  Grid,
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

const WPSUsers: React.FC<{ users: any }> = ({ users }) => {
  const { t } = useTranslation();

  const usersArray = users ? Object.entries(users).map(([key, value]) => ({
    key,
    ...value,
  })) : [];

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const paginatedItems = usersArray.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <DashboardCard title={t('wpscan.users_tittle')!}>
      <>
        {usersArray.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('wpscan.username')}</TableCell>
                  <TableCell>{t('wpscan.id')}</TableCell>
                  <TableCell>{t('wpscan.confidence')}</TableCell>
                  <TableCell>{t('wpscan.confirmed_by')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.map((user: any, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
                        {user.key}
                      </Typography>
                    </TableCell>
                    <TableCell><Typography variant="body2">{user.id ?? 'N/A'}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{user.confidence}%</Typography></TableCell>
                    <TableCell>
                      {user.confirmed_by && Object.keys(user.confirmed_by).length > 0 ? (
                        <ul style={{ paddingLeft: '16px', margin: '0' }}>
                          {Object.entries(user.confirmed_by).map(([source, details], idx) => (
                            <li key={idx}>
                              <Typography variant="body2">
                                {source}
                              </Typography>
                              <Typography variant="body2">
                                {t('wpscan.confidence')}: {details?.confidence}%
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Typography variant="body2">{t('wpscan.no_data_available')}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={usersArray.length}
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
        )}
        
      </>
    </DashboardCard>
  );
};

export default WPSUsers;
