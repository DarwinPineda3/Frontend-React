import React from 'react';
import { Typography, Link, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface NoDataAvailableProps {
  entityType: string;
  formData?: { url: string; [key: string]: any };
}

const NoDataAvailable: React.FC<NoDataAvailableProps> = ({ entityType, formData }) => {
  const { t } = useTranslation();

  const translatedEntityType = t(`entity_types.${entityType}`, { defaultValue: entityType });

  const getTranslationKey = (entityType: string) => {
    const genderSpecificEntities = ['template', 'execution', 'vulnerability', 'backup'];

    return genderSpecificEntities.includes(entityType)
      ? 'no_data_available.create_new_specific_entity'
      : 'no_data_available.create_new';
  };

  const translationKey = getTranslationKey(entityType);
  const getFormUrl = () => {
    if (formData && formData.url) {
      return formData.url;
    }
    return '';
  };

  return (
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <Typography variant="inherit" sx={{ marginBottom: '8px', marginTop: '16px' }}>
          {t('dashboard.no_data')}
        </Typography>

        {formData && formData.url && (
          <Link href={getFormUrl()} variant="body2" sx={{ marginTop: '8px' }}>
            {t(translationKey, { entityType: translatedEntityType })}
          </Link>
        )}
      </Grid>
    </Grid>
  );
};

export default NoDataAvailable;
