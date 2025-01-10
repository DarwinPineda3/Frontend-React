import {
  Box,
  Grid,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const paginated = 10;

const GiottoProjectManagersList: React.FC<{ managers: any[] }> = ({ managers }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(managers?.length / paginated);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const managersPaginated = managers?.slice((currentPage - 1) * paginated, currentPage * paginated);

  return (
    <DashboardCard title={t('compliance_projects.project_managers_title')!}>
      <>
        {managers?.length > 0 ? (
          <Box>
            <Table aria-label="managers version table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('compliance_projects.project_manager_username')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('compliance_projects.project_manager_full_name')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('compliance_projects.project_manager_email')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {managersPaginated?.map((manager, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body2">{manager.userName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2">{manager?.fullName}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2">{manager?.email}</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">{t('compliance_projects.no_data_available')}</Typography>
            </Grid>
          </Grid>
        )}
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

export default GiottoProjectManagersList;
