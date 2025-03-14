import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import ParameterList from 'src/components/home/monitoring/cyber-guard/parameters/ParameterList';

const Parameters = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <PageContainer title="Darwin's project">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard/parameters">
              {t('monitoring.monitoring')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard/parameters">
              {t('monitoring.cyber_guard')}
            </Link>
            <Typography color="textPrimary">{t('monitoring.parameters')}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ParameterList />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Parameters;
