import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import { getExecutionByTemplate } from 'src/store/sections/compliance/giotoExecutionsSlice';
import { getGroupsByProjectId } from 'src/store/sections/compliance/giottoGroupsSlice';
import { fecthListInTemplateExecutions } from 'src/store/sections/compliance/giottoProjectsSlice';
import { fetchComplianceByProjectReport } from 'src/store/sections/compliance/giottoReportsSlice';
import { getTemplatesByGroupId } from 'src/store/sections/compliance/giottoTemplatesSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import * as Yup from 'yup';

interface Report {
  project: string;
  group: string;
  template: string;
  execution: string;
  asset: string;
}

const ReportComplianceByCategory: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { projects } = useSelector((state: any) => state.giottoProjectsReducer);

  const [snackbarState, setSnackbarState] = useState<{
    message: string;
    severity: 'success' | 'error';
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [assets, setAssets] = useState<any[]>([]);

  const [isFetching, setIsFetching] = useState(false);
  const groupsList = useSelector((state: any) => state.giottoGroupReducer.groups);
  const templates = useSelector((state: any) => state.giottoTemplatesReducer.templates);
  const executions = useSelector((state: any) => state.GiottoExecutionsReducer.executions);

  useEffect(() => {
    const fetchProjects = async () => {
      await dispatch(fecthListInTemplateExecutions(3));
    };
    fetchProjects();
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      project: '',
      group: '',
      template: '',
      execution: '',
      asset: '',
    },
    validationSchema: Yup.object({
      project: Yup.string().required(t('giotto.reports.project_is_required') || ''),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const newReport: Report = { ...values };

      try {
        setIsLoading(true);
        await dispatch(fetchComplianceByProjectReport(newReport));
        setSnackbarState({
          message: t('giotto.reports.report_generated_successfully') || '',
          severity: 'success',
        });
        resetForm();
      } catch (error: any) {
        setSnackbarState({
          message: t('giotto.reports.report_generation_failed') || '',
          severity: 'error',
        });
      } finally {
        setSubmitting(false);
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchDynamicData = async () => {
      if (formik.values.project) {
        setIsFetching(true);
        try {
          //API calls

          //grupos
          await dispatch(getGroupsByProjectId(3/* assetstment, hardening, rollback*/, formik.values.project))

          //templates
          await dispatch(getTemplatesByGroupId(3/* assetstment, hardening, rollback*/, formik.values.project, formik.values.group))
          
          // Executions
          await dispatch(getExecutionByTemplate(3/* assetstment, hardening, rollback*/, formik.values.project, formik.values.group, formik.values.template))
          
          const assetData = await fetch(`/api/assets?projectId=${formik.values.project}`).then((res) =>
            res.json(),
          );

          setAssets(assetData);
        } catch (error) {
          console.error('Error fetching dynamic data:', error);
        } finally {
          setIsFetching(false);
        }
      }
    };

    fetchDynamicData();
  }, [formik.values.project, formik.values.group, formik.values.template]);

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
            <Box component="form" onSubmit={formik.handleSubmit} noValidate>
              <FormControl fullWidth margin="normal">
                <Autocomplete
                  options={projects}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  value={projects.find((project: any) => project.id === formik.values.project) || null}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('project', newValue ? newValue.id : '');
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t('giotto.reports.project')}
                      variant="outlined"
                      error={formik.touched.project && Boolean(formik.errors.project)}
                    />
                  )}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <Autocomplete
                  options={groupsList}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  value={groupsList.find((group: any) => group.id === formik.values.group) || null}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('group', newValue ? newValue.id : '');
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t('giotto.reports.group')}
                      variant="outlined"
                      error={formik.touched.group && Boolean(formik.errors.group)}
                    />
                  )}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <Autocomplete
                  options={Array.isArray(templates) ? templates : []}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  value={Array.isArray(templates) ? templates.find((template: any) => template.id === formik.values.template) : null}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('template', newValue ? newValue.id : '');
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t('giotto.reports.template')}
                      variant="outlined"
                      error={formik.touched.template && Boolean(formik.errors.template)}
                    />
                  )}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <Autocomplete
                  options={Array.isArray(executions) ? executions : []}
                  getOptionLabel={(option) => option.creationDate}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.creationDate}
                    </li>
                  )}
                  value={Array.isArray(executions) ? executions.find((execution: any) => execution.id === formik.values.execution) : null}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('execution', newValue ? newValue.id : '');
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t('giotto.reports.execution')}
                      variant="outlined"
                      error={formik.touched.execution && Boolean(formik.errors.execution)}
                    />
                  )}
                />
              </FormControl>

              <Button type="submit" variant="contained" color="primary" fullWidth>
                {t('compliance_reports.generate_download')}
              </Button>
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ReportComplianceByCategory;
