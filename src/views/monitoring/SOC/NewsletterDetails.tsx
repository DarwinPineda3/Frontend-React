import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchNewsLetterById } from 'src/store/sections/newsletter/NewslettersSlice';

const NewsletterDetail = () => {
  const { newsletterId } = useParams<{ newsletterId?: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const newsletterDetails = useSelector((state: any) => state.newsLettersReducer.newsletterDetails);
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchNewsLetterById(newsletterId));
  }, [dispatch, newsletterId]);

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
          {newsletterDetails && (
            <Typography color="textPrimary">{newsletterDetails.name}</Typography>
          )}
        </Breadcrumbs>
      </Box>
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
    </PageContainer>
  );
};

export default NewsletterDetail;
