import {
  Box,
  Grid,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';


const paginated = 10;

const GiottoAssetsList: React.FC<{ assets: any[] }> = ({ assets }) => {

  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(assets?.length / paginated);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const assetsPaginated = assets?.slice(
    (currentPage - 1) * paginated,
    currentPage * paginated
  );

  return (
    <DashboardCard title={t('giotto.group.assets')!}>
      <>
        {assets?.length > 0 ? (
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
                {assetsPaginated?.map((asset, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
                        {asset.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2">{asset?.networkAddress}</Typography>

                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        <HumanizedDate dateString={new Date(asset?.lastKeepAlive).toISOString()} />
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">{t('wpscan.no_data_available')}</Typography>
            </Grid>
          </Grid>
        )
        }
        <Box my={3} display="flex" justifyContent="center">
          {totalPages > 0 && (
            <Pagination
              count={totalPages}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          )}
        </Box>
      </>
    </DashboardCard>
  );
};

export default GiottoAssetsList;
