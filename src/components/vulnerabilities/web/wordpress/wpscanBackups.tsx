import {
  Box,
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
import NoDataAvailable from 'src/views/general/NoDataAvailable';

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
    <Box mb={2}>
      <Typography variant="h6" fontWeight="bold">
      </Typography>
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
            {backups?.length > 0 ? (
              paginatedItems?.map((backup, index) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <NoDataAvailable entityType="Backup" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {backups?.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={backups.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>
    </Box>
  );
};

export default WPSBackups;
