import { ArrowBack } from '@mui/icons-material';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import ScansTable from '../../components/configuration/ScanTable';

const ScheduledScans: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBack />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/configuration/scheduled-scans">
              {t('menu.configuration')}
            </Link>
            <Typography color="textPrimary">{t('menu.scheduled_scans')}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ScansTable searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ScheduledScans;
