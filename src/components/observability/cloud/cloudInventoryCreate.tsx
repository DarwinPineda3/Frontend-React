import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import Thumbnail from 'src/components/home/monitoring/malware-analyses/MalwareAnalysisThumbnail';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import { createCloudInventory } from 'src/store/observability/cloud/CloudInventorySlice';
import { useDispatch } from 'src/store/Store';
import * as Yup from 'yup';

const CreateCloudInventory: React.FC = () => {
  const [provider, setProvider] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      provider: '',
      aws_id: '',
      aws_secret: '',
      azure_client_id: '',
      azure_tenant_id: '',
      azure_client_secret: '',
      gcp_credentials_json_file: null,
    },
    validationSchema: Yup.object({
      provider: Yup.string().required(
        t('observability.cloud_inventory.provider_is_required') || '',
      ),
      aws_id: Yup.string().when('provider', {
        is: 'aws',
        then: Yup.string().required(t('observability.cloud_inventory.aws_id_is_required') || ''),
      }),
      aws_secret: Yup.string().when('provider', {
        is: 'aws',
        then: Yup.string().required(
          t('observability.cloud_inventory.aws_secret_is_required') || '',
        ),
      }),
      azure_client_id: Yup.string().when('provider', {
        is: 'azure',
        then: Yup.string().required(
          t('observability.cloud_inventory.azure_client_id_is_required') || '',
        ),
      }),
      azure_tenant_id: Yup.string().when('provider', {
        is: 'azure',
        then: Yup.string().required(
          t('observability.cloud_inventory.azure_tenant_id_is_required') || '',
        ),
      }),
      azure_client_secret: Yup.string().when('provider', {
        is: 'azure',
        then: Yup.string().required(
          t('observability.cloud_inventory.azure_client_secret_is_required') || '',
        ),
      }),
      gcp_credentials_json_file: Yup.mixed().when('provider', {
        is: 'gcp',
        then: Yup.mixed().required(
          t('observability.cloud_inventory.gcp_credentials_file_is_required') || '',
        ),
      }),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const newCloudScan = {
        provider: values.provider,
        aws_id: values.aws_id,
        aws_secret: values.aws_secret,
        azure_client_id: values.azure_client_id,
        azure_tenant_id: values.azure_tenant_id,
        azure_client_secret: values.azure_client_secret,
        gcp_credentials_json_file: values.gcp_credentials_json_file,
      };

      try {
        await dispatch(createCloudInventory(newCloudScan));


        navigate('/observability/cloud', {
          state: {
            message: t('observability.cloud_inventory.scan_created_successfully') || '',
            severity: 'success',
          },
        });


      } catch (error) {
        navigate('/observability/cloud', {
          state: {
            message: error,
            severity: 'error',
          },
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleProviderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedProvider = event.target.value as string;
    setProvider(selectedProvider);
    formik.setFieldValue('provider', selectedProvider);
  };

  return (
    <PageContainer title="Akila">
      <>
        <Box mb={2}>
          <Box display="flex" alignItems="center" mt={2}>
            <IconButton onClick={() => navigate(-1)} color="primary">
              <ArrowBackIcon />
            </IconButton>
            <Breadcrumbs aria-label="breadcrumb">
              <Link component={RouterLink} color="inherit" to="/observability/cloud">
                {t('observability.cloud_inventory.observability')}
              </Link>
              <Link component={RouterLink} color="inherit" to="/observability/cloud">
                {t('observability.cloud_inventory.cloud')}
              </Link>
              <Typography color="textPrimary">
                {t('observability.cloud_inventory.new_scan')}
              </Typography>
            </Breadcrumbs>
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashboardCard title={t('observability.cloud_inventory.create_cloud_scan') || ''}
                           subtitle={t('observability.cloud_inventory.create_cloud_scan_subtitle') || ''}>
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
                      error={Boolean(formik.touched.provider && formik.errors.provider)}
                    >
                      <InputLabel id="provider-label">
                        {t('observability.cloud_inventory.provider') || ''}
                      </InputLabel>
                      <Select
                        labelId="provider-label"
                        id="provider"
                        value={formik.values.provider}
                        onChange={handleProviderChange}
                      >
                        <MenuItem value="aws">AWS</MenuItem>
                        <MenuItem value="azure">Azure</MenuItem>
                        <MenuItem value="gcp">GCP</MenuItem>
                      </Select>
                      <FormHelperText>
                        {formik.touched.provider && formik.errors.provider}
                      </FormHelperText>
                    </FormControl>

                    {provider === 'aws' && (
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          id="aws_id"
                          name="aws_id"
                          label="AWS ID"
                          value={formik.values.aws_id}
                          onChange={formik.handleChange}
                          error={Boolean(formik.touched.aws_id && formik.errors.aws_id)}
                          helperText={formik.touched.aws_id && formik.errors.aws_id}
                        />
                        <TextField
                          fullWidth
                          margin="normal"
                          id="aws_secret"
                          name="aws_secret"
                          label="AWS Secret"
                          value={formik.values.aws_secret}
                          onChange={formik.handleChange}
                          error={Boolean(formik.touched.aws_secret && formik.errors.aws_secret)}
                          helperText={formik.touched.aws_secret && formik.errors.aws_secret}
                        />
                      </>
                    )}

                    {provider === 'azure' && (
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          id="azure_client_id"
                          name="azure_client_id"
                          label={t('observability.cloud_inventory.azure_client_id') || ''}
                          value={formik.values.azure_client_id}
                          onChange={formik.handleChange}
                          error={Boolean(
                            formik.touched.azure_client_id && formik.errors.azure_client_id,
                          )}
                          helperText={
                            formik.touched.azure_client_id && formik.errors.azure_client_id
                          }
                        />
                        <TextField
                          fullWidth
                          margin="normal"
                          id="azure_tenant_id"
                          name="azure_tenant_id"
                          label={t('observability.cloud_inventory.azure_tenant_id') || ''}
                          value={formik.values.azure_tenant_id}
                          onChange={formik.handleChange}
                          error={Boolean(
                            formik.touched.azure_tenant_id && formik.errors.azure_tenant_id,
                          )}
                          helperText={
                            formik.touched.azure_tenant_id && formik.errors.azure_tenant_id
                          }
                        />
                        <TextField
                          fullWidth
                          margin="normal"
                          id="azure_client_secret"
                          name="azure_client_secret"
                          label={t('observability.cloud_inventory.azure_client_secret') || ''}
                          value={formik.values.azure_client_secret}
                          onChange={formik.handleChange}
                          error={Boolean(
                            formik.touched.azure_client_secret && formik.errors.azure_client_secret,
                          )}
                          helperText={
                            formik.touched.azure_client_secret && formik.errors.azure_client_secret
                          }
                        />
                      </>
                    )}

                    {provider === 'gcp' && (
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={Boolean(
                          formik.touched.gcp_credentials_json_file &&
                          formik.errors.gcp_credentials_json_file,
                        )}
                      >
                        <CustomFormLabel htmlFor="attach_file">
                          {t('support.attach_file')}
                        </CustomFormLabel>
                        <Thumbnail
                          onDrop={(acceptedFiles) => {
                            formik.setFieldValue('gcp_credentials_json_file', acceptedFiles[0]);
                          }}
                        />
                        <FormHelperText>
                          {formik.touched.gcp_credentials_json_file &&
                            formik.errors.gcp_credentials_json_file}
                        </FormHelperText>
                      </FormControl>
                    )}

                    <Box mt={2}>
                      <Button type="submit" variant="contained" color="primary" >
                        {t('configuration.create') || ''}
                      </Button>
                    </Box>
                  </Box>
                )}
              </>
            </DashboardCard>
          </Grid>
        </Grid>
      </>
    </PageContainer>
  );
};

export default CreateCloudInventory;
