import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { Data } from 'src/types/newsletters/newsletter';
import Loader from '../shared/Loader/Loader';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchFileContent } from 'src/store/sections/newsletter/NewslettersSlice';

const NewsletterDetail: React.FC<{ newsletterDetails: Data }> = ({ newsletterDetails }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fileContent = useSelector((state) => state.newsLettersReducer.fileContent);

    React.useEffect(() => {
      const fetchData = async () => {
        if (newsletterDetails.id) {
          try {
            await dispatch(fetchFileContent(newsletterDetails.id));
          } catch (error) {
            console.error('Error fetching newsletter:', error);
          }
        }
      };
  
      fetchData();
    }, [dispatch, newsletterDetails.id]);
    
 
  return (
    <DashboardCard
    title={newsletterDetails.name}
    subtitle={t('newsletter.newsletter_details')}
  >
    <Box>
      <Grid item xs={12} xl={12}>
        {fileContent ? (
          <iframe
            src={fileContent}
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
          <Typography variant="body2">{newsletterDetails.modifiedTime}</Typography>
        </Box>
      </Box>
    </Box>
  </DashboardCard>
  );
};

export default NewsletterDetail;
