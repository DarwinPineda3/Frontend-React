import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const WPSOverview: React.FC<{ overviewdata: any }> = ({ overviewdata }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}> 
        <DashboardCard title={t('vulnerabilities.scan_details')!}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('wpscan.target_url')}</Typography>
              <Typography variant="body2">{overviewdata?.target_url}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('wpscan.effective_url')}</Typography>
              <Typography variant="body2">{overviewdata?.effective_url}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('wpscan.target_ip')}</Typography>
              <Typography variant="body2">{overviewdata?.target_ip}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('wpscan.start_time')}</Typography>
              <Typography variant="body2">{overviewdata?.start_time}</Typography>
            </Box>
          </Box>
        </DashboardCard>
      </Grid>
      
      <Grid item xs={12} lg={6}>
        <DashboardCard title="Version">
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('wpscan.version')}</Typography>
              <Typography variant="body2">{overviewdata?.version?.number}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('wpscan.release_date')}</Typography>
              <Typography variant="body2">{overviewdata?.version?.release_date}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('wpscan.status')}</Typography>
              <Typography variant="body2">{overviewdata?.version?.status}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('wpscan.confidence')}</Typography>
              <Typography variant="body2">{overviewdata?.version?.confidence}%</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{t('wpscan.found_by')}</Typography>
              <Typography variant="body2">{overviewdata?.version?.found_by}</Typography>
            </Box>
          </Box>
        </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default WPSOverview;
