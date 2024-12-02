import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { fetchAssets } from 'src/store/sections/AssetsSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import { createWPScan } from 'src/store/vulnerabilities/web/WPScanSlice';
import * as Yup from 'yup';

interface WPScan {
  hosts: string;
  config: string;
}

interface CreateWPScanProps {
  onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void;
}

const CreateWPScan: React.FC<CreateWPScanProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const assets = useSelector((state: any) => state.assetsReducer.assets);
  const currentPage = useSelector((state: any) => state.assetsReducer.page);

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAssets(currentPage));
    };
    fetchData();
  }, [dispatch, currentPage]);


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
        await dispatch(createWPScan(newWPScan));
        onSubmit(t('wpscan.scan_created_successfully'), 'success');
        resetForm();
      } catch (error: any) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : Array.isArray(error)
              ? error[0]
              : error?.error
                ? error.error[0]
                : `${error}`;
        handleSubmitSuccess(errorMessage, 'error');

      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSubmitSuccess = (message: string, status: 'success' | 'error') => {
    <SnackBarInfo
      color={status}
      title={status === 'success' ? 'Success' : 'Error'}
      message={message}
    />
  };

  const menuItems = [
    { value: 'scan_normal', label: t('wpscan.scan_normal') },
    { value: 'scan_deep', label: t('wpscan.scan_deep') },
  ];

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom>
          {t('wpscan.create_scan')}
        </Typography>

        <FormControl fullWidth margin="normal" error={formik.touched.hosts && Boolean(formik.errors.hosts)}>
          <Autocomplete
            options={assets}
            getOptionLabel={(option) => option.name}
            value={assets.find((asset: any) => asset.id === formik.values.hosts) || null}
            onChange={(event, newValue) => {
              formik.setFieldValue('hosts', newValue ? newValue.id : '');
            }}
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
            value={
              menuItems.find((item) => item.value === formik.values.config) ||
              null
            }
            onChange={(event, newValue) => {
              formik.setFieldValue('config', newValue ? newValue.value : '');
            }}
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
    </Container>
  );
};

export default CreateWPScan;
