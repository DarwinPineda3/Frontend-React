import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';

const GiottoAssetsList: React.FC<{ assets: any[] }> = ({ assets = [] }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginatedAssets = assets.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <DashboardCard title={t('giotto.groups.assets')!}>
      <>
        {assets.length > 0 ? (
          <Box>
            <Table aria-label="asset version table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('giotto.groups.name')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('giotto.groups.network_address')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('giotto.groups.last_keep_alive')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedAssets.map((asset, index) => (
                  <TableRow key={asset.id || index}>
                    <TableCell>
                      <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
                        {asset.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2">{asset.networkAddress}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {asset.lastKeepAlive ? (
                          <HumanizedDate dateString={new Date(asset.lastKeepAlive).toISOString()} />
                        ) : (
                          t('giotto.groups.no_data_available')
                        )}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <Typography variant="h6">{t('giotto.groups.no_data_available')}</Typography>
        )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={assets.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    </DashboardCard>
  );
};

export default GiottoAssetsList;
