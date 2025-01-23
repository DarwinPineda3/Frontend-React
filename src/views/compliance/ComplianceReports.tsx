import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, Box, Breadcrumbs, FormControl, Grid, IconButton, InputLabel, Link, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReportComplianceByCategory from 'src/components/compliance/giotto-reports/giottoReportsByCategories';
import ReportComplianceByProjects from 'src/components/compliance/giotto-reports/giottoReportsByProjects';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';

const ComplianceReports = () => {
  const [selectedReport, setSelectedReport] = useState<string>(''); // Valor inicial vacío

  const handleReportChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedReport(event.target.value as string);
  };

  const { t } = useTranslation();

  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/compliance/reports">
              {t('compliance_reports.compliance')}
            </Link>
            <Typography color="textPrimary">{t('compliance_reports.reports')}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardCard
            title={t('giotto.reports.compliance_reports') || ''}
            subtitle={t('giotto.reports.module_description') || ''}>
            <>

              <Box>
                {selectedReport === '' &&
                  <Grid item xs={12}>
                    <Alert severity="info">
                      <Typography variant="body2" color="textSecondary">
                        {t('giotto.reports.module_info')}
                        <br />
                        - <strong>{t('giotto.reports.by_projects_tittle')}</strong>{t('giotto.reports.by_projects_description')}
                        <br />
                        - <strong>{t('giotto.reports.by_assessments_tittle')}</strong> {t('giotto.reports.by_assessments_description')}
                        <br />
                        {t('giotto.reports.select_option')}
                      </Typography>
                    </Alert>
                  </Grid>
                }
                <FormControl fullWidth margin="normal" sx={{ marginBottom: 0 }}>
                  <InputLabel id="report-select-label">{t('giotto.reports.select_report')}</InputLabel>
                  <Select
                    labelId="report-select-label"
                    value={selectedReport}
                    onChange={handleReportChange}
                  >

                    <MenuItem value="" disabled>
                      {t('giotto.reports.select_option')}
                    </MenuItem>
                    <MenuItem value="projects">{t('giotto.reports.by_projects')}</MenuItem>
                    <MenuItem value="categories">{t('giotto.reports.by_assessments')}</MenuItem>
                  </Select>
                </FormControl>
                {selectedReport === 'projects' && <ReportComplianceByProjects />}
                {selectedReport === 'categories' && <ReportComplianceByCategory />}
              </Box>
            </>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ComplianceReports;
