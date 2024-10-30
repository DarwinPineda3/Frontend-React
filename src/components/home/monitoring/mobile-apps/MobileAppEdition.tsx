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

interface Props {
    // appScan?: AppScanType; // Optional for edit
    appScan?: any; // Optional for edit
    onSubmit: (name: string) => void; // Callback after submission
}

const CreateUpdateAppScan: React.FC<Props> = ({ appScan, onSubmit }) => {
  const dispatch = useDispatch();
    // Formik setup with Yup validation schema
    const formik = useFormik({
      initialValues: {
        name: appScan?.name || '',
        createdOn: appScan?.createdOn || '',
        
      },
      validationSchema: Yup.object({
        name: Yup.string().required('Name is required'),
        // createdOn: Yup.date().('Invalid URL format').required('URL is required'), //validarfecha
      }),
      onSubmit: (values:string, severity: 'success' | 'info' | 'warning' | 'error') => {
        const newAppScan: AppScanType = {
          ...values,
          id: appScan?.id || undefined, // Only include `id` if updating
        };
  
        if (appScan) {
          dispatch(editAppScan(newAppScan));
          onSubmit('App Scan updated successfully', 'success'); // Show success message for update
        } else {
          dispatch(createAppScan(newAppScan));
          onSubmit('App Scan created successfully', 'success'); // Show success message for create
        }
      },
    });

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom>
          {appScan ? 'Update app for scanning' : 'Create app for scanning'}
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          // helperText={formik.touched.name && formik.errors.name}
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {appScan ? 'Update App Scan' : 'Create App Scan'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateUpdateAppScan;