import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { fetchNewsLetterById } from 'src/store/sections/newsletter/NewslettersSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import HumanizedDate from '../shared/HumanizedDate';
import Loader from '../shared/Loader/Loader';

const NewsletterDetail: React.FC<{ newsletterId: any }> = ({ newsletterId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const newsletterDetails = useSelector((state: any) => state.newsLettersReducer.newsletterDetails);
  const [isLoading, setIsLoading] = useState(false);


  React.useEffect(() => {
    const fetchData = async () => {
      if (newsletterId) {
        try {
          setIsLoading(true);
          await dispatch(fetchNewsLetterById(newsletterId));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching newsletter:', error);
        }
      }
    };

    fetchData();
  }, [dispatch, newsletterId]);

  const url= `https://drive.google.com/file/d/${newsletterDetails?.id}/preview`

  return (
    <>
      {isLoading ? (
        <DashboardCard>
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Loader />
          </Box>
        </DashboardCard>

      ) : (
        <DashboardCard
          title={newsletterDetails?.name}
          subtitle={t('newsletter.newsletter_details') || ''}>
          <Box>
            <Grid item xs={12} xl={12}>
              <Box display="flex" flexDirection="column" gap={2} mt={1}>
                <iframe
                  src={url}
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
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('dashboard.name')}
                  </Typography>
                  <Typography variant="body2">{newsletterDetails?.name}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('newsletter.mime_type')}
                  </Typography>
                  <Typography variant="body2">{newsletterDetails?.mimeType}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('newsletter.size')}
                  </Typography>
                  <Typography variant="body2">{Math.round(newsletterDetails?.size / 1024)} KB</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('newsletter.last_modification')}
                  </Typography>
                  <Typography variant="body2"><HumanizedDate dateString={newsletterDetails?.modifiedTime} /></Typography>
                </Box>
              </Box>
            </Grid>
          </Box>
        </DashboardCard>
      )}
    </>
  );
};

export default NewsletterDetail;
