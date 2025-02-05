import { ArrowBack } from '@mui/icons-material';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import GiottoProjectsList from 'src/components/compliance/giotto-projects/giottoProjectsList';
import PageContainer from 'src/components/container/PageContainer';

const CompliancProjectsView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageContainer title={String(t('compliance_menu.compliance_projects'))}>
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBack />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/compliance/projects">
              {t('compliance_menu.compliance')}
            </Link>
            <Typography color="textPrimary">{t('compliance_menu.compliance_projects')}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <GiottoProjectsList />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CompliancProjectsView;
