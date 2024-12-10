import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchNewsLetterById } from 'src/store/sections/newsletter/NewslettersSlice';
import { useDispatch, useSelector } from 'src/store/Store';

const NewsletterDetails = () => {
  const { newsletterId } = useParams<{ newsletterId?: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const newsletterDetails = useSelector((state: any) => state.newsLettersReducer.newsletterDetails);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
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

  const url = `https://drive.google.com/file/d/${newsletterId}/preview`

  return (
      <PageContainer title="Akila">
        <Box display="flex" alignItems="center" mt={2}>
            <IconButton onClick={() => navigate(-1)} color="primary">
              <ArrowBackIcon />
            </IconButton>
            <Breadcrumbs aria-label="breadcrumb">
              <Link component={RouterLink} color="inherit" to="/monitoring/soc/newsletters">
                {t('menu.monitoring')}
              </Link>
              {newsletterId ? (
                <Link component={RouterLink} color="inherit" to="/monitoring/soc/newsletters">
                  {t('newsletter.newsletters')}
                </Link>
              ) : (
                <Typography color="textPrimary">{t('newsletter.newsletters')}</Typography>
              )}
              {!isLoading && (
                <Typography color="textPrimary">{newsletterDetails?.name}</Typography>
              )}
            </Breadcrumbs>
          </Box>
        {isLoading ? (
          <DashboardCard>
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
              <Loader />
            </Box>
          </DashboardCard>

        ) : (
          <>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={12}>
              {!newsletterId ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                  <Loader />
                </Box>
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
                          <Typography variant="body2">{newsletterDetails?.modifiedTime}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Box>
                </DashboardCard>
              )}
            </Grid>
          </Grid>
          </>
        )}
      </PageContainer>
  );
};

export default NewsletterDetails;
