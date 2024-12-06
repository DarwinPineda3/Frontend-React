import {
  Box,
  Grid,
  Link,
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

const WPSBackups: React.FC<{ backups: any[], scanId: any }> = ({ backups, scanId }) => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(backups?.length / rowsPerPage);

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
  };

  const currentData = backups?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);


  return (
    <DashboardCard title={t('wpscan.backups')!}>
      <>
        {backups?.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.url')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.found_by')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight={600}>{t('wpscan.confidence')}</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData?.map((backup?, index?) => (
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
          </TableContainer>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">{t('wpscan.no_data_available')}</Typography>
            </Grid>
          </Grid>
        )
        }
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

export default WPSBackups;
