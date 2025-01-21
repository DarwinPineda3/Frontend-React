import React, { useState } from 'react';
import { Box, Card, CardHeader, CardContent, Grid, Typography, Button, Select, MenuItem, InputLabel, FormControl, Breadcrumbs, IconButton, Link, Snackbar, Alert } from '@mui/material';
import { Download as DownloadIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer'; 
import { Link as RouterLink } from 'react-router-dom';
import Loader from 'src/components/shared/Loader/Loader';
import ReportComplianceByProjects from 'src/components/compliance/giotto-reports/giottoReportsByProjects';

const ComplianceReports = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<string>('1');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarTitle, setSnackbarTitle] = useState('');
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
            <Link component={RouterLink} color="inherit" to="/compliance/reports">
              {t('compliance_reports.compliance')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/compliance/reports">
              {t('compliance_reports.reports')}
            </Link>
          </Breadcrumbs>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<Typography variant="h6">{t('compliance_reports.by_project')}</Typography>}
              subheader={<Typography variant="body2" color="textSecondary">{t('compliance_reports.select_project')}</Typography>}
              sx={{ backgroundColor: 'success.main', color: 'white' }}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>{t('compliance_reports.select_project')}</InputLabel>
                    <Select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      label={t('compliance_reports.select_project')}
                    >
                      <MenuItem value="1">Proyecto Demo Giotto</MenuItem>
                      <MenuItem value="2">Grupo Demo Giotto 2</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Alert severity="info">
                  <Typography variant="body2" color="textSecondary">{t('compliance_reports.report_description')}</Typography>
                  </Alert>
                </Grid>

                <Grid item xs={12} textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDownload}
                    startIcon={isLoading ? <Loader /> : <DownloadIcon />}
                    disabled={isLoading}
                    sx={{
                      position: 'relative', 
                      paddingLeft: isLoading ? '20px' : '',
                    }}
                  >
                    {isLoading ? t('compliance_reports.loading') : t('compliance_reports.generate_download')}
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
        sx={{
          top: 20, 
        }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarColor} sx={{ width: '100%' }}>
          <strong>{snackbarTitle}</strong> {snackbarMessage}
        </Alert>
      </Snackbar>

      <ReportComplianceByProjects />
    </PageContainer>
  );
};

export default ComplianceReports;
