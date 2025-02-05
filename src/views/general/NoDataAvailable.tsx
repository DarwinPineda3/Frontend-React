import React from 'react';
import { Typography, Link, Grid} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface NoDataAvailableProps {
  entityType: string; 
  formData?: { url: string; [key: string]: any };  
  urlParams?: Record<string, string>; 
}
const NoDataAvailable: React.FC<NoDataAvailableProps> = ({ entityType, formData, urlParams }) => {
  const { t } = useTranslation();

  const translatedEntityType = t(`entity_types.${entityType}`, { defaultValue: entityType });

  const generateUrlWithParams = (url: string, params?: Record<string, string>) => {
    if (!params) return url;

    const urlParams = new URLSearchParams(params);
    return `${url}?${urlParams.toString()}`;
  };

  const getFormUrl = () => {
    if (formData) {
      const { url, ...otherData } = formData;
      
      if (otherData) {
        const additionalParams = Object.entries(otherData).reduce((acc, [key, value]) => {
          if (typeof value === 'string') {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, string>);

        const combinedParams = { ...additionalParams, ...urlParams };
        return generateUrlWithParams(url, combinedParams); 
      }
      
      return url; 
    }
    return ''; 
  };

  return (
    <Grid
      container
      alignItems="center"
      direction="column" 
    >
      <Grid item>
        <Typography variant="inherit" sx={{ marginBottom: '8px', marginTop: '16px' }}>
          {t('dashboard.no_data')}
        </Typography>

        {formData && formData.url && (
          <Link href={getFormUrl()} variant="body2" sx={{ marginTop: '8px' }}>
            {t('no_data_available.create_new', { entityType: translatedEntityType })}
          </Link>
        )}
      </Grid>
    </Grid>
  );
};

export default NoDataAvailable;
