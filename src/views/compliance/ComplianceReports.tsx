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
      <ReportComplianceByProjects />
    </PageContainer>
  );
};

export default ComplianceReports;
