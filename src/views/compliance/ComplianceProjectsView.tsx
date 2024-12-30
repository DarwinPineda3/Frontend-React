import { ArrowBack } from '@mui/icons-material';
import { Box, Breadcrumbs, Grid, Typography, Card, CardContent, IconButton, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';

const ComplianceProjectsView = () => {
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
            <Link component={RouterLink} color="inherit" to="/compliance/projects">
              {t('compliance_menu.compliance_projects')}
            </Link>
          </Breadcrumbs>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {t('compliance.projects_description')}
              </Typography>

              <Typography variant="body1">
                {t('compliance.projects_info')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ComplianceProjectsView;
