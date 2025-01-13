import { ArrowBack } from '@mui/icons-material';
import {
  Alert,
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Link,
  Pagination,
  Snackbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import BaseTemplateTable from 'src/components/template/BaseTemplateTable';
import CustomTemplateTable from 'src/components/template/CustomTemplateTable';

const TemplateListPage = () => {
  const [isLoadingBase, setIsLoadingBase] = useState(false);
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success');

  const [basePage, setBasePage] = useState(1);
  const [customPage, setCustomPage] = useState(1);

  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const handleBasePageChange = (_: any, newPage: number) => {
    setBasePage(newPage);
  };

  const handleCustomPageChange = (_: any, newPage: number) => {
    setCustomPage(newPage);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <PageContainer title="Akila">
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
          <Card>
            <CardHeader
              title={<Typography variant="h6">{t('templates.baseTemplates')}</Typography>}
              subheader={
                <Typography variant="body2" color="textSecondary">
                  {t('templates.baseTemplates') + ' ' + t('templates.template')}
                </Typography>
              }
              sx={{ backgroundColor: 'success.main', color: 'white' }}
            />
            <CardContent>
              <BaseTemplateTable isLoading={isLoadingBase} handleDownload={handleDownloadBase} />
              <Pagination
                count={3}
                color="primary"
                page={basePage}
                onChange={handleBasePageChange}
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<Typography variant="h6">{t('templates.customTemplates')}</Typography>}
              subheader={
                <Typography variant="body2" color="textSecondary">
                  {t('templates.customTemplates') + ' ' + t('templates.template')}
                </Typography>
              }
              sx={{ backgroundColor: 'success.main', color: 'white' }}
            />
            <CardContent>
              <CustomTemplateTable
                isLoading={isLoadingCustom}
                handleDownload={handleDownloadCustom}
              />
              <Pagination
                count={3}
                color="primary"
                page={customPage}
                onChange={handleCustomPageChange}
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              />
            </CardContent>
          </Card>
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
