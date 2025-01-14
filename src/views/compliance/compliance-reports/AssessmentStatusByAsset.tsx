import React, { useState } from 'react';
import { Box, Card, CardHeader, CardContent, Grid, Typography, Button, Select, MenuItem, InputLabel, FormControl, Breadcrumbs, IconButton, Link, Snackbar, Alert } from '@mui/material';
import { Download as DownloadIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import { Link as RouterLink } from 'react-router-dom';
import Loader from 'src/components/shared/Loader/Loader';

const AssessmentStatusByAsset = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedExecution, setSelectedExecution] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState<'error' | 'warning' | 'info' | 'success'>('success'); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleDownload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSnackbarMessage(String(t('compliance_reports.report_generated')));
      setSnackbarColor('success');
      setOpenSnackbar(true);
    }, 2000);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <PageContainer title={'Akila'}>
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/compliance/assessment-status">
            {t('compliance_menu.compliance')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/compliance/assessment-status">
              {t('assessment_status.title')}
            </Link>
          </Breadcrumbs>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<Typography variant="h6">{t('assessment_status.by_asset')}</Typography>}
              subheader={<Typography variant="body2" color="textSecondary">{t('assessment_status.select_parameters')}</Typography>}
              sx={{ backgroundColor: 'success.main', color: 'white' }}
            />
            <CardContent>
              <Grid container spacing={3}>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>{t('assessment_status.select_project')}</InputLabel>
                    <Select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      label={t('assessment_status.select_project')}
                    >
                      <MenuItem value="">{t('assessment_status.select_project_option')}</MenuItem>
                      <MenuItem value="2">{t('assessment_status.project_option_1')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>{t('assessment_status.select_group')}</InputLabel>
                    <Select
                      value={selectedGroup}
                      onChange={(e) => setSelectedGroup(e.target.value)}
                      label={t('assessment_status.select_group')}
                    >
                      <MenuItem value="">{t('assessment_status.select_group_option')}</MenuItem>
                      <MenuItem value="1">{t('assessment_status.group_option_1')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>{t('assessment_status.select_template')}</InputLabel>
                    <Select
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      label={t('assessment_status.select_template')}
                    >
                      <MenuItem value="">{t('assessment_status.select_template_option')}</MenuItem>
                      <MenuItem value="2">{t('assessment_status.template_option_1')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>{t('assessment_status.select_execution')}</InputLabel>
                    <Select
                      value={selectedExecution}
                      onChange={(e) => setSelectedExecution(e.target.value)}
                      label={t('assessment_status.select_execution')}
                    >
                      <MenuItem value="">{t('assessment_status.select_execution_option')}</MenuItem>
                      <MenuItem value="4">{t('assessment_status.execution_option_1')}</MenuItem>
                      <MenuItem value="3">{t('assessment_status.execution_option_2')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>{t('assessment_status.select_asset')}</InputLabel>
                    <Select
                      value={selectedAsset}
                      onChange={(e) => setSelectedAsset(e.target.value)}
                      label={t('assessment_status.select_asset')}
                    >
                      <MenuItem value="">{t('assessment_status.select_asset_option')}</MenuItem>
                      <MenuItem value="1">{t('assessment_status.asset_option_1')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Alert severity="info">
                    <Typography variant="body2" color="textSecondary">{t('assessment_status.report_info')}</Typography>
                  </Alert>
                </Grid>

                <Grid item xs={12} textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDownload}
                    startIcon={isLoading ? <Loader /> : <DownloadIcon />}
                    disabled={isLoading}
                    sx={{ position: 'relative', paddingLeft: isLoading ? '20px' : '' }}
                  >
                    {isLoading ? t('assessment_status.loading') : t('assessment_status.generate_download')}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ top: 20 }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarColor} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default AssessmentStatusByAsset;
