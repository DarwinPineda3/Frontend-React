import {
  Box,
  Chip,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const WPSMainTheme: React.FC = () => {
  const { t } = useTranslation();

  const themeDetails = {
    name: 'hello-theme-child-master',
    location: 'https://prueba-tu-pala.ofertasdepadel.com/wp-content/themes/hello-theme-child-master/',
    lastVersion: 'NA',
    lastUpdate: 'NA',
    description: 'NA',
    author: 'Elementor Team',
    authorUri: 'https://elementor.com/',
    license: 'GNU General Public License v3 or later.',
    licenseUri: 'https://www.gnu.org/licenses/gpl-3.0.html',
    foundBy: 'Urls In Homepage (Passive Detection)',
    confidence: '100%',
  };

  return (

    <DashboardCard title={t('vulnerabilities.scan_details')!}>
      <Box display="flex" flexDirection="column" gap={2} mt={3}>
        <Box>
          <Stack direction="row" spacing={2} mb={1} justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">{t('vulnerabilities.trust')}</Typography>
            </Box>
            <Chip sx={{ backgroundColor: 'primary', color: 'primary', width: 55, height: 24 }} label="12%" />
          </Stack>
          <LinearProgress value={12} variant="determinate" color={'primary'} />
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.name')}:</Typography>
          <Typography variant="body2">{themeDetails.name}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.location')}:</Typography>
          <Typography variant="body2">
            <a href={themeDetails.location} target="_blank" rel="noopener noreferrer">
              {themeDetails.location}
            </a>
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.last_version')}:</Typography>
          <Typography variant="body2">{themeDetails.lastVersion}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.last_update')}:</Typography>
          <Typography variant="body2">{themeDetails.lastUpdate}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.description')}:</Typography>
          <Typography variant="body2">{themeDetails.description}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.author')}:</Typography>
          <Typography variant="body2">{themeDetails.author}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.author_uri')}:</Typography>
          <Typography variant="body2">
            <a href={themeDetails.authorUri} target="_blank" rel="noopener noreferrer">
              {themeDetails.authorUri}
            </a>
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.license')}:</Typography>
          <Typography variant="body2">{themeDetails.license}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.license_uri')}:</Typography>
          <Typography variant="body2">
            <a href={themeDetails.licenseUri} target="_blank" rel="noopener noreferrer">
              {themeDetails.licenseUri}
            </a>
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{t('vulnerabilities.detected_by')}:</Typography>
          <Typography variant="body2">{themeDetails.foundBy}</Typography>
        </Box>
      </Box>
    </DashboardCard>

  );
};

export default WPSMainTheme;
