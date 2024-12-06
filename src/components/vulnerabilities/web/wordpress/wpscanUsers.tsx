import {
  Box,
  Grid,
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

const WPSUsers: React.FC<{ users: any }> = ({ users}) => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const usersArray = users ? Object.entries(users).map(([key, value]) => ({
    key,
    ...value,
  })) : [];

  const totalPages = Math.ceil(usersArray.length / rowsPerPage);

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
  };

  const currentData = usersArray.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <DashboardCard title={t('wpscan.users_tittle')!}>
      <>
        {usersArray.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.username')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.id')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.confidence')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.confirmed_by')}</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.map((user, index) => (
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
          </TableContainer>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">{t('wpscan.no_data_available')}</Typography>
            </Grid>
          </Grid>
        )}
        <Box my={3} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </>
    </DashboardCard>
  );
};

export default WPSUsers;
