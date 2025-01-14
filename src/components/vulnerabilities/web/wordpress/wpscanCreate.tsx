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
import { fetchFilteredAssets } from 'src/store/sections/AssetsSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import { createWPScan } from 'src/store/vulnerabilities/web/WPScanSlice';
import * as Yup from 'yup';

interface WPScan {
  hosts: string;
  config: string;
}

const CreateWPScan: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const assets = useSelector((state: any) => state.assetsReducer.assets);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFilteredAssets({ url: true }));
    };
    fetchData();
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      hosts: '',
      config: '',
    },
    validationSchema: Yup.object({
      hosts: Yup.string().required(t('wpscan.host_is_required') || ''),
      config: Yup.string()
        .oneOf(['scan_normal', 'scan_deep'], t('wpscan.invalid_config') || '')
        .required(t('wpscan.scan_config_required') || ''),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const newWPScan: WPScan = {
        hosts: values.hosts,
        config: values.config,
      };

      try {
        setIsLoading(true);
        await dispatch(createWPScan(newWPScan));
        setIsLoading(false);
        resetForm();
        navigate('/vulnerabilities/web/wordpress', {
          state: {
            message: t('wpscan.scan_created_successfully') || '',
            severity: 'success',
          },
        });

      } catch (error: any) {
        navigate('/vulnerabilities/web/wordpress', {
          state: {
            message: error,
            severity: 'error',
          },
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const menuItems = [
    { value: 'scan_normal', label: t('wpscan.scan_normal') },
    { value: 'scan_deep', label: t('wpscan.scan_deep') },
  ];

  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/vulnerabilities/web">
              {t('menu.vulnerabilities')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/vulnerabilities/web/wordpress">
              {t('menu.wordpress')}
            </Link>
            <Typography color="textPrimary">
              {t('wpscan.create_scan')}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardCard
            title={t('wpscan.create_scan') || ''}>
            <>
              {isLoading ? (
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="300px">
                <Loader />
                <Box component="small" mt={2} color="gray" textAlign="center" style={{ fontSize: '0.875rem' }}>
                  {t('scan.scan_creation_message') || ''}
                </Box>
              </Box>
              ) : (
                <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={formik.touched.hosts && Boolean(formik.errors.hosts)}
                  >
                    <Autocomplete
                      options={assets}
                      getOptionLabel={(option) => option.name}
                      value={assets.find((asset: any) => asset.id === formik.values.hosts) || null}
                      onChange={(event, newValue) => {
                        formik.setFieldValue('hosts', newValue ? newValue.id : '');
                      }}
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          {option.name} - {option.url}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t('wpscan.host_name')}
                          variant="outlined"
                          error={formik.touched.hosts && Boolean(formik.errors.hosts)}
                        />
                      )}
                    />
                    <FormHelperText>
                      {formik.touched.hosts && formik.errors.hosts}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    fullWidth
                    margin="normal"
                    error={formik.touched.config && Boolean(formik.errors.config)}
                  >
                    <Autocomplete
                      options={menuItems}
                      getOptionLabel={(option) => option.label}
                      value={menuItems.find((item) => item.value === formik.values.config) || null}
                      onChange={(event, newValue) => {
                        formik.setFieldValue('config', newValue ? newValue.value : '');
                      }}
                      renderOption={(props, option) => (
                        <li {...props} key={option.value}>
                          {option.label}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t('wpscan.config')}
                          variant="outlined"
                          error={formik.touched.config && Boolean(formik.errors.config)}
                        />
                      )}
                    />
                    <FormHelperText>
                      {formik.touched.config && formik.errors.config}
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
                      {t('wpscan.create_scan')}
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
            </>
          </DashboardCard>
        </Grid>
      </Grid>


    </PageContainer>
  );
};

export default CreateWPScan;
