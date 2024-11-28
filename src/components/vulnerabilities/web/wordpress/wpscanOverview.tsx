import {
  Box,
  Grid,
  Typography
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const WPSOverview: React.FC<{ overviewdata: any }> = ({ overviewdata }) => {
  const { t } = useTranslation();

  const version = {
    number: "6.4.5",
    release_date: "2024-06-24",
    status: "outdated",
    found_by: "Rss Generator (Passive Detection)",
    confidence: 100,
    interesting_entries: []
  }

  return (

    <>
      <Grid mt={2} sx={{ p: 0 }}>
        <DashboardCard title={t('vulnerabilities.scan_details')!}>
          <Box display="flex" flexDirection="column" gap={2} mt={3}>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>Target url</Typography>
              <Typography variant="body2">{overviewdata?.target_url}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>Effective url</Typography>
              <Typography variant="body2">{overviewdata?.effective_url}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>Target ip</Typography>
              <Typography variant="body2">{overviewdata?.target_ip}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>Start time</Typography>
              <Typography variant="body2">{overviewdata?.start_time}</Typography>
            </Box>
          </Box>

        </DashboardCard>
      </Grid>
      <Grid mt={2} sx={{ p: 0 }}>
        <DashboardCard title='Version'>
          <Box display="flex" flexDirection="column" gap={2} mt={3} >
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>Version</Typography>
              <Typography variant="body2">{overviewdata?.version?.number}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>Release date</Typography>
              <Typography variant="body2">{overviewdata?.version?.release_date}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>Status</Typography>
              <Typography variant="body2">{overviewdata?.version?.status}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>Confidence</Typography>
              <Typography variant="body2">{overviewdata?.version?.confidence}%</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>Found by:</Typography>
              <Typography variant="body2">{overviewdata?.version?.found_by}</Typography>
            </Box>
          </Box>

        </DashboardCard>
      </Grid>


    </>

  );
};

export default WPSOverview;
