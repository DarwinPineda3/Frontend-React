import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import NewsletterDetail from 'src/components/monitoring/NewsletterDetail';
import Loader from 'src/components/shared/Loader/Loader';
import { useDispatch } from 'src/store/Store';

const NewsletterDetails = () => {
  const { newsletterId } = useParams<{ newsletterId?: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          {newsletterId && (
            <Typography color="textPrimary">Newsletter detail</Typography>
          )}
        </Breadcrumbs>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={12}>
          {!newsletterId ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
              <Loader />
            </Box>
          ) : (
            <NewsletterDetail newsletterId={newsletterId} />
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default NewsletterDetails;
