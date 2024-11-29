import React from 'react';
import { Box, Breadcrumbs, Grid, IconButton, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import ThresholdForm from 'src/components/observability/thresholdform/ThresholdForm';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 

const ThresholdSettings: React.FC = () => {
  const { t } = useTranslation();  
  const navigate = useNavigate();
  const { settingsId } = useParams<{ settingsId?: string }>();

  const handleBack = () => {
    navigate(-1);
  };

  const handleFormSubmit = (data: { cpuThreshold: number; ramThreshold: number; storageThreshold: number; userEmail: string }) => {
    alert(`Cambios guardados:\nCPU: ${data.cpuThreshold}%\nRAM: ${data.ramThreshold}%\nSTORAGE: ${data.storageThreshold}%\nEmail: ${data.userEmail}`);
  };

  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={handleBack} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/observability/threshold-settings">
              {t('breadcrumb.observability')}  
            </Link>
            <Link component={RouterLink} color="inherit" to="/observability/threshold-settings">
              {t('breadcrumb.threshold_settings')}  
            </Link>
            {settingsId && (
              <Link component={RouterLink} color="inherit" to={`/observability/threshold-settings/${settingsId}`}>
                {t('breadcrumb.threshold_details')} 
              </Link>
            )}
          </Breadcrumbs>
        </Box>
      </Box>

      <Grid item xs={12}>
        <ThresholdForm onSubmit={handleFormSubmit} />
      </Grid>
    </PageContainer>
  );
};

export default ThresholdSettings;
