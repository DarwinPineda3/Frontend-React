import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
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
  const navigate = useNavigate();
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
        // closeSnackbar()
      }
    },
  });

  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/vulnerabilities/web">
              {t('compliance_reports.compliance')}
            </Link>
            <Typography color="textPrimary">
              {t('compliance_reports.reports')}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardCard
            title={t('giotto.reports.compliance_reports') || ''}
            subtitle={t('giotto.reports.module_description') || ''}>
            <>
              {isLoading ? (
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="300px">
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
                  title={t('wpscan.operation_status')}
                  message={t('wpscan.scan_in_progress')}
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
                // onClose={closeSnackbar}
                />
              )}
            </>
          </DashboardCard>
        </Grid>
      </Grid>


    </PageContainer>
  );
};

export default ReportComplianceByProjects;
