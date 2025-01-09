import { Box, Grid, Pagination, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import GiottoProjectGroupsAccordion from './giottoProjectGroupsAccordion';

const paginated = 10;

const GiottoProjecGroupsList: React.FC<{ groups: any[] }> = ({ groups }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(groups?.length / paginated);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardCard title={t('compliance_projects.project_group_title')!}>
      <>
        {groups?.length > 0 ? (
          <Grid item xs={12} key="group projects">
            {groups?.map((group) => (
              <GiottoProjectGroupsAccordion group={group} />
            ))}
          </Grid>
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

export default GiottoProjecGroupsList;
