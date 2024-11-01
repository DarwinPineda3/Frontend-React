import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import NewsLetterDetail from 'src/components/monitoring/NewsletterDetail';
import NewsLettersList from 'src/components/monitoring/NewsletterList';

const Newsletter = () => {
  const { newsletterId } = useParams<{ newsletterId?: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedNewsletterName, setSelectedNewsletterName] = useState<string | null>(null);

  const handleNewsLetterClick = (id: string, name: string) => {
    setSelectedNewsletterName(name);
    navigate(`/monitoring/soc/newsletters/${id}`);
  };

  // TODO obtener todo el objeto
  if (newsletterId) {
    // return <NewsLetterDetail newsletterId={newsletterId} />;
  }

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
          {newsletterId && <Typography color="textPrimary">{selectedNewsletterName}</Typography>}
        </Breadcrumbs>
      </Box>
      {newsletterId ? (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <NewsLetterDetail newsletterId={newsletterId!} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <NewsLettersList onNewsLetterClick={handleNewsLetterClick} />
          </Grid>
        </Grid>
      )}
    </PageContainer>
  );
};

export default Newsletter;
