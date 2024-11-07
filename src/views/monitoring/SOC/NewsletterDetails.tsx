import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import NewsletterDetail from 'src/components/monitoring/NewsletterDetail';
import { fetchNewsLetterById } from 'src/store/sections/newsletter/NewslettersSlice';

const NewsletterDetails = () => {
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
        <Grid item xs={12} lg={12}>
          <NewsletterDetail newsletterDetails={newsletterDetails} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default NewsletterDetails;
