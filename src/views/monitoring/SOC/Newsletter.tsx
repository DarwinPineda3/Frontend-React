import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import NewsLettersList from 'src/components/monitoring/NewsletterList';

const Newsletter = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNewsLetterClick = (id: string) => {
    navigate(`/monitoring/soc/newsletters/${id}`);
  };

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
          <Typography color="textPrimary">{t('newsletter.newsletters')}</Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <NewsLettersList onNewsLetterClick={handleNewsLetterClick} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Newsletter;
