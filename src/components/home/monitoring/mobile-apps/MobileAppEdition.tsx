import React from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Container,
} from '@mui/material';
import { useDispatch } from 'src/store/Store';
import { createAppScan, editAppScan } from 'src/store/sections/mobile-app/AppScanSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppScanType } from 'src/types/monitoring/mobile-apps/AppScan';
import { useTranslation } from 'react-i18next';

interface Props {
    appScan?: any; 
    onSubmit: (name: string) => void; 
}

const CreateUpdateAppScan: React.FC<Props> = ({ appScan, onSubmit }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
    // Formik setup with Yup validation schema
    const formik = useFormik({
      initialValues: {
        name: appScan?.name || '',
        createdOn: appScan?.createdOn || '',
        
      },
      validationSchema: Yup.object({
        name: Yup.string().required(t("mobile_apps.name_is_required")),
        // createdOn: Yup.date().('Invalid URL format').required('URL is required'), //validarfecha
      }),
      onSubmit: (values:string, severity: 'success' | 'info' | 'warning' | 'error') => {
        const newAppScan: AppScanType = {
          ...values,
          id: appScan?.id || undefined, 
        };
  
        if (appScan) {
          dispatch(editAppScan(newAppScan));
          onSubmit(t("mobile_apps.app_scan_updated_successfully"), 'success');
        } else {
          dispatch(createAppScan(newAppScan));
          onSubmit(t("mobile_apps.app_scan_created_successfully"), 'success');
        }
      },
    });

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom>
          {appScan ? t("mobile_apps.update_app_for_scanning") : t("mobile_apps.create_app_for_scanning")}
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label={t("mobile_apps.name")}
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {appScan ? t("mobile_apps.update_app_for_scanning") : t("mobile_apps.create_app_scan")}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateUpdateAppScan;