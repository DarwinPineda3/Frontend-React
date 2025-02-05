import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import GiottoTemplateControlsAccordion from './giottoTemplateControlsAccordion';

const GiottoTemplateControlsList: React.FC<{ groupsControl: any }> = ({ groupsControl }) => {
  const { t } = useTranslation();
  return (
    <DashboardCard title={t('compliance_templates.template_controls_title')!}>
      <>
        {groupsControl ? (
          <Grid item xs={12} key="template controls">
            {Object.entries(groupsControl).map(([groupName, controls]: any) => (
              <GiottoTemplateControlsAccordion groupName={groupName} controls={controls} />
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6"> {t('compliance_templates.no_data_available')} </Typography>
            </Grid>
          </Grid>
        )}
      </>
    </DashboardCard>
  );
};

export default GiottoTemplateControlsList;
