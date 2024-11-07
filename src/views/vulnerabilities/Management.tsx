import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import ManagedVulnerabilitiesList from 'src/components/vulnerabilities/management/managedVulnerabilityList';

const ManagedVulnerabilities = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/vulnerabilities/management">
              {t('vulnerabilities.management.vulnerabilities')}
            </Link>
            <Typography color="textPrimary">
              {t('vulnerabilities.management.management')}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ManagedVulnerabilitiesList />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ManagedVulnerabilities;
