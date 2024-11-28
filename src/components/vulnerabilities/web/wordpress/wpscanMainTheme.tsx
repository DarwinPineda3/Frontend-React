import {
  Box,
  Typography
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const WPSMainTheme: React.FC<{ main_theme: any }> = (main_theme) => {
  const { t } = useTranslation();

  return (

    <DashboardCard title={t('vulnerabilities.scan_details')!}>
      <Box display="flex" flexDirection="column" gap={2} mt={3}>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.name')}:</Typography>
          <Typography variant="body2">{main_theme?.main_theme.slug}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.location')}:</Typography>
          <Typography variant="body2">
            <a href={main_theme?.main_theme.location} target="_blank" rel="noopener noreferrer">
              {main_theme?.main_theme.location}
            </a>
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.last_version')}:</Typography>
          <Typography variant="body2">{main_theme?.main_theme.latest_version}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.last_update')}:</Typography>
          <Typography variant="body2">{main_theme?.main_theme.last_updated}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.description')}:</Typography>
          <Typography variant="body2">{main_theme?.main_theme.description}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.author')}:</Typography>
          <Typography variant="body2">{main_theme?.main_theme.author}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.author_uri')}:</Typography>
          <Typography variant="body2">
            <a href={main_theme?.main_theme.author_uri} target="_blank" rel="noopener noreferrer">
              {main_theme?.main_theme.author_uri}
            </a>
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.license')}:</Typography>
          <Typography variant="body2">{main_theme?.main_theme.license}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.license_uri')}:</Typography>
          <Typography variant="body2">
            <a href={main_theme?.main_theme.license_uri} target="_blank" rel="noopener noreferrer">
              {main_theme?.main_theme.license_uri}
            </a>
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.detected_by')}:</Typography>
          <Typography variant="body2">{main_theme?.main_theme.found_by}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>Confidence</Typography>
          <Typography variant="body2">{main_theme?.main_theme.confidence}%</Typography>
        </Box>
      </Box>
    </DashboardCard>

  );
};

export default WPSMainTheme;
