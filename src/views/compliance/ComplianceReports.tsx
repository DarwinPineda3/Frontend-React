import React, { useState } from 'react';
import { Box, Card, CardHeader, CardContent, Grid, Typography, Button, Select, MenuItem, InputLabel, FormControl, Breadcrumbs, IconButton, Link, Snackbar, Alert } from '@mui/material';
import { Download as DownloadIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer'; 
import { Link as RouterLink } from 'react-router-dom';
import Loader from 'src/components/shared/Loader/Loader';
import ReportComplianceByProjects from 'src/components/compliance/giotto-reports/giottoReportsByProjects';
import ReportComplianceByCategory from 'src/components/compliance/giotto-reports/giottoReportsByCategories';

const ComplianceReports = () => {
  // const { t } = useTranslation();
  // const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  
  // const [selectedProject, setSelectedProject] = useState<string>('1');

  return (
    <PageContainer title={'Akila'}>
      {/* TODO: select with report selectd */}
      <ReportComplianceByProjects />
      <ReportComplianceByCategory />
    </PageContainer>
  );
};

export default ComplianceReports;
