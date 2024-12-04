import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { Data } from 'src/types/newsletters/newsletter';
import Loader from '../shared/Loader/Loader';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchFileContent } from 'src/store/sections/newsletter/NewslettersSlice';
import HumanizedDate from '../shared/HumanizedDate';

const NewsletterDetail: React.FC<{ newsletterDetails: Data}> = ({ newsletterDetails }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
 
  return (
    <DashboardCard
    title={newsletterDetails?.name}
    subtitle={t('newsletter.newsletter_details')}
  >
    <Box>
      <Grid item xs={12} xl={12}>
        {/* {newsletterDetails.content ? ( */}
        {newsletterDetails ? (
          <iframe
            // src={newsletterDetails.content}
            src={`https://drive.google.com/file/d/${newsletterDetails.id}/preview`}
            style={{
              overflow: 'hidden',
              height: 'calc(100vh - 20px)',
              width: '100%',
              border: 'none',
              display: 'block',
              position: 'relative',
            }}
            allow="fullscreen"
            seamless
          />
        ) : (
          <Loader />
        )}
      </Grid>

      <Box display="flex" flexDirection="column" gap={2} mt={1}>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            {t('dashboard.name')}
          </Typography>
          <Typography variant="body2">{newsletterDetails.name}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            {t('newsletter.mime_type')}
          </Typography>
          <Typography variant="body2">{newsletterDetails.mimeType}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            {t('newsletter.size')}
          </Typography>
          <Typography variant="body2">{newsletterDetails.size}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            {t('newsletter.last_modification')}
          </Typography>
          <Typography variant="body2"><HumanizedDate dateString={newsletterDetails.modifiedTime} /></Typography>
        </Box>
      </Box>
    </Box>
  </DashboardCard>
  );
};

export default NewsletterDetail;
