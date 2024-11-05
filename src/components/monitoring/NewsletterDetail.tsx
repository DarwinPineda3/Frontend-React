import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { Data } from 'src/types/newsletters/newsletter';
import Loader from '../shared/Loader/Loader';

const NewsletterDetail: React.FC<{ newsletterDetails: Data }> = ({ newsletterDetails }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1}>
      {!newsletterDetails ? (
        <Loader />
      ) : (
        <>
          <Grid item xs={12} xl={12}>
            <iframe
              src={newsletterDetails.url}
              style={{
                overflow: 'hidden',
                height: 'calc(100vh - 20px)',
                width: '100%',
                border: 'none',
                display: 'block',
                position: 'relative',
              }}
              allow="fullscreen"
              seamless={true}
            />
          </Grid>
          <DashboardCard
            title={t('newsletter.details')}
            subtitle={t('newsletter.newsletter_details')}
          >
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
                <Typography variant="body2">{newsletterDetails.modifiedTime}</Typography>
              </Box>
            </Box>
          </DashboardCard>
        </>
      )}
    </Grid>
  );
};

export default NewsletterDetail;
