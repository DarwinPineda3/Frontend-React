import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from 'src/components/shared/Loader/Loader';
import { getAssetsByGroup } from 'src/store/sections/compliance/giotoAssetsSlice';
import { getExecutionByTemplate } from 'src/store/sections/compliance/giotoExecutionsSlice';
import { getGroupsByProjectId } from 'src/store/sections/compliance/giottoGroupsSlice';
import { fecthProjectsByProcessId } from 'src/store/sections/compliance/giottoProjectsSlice';
import { downloadReportByCategory } from 'src/store/sections/compliance/giottoReportsSlice';
import { getTemplatesByGroupId } from 'src/store/sections/compliance/giottoTemplatesSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import * as Yup from 'yup';

interface Report {
  project: string;
  group: string;
  template: string;
  execution: string;
  asset: string;
  type: string
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

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const fadeStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  };

  const [isFetching, setIsFetching] = useState(false);
  const groupsList = useSelector((state: any) => state.giottoGroupReducer.groups);
  const templates = useSelector((state: any) => state.giottoTemplatesReducer.templates);
  const executions = useSelector((state: any) => state.GiottoExecutionsReducer.executions);
  const assets = useSelector((state: any) => state.GiottoAssetsReducer.assets);

  const formik = useFormik({
    initialValues: {
      project: '',
      group: '',
      template: '',
      execution: '',
      asset: '',
      type: '',
      processToExecute: null,
    },
    validationSchema: Yup.object({
      project: Yup.string().required(t('giotto.reports.project_is_required') || ''),
      //demás validaciones
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const newReport: Report = { ...values };

      try {
        setIsLoading(true);
        await dispatch(downloadReportByCategory(newReport));

        setSnackbarState({
          message: t('giotto.reports.report_generated_successfully') || '',
          severity: 'success',
        });
        // resetForm();
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

  const handleReportTypeChange = (value: string) => {
    const selectedReport = reportOptions.find((option) => option.value === value);
    if (selectedReport) {
      formik.setFieldValue('type', value);
      formik.setFieldValue('processToExecute', selectedReport.processToExecute);
    }
  };

  //API calls
  useEffect(() => {
    const fetchDynamicData = async () => {
      try {
        setIsFetching(true);
        if (formik.values.processToExecute) {
          await dispatch(fecthProjectsByProcessId(formik.values.processToExecute));
        }
        if (formik.values.project) {
          const { processToExecute, project, group, template } = formik.values;

          if (processToExecute) {
            // Grupos
            await dispatch(getGroupsByProjectId(processToExecute, project));
          }

          if (group) {
            // Templates
            await dispatch(getTemplatesByGroupId(processToExecute, project, group));

            // Assets
            await dispatch(getAssetsByGroup(group));
          }

          if (group && template) {
            // Ejecuciones
            await dispatch(getExecutionByTemplate(processToExecute, project, group, template));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsFetching(false);
      }

    };

    fetchDynamicData();
  }, [formik.values.project, formik.values.group, formik.values.template, formik.values.processToExecute, formik.values.type]);

  const reportOptions = [
    { value: "GetAssessmentStatusByAssetReport", label: "Estado de evaluación por activo", processToExecute: 2 },
    { value: "GetAssessmentTechnicalDetailsByAssetReport", label: "Detalles técnicos de evaluación por activo", processToExecute: 2 },
    { value: "GetHardeningStatusByAssetReport", label: "Estado de hardening por activo", processToExecute: 3 },
    { value: "GetHardeningTechnicalDetailsByAssetReport", label: "Detalles técnicos de hardening por activo", processToExecute: 3 },
    { value: "GetRollbackStatusByAssetReport", label: "Estado de rollback por activo", processToExecute: 0 },
    { value: "GetRollbackTechnicalDetailsByAssetReport", label: "Detalles técnicos de rollback por activo", processToExecute: 0 },
  ];

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>

      <FormControl fullWidth margin="normal" sx={{ ...fadeStyle }}>
        <InputLabel id="report-type-select-label">{t('giotto.reports.report_type')}</InputLabel>
        <Select
          labelId="report-type-select-label"
          value={formik.values.type}
          onChange={(e) => handleReportTypeChange(e.target.value)}
        >
          {reportOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {Array.isArray(projects) && projects.length > 0 && (
        <FormControl fullWidth margin="normal" sx={{ ...fadeStyle }}>
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
      )}

      {Array.isArray(groupsList) && groupsList.length > 0 && (
        <FormControl fullWidth margin="normal" sx={{ ...fadeStyle }}>
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
      )}

      {Array.isArray(templates) && templates.length > 0 && (
        <FormControl fullWidth margin="normal">
          <Autocomplete
            options={templates}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            )}
            value={templates.find((template: any) => template.id === formik.values.template) || null}
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
      )}

      {Array.isArray(executions) && executions.length > 0 && (
        <FormControl fullWidth margin="normal">
          <Autocomplete
            options={executions}
            getOptionLabel={(option) => option.creationDate}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.creationDate}
              </li>
            )}
            value={executions.find((execution: any) => execution.id === formik.values.execution) || null}
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
      )}

      {/* {Array.isArray(assets) && assets.length > 0 && ( */}
      <FormControl fullWidth margin="normal">
        <Autocomplete
          options={assets}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          )}
          value={assets.find((asset: any) => asset.id === formik.values.asset) || null}
          onChange={(event, newValue) => {
            formik.setFieldValue('asset', newValue ? newValue.id : '');
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('giotto.reports.asset')}
              variant="outlined"
              error={formik.touched.asset && Boolean(formik.errors.asset)}
            />
          )}
          disabled={assets.length === 0}
        />
      </FormControl>
      {/* )} */}

      {(isFetching && (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" margin="1em">
          <Loader />
        </Box>
      ))}

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {t('compliance_reports.generate_download')}
      </Button>
    </Box>
  );
};

export default ReportComplianceByCategory;
