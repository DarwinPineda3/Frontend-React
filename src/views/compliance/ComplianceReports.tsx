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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardCard
            title={t('giotto.reports.compliance_reports') || ''}
            subtitle={t('giotto.reports.module_description') || ''}>
            <>
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
              <Box>
                {selectedReport === '' &&
                  <Grid item xs={12}>
                    <Alert severity="info">
                      <Typography variant="body2" color="textSecondary">
                        En este módulo podrá descargar reportes clave para evaluar y gestionar el cumplimiento normativo en sus operaciones.
                        <br />
                        - <strong>Reporte por proyectos:</strong> Obtenga un análisis del estado de cumplimiento de cada proyecto.
                        <br />
                        - <strong>Reporte por evaluaciones:</strong> Consulte información relacionada con assessments, medidas de hardening y cualquier rollback realizado, asegurando la seguridad y trazabilidad de sus sistemas.
                        <br />
                        Por favor, sleccione una de las opciones.
                      </Typography>
                    </Alert>
                  </Grid>
                }
                <FormControl fullWidth margin="normal">
                  <InputLabel id="report-select-label">Select Report</InputLabel>
                  <Select
                    labelId="report-select-label"
                    value={selectedReport}
                    onChange={handleReportChange}
                  >

                    <MenuItem value="" disabled>
                      Please select a report
                    </MenuItem>
                    <MenuItem value="projects">By Projects</MenuItem>
                    <MenuItem value="categories">By Categories</MenuItem>
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
