import { ArrowBack } from '@mui/icons-material';
import {
  Alert,
  Box,
  Breadcrumbs,
  Grid,
  IconButton,
  Link,
  Snackbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import GiottoBaseTemplatesTable from 'src/components/compliance/giotto-templates/giottoBaseTemplatesTable';
import GiottoCustomTemplatesTable from 'src/components/compliance/giotto-templates/giottoCustomTemplateTable';
import PageContainer from 'src/components/container/PageContainer';

const TemplateListPage = () => {
  const [isLoadingBase, setIsLoadingBase] = useState(false);
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success');

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDownloadBase = () => {
    setIsLoadingBase(true);
    setTimeout(() => {
      setIsLoadingBase(false);
      setSnackbarMessage(String(t('snackbar.reportGenerated')));
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    }, 2000);
  };

  const handleDownloadCustom = () => {
    setIsLoadingCustom(true);
    setTimeout(() => {
      setIsLoadingCustom(false);
      setSnackbarMessage(String(t('snackbar.reportGenerated')));
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    }, 2000);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <PageContainer title="Darwin's project">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBack />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/compliance/templates">
              {t('breadcrumbs.compliance')}
            </Link>
            <Typography>{t('breadcrumbs.templates')}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <GiottoBaseTemplatesTable handleDownload={handleDownloadBase} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <GiottoCustomTemplatesTable handleDownload={handleDownloadCustom} />
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default TemplateListPage;
