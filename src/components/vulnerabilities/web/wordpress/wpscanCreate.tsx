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
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'src/components/shared/Loader/Loader';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import { fetchAssets } from 'src/store/sections/AssetsSlice';
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
        setIsLoading(true);
        const response = await dispatch(createWPScan(newWPScan));
        setIsLoading(false);

        if (response.error) {
          onSubmit(t('wpscan.error_msg'), 'error');
        } else {
          onSubmit(t('wpscan.scan_created_successfully'), 'success');
        }


        resetForm();
      } catch (error: any) {
        onSubmit(`${t('wpscan.error_msg')}\n`, 'error');
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
    <Container maxWidth="sm">
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom>
          {t('wpscan.create_scan')}
        </Typography>

        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <Loader />
        </Box>
        ) : (
          <Box>
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

        
      </Box>

      {isLoading && (
        <SnackBarInfo
          color="info"
          title={t('wpscan.operation_status')}
          message={t('wpscan.scan_in_progress')}
        />
      )}
    </Container>
  );
};

export default CreateWPScan;
