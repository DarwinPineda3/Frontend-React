import {
  Alert,
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from 'src/components/shared/Loader/Loader';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { fetchAllProjectsInList } from 'src/store/sections/compliance/giottoProjectsSlice';
import { fetchComplianceByProjectReport } from 'src/store/sections/compliance/giottoReportsSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import * as Yup from 'yup';

interface Report {
  project: string;
}

const ReportComplianceByProjects: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { projects, page, pageSize, loading, totalItemsAmount } = useSelector(
    (state: any) => state.giottoProjectsReducer,
  );
  const [snackbarState, setSnackbarState] = useState<{
    message: string;
    severity: 'success' | 'error';
  } | null>(null);

  const closeSnackbar = () => {
    setSnackbarState(null);
  };



  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllProjectsInList());
    };
    fetchData();
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      project: '',
    },
    validationSchema: Yup.object({
      project: Yup.string().required(t('giotto.reports.project_is_required') || ''),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const newReport: Report = {
        project: values.project,
      };

      try {
        setIsLoading(true);
        await dispatch(fetchComplianceByProjectReport(newReport));
        setIsLoading(false);
        setSnackbarState({
          message: t('giotto.reports.report_generated_successfully') || '',
          severity: 'success',
        });
        resetForm();

      } catch (error: any) {
        setIsLoading(false);
        setSnackbarState({
          message: t('giotto.reports.report_generation_failed') || '',
          severity: 'error',
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box>
      <>
        {isLoading ? (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" margin="1em">
            <Loader />
            <Box component="small" mt={2} color="gray" textAlign="center" style={{ fontSize: '0.875rem' }}>
              {t('giotto.reports.report_generation_message') || ''}
            </Box>
          </Box>
        ) : (
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <FormControl
              fullWidth
              margin="normal"
              error={formik.touched.project && Boolean(formik.errors.project)}
            >
              <Autocomplete
                options={projects}
                getOptionLabel={(option) => option.name}
                value={projects.find((asset: any) => asset.id === formik.values.project) || null}
                onChange={(event, newValue) => {
                  formik.setFieldValue('project', newValue ? newValue.id : '');
                }}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('giotto.reports.project')}
                    variant="outlined"
                    error={formik.touched.project && Boolean(formik.errors.project)}
                  />
                )}
              />
              <FormHelperText>
                {formik.touched.project && formik.errors.project}
              </FormHelperText>
            </FormControl>

            <Grid item xs={12}>
              <Alert severity="info">
                <Typography variant="body2" color="textSecondary">{t('giotto.reports.report_by_project_info')}</Typography>
              </Alert>
            </Grid>

            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={formik.isSubmitting}
              >
                {t('compliance_reports.generate_download')}
              </Button>
            </Box>
          </Box>
        )}
        {isLoading && (
          <SnackBarInfo
            color="info"
            title={t('giotto.reports.operation_status')}
            message={t('giotto.reports.generation_in_progress')}
          />
        )}

        {snackbarState && (
          <SnackBarInfo
            color={snackbarState.severity}
            title={
              snackbarState.severity === 'success'
                ? t('giotto.reports.success')
                : t('giotto.reports.error')
            }
            message={snackbarState.message}
          />
        )}
      </>
    </Box>
  );
};

export default ReportComplianceByProjects;
