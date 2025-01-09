import { ArrowBack } from '@mui/icons-material';
import { Box, Breadcrumbs, Grid, Typography, Card, CardContent, IconButton, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';

const ComplianceExecutionsView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageContainer title={String(t('compliance_menu.compliance_executions'))}>
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBack />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/compliance/executions">
              {t('compliance_menu.compliance')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/compliance/executions">
              {t('compliance_menu.compliance_executions')}
            </Link>
          </Breadcrumbs>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {t('compliance.executions_description')}
              </Typography>

              <Typography variant="body1">
                {t('compliance.executions_info')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ComplianceExecutionsView;
