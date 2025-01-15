import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const GiottoTemplateControlsList: React.FC<{ groups: any[] }> = ({ groups }) => {
  const { t } = useTranslation();

  return (
    <DashboardCard title={t('compliance_tempaltes.project_group_title')!}>
      <>
        {groups?.length > 0 ? (
          <Grid item xs={12} key="group projects">
            {groups?.map((group) => (
              // <GiottoProjectGroupsAccordion group={group} />
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">{t('compliance_tempaltes.no_data_available')}</Typography>
            </Grid>
          </Grid>
        )}
      </>
    </DashboardCard>
  );
};

export default GiottoTemplateControlsList;