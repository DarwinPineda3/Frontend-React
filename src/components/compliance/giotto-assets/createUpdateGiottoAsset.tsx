import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { ComplianceAsset, createAsset, editAsset } from 'src/store/sections/compliance/giotoAssetsSlice';
import { useDispatch } from 'src/store/Store';
import * as Yup from 'yup';

interface Props {
  asset?: ComplianceAsset; // Optional for edit
  onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void;
}

const CreateUpdateGiottoAsset: React.FC<Props> = ({ asset, onSubmit }) => {


  const dispatch = useDispatch();

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      name: asset?.name || '',
      networkAddress: asset?.networkAddress || '',
      description: asset?.description || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      networkAddress: Yup.string()
        .required('IP Address is required')
        .matches(
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
          'Invalid IP address format'
        ),
      description: Yup.string().nullable(),
    }),
    onSubmit: async (values) => {
      const newAsset: ComplianceAsset = {
        ...values,
        id: asset?.id || undefined,
        networkAddress: values.networkAddress as string,
        description: values.description as string,
        creationDate: new Date().toISOString(),
        lastKeepAlive: new Date().toISOString(),
        companyName: 'Company Name',
      };

      try {
        if (asset) {
          await dispatch(editAsset(newAsset)); // Use await to handle the promise
          onSubmit('Asset updated successfully', 'success');
        } else {
          await dispatch(createAsset(newAsset)); // Use await to handle the promise
          onSubmit('Asset created successfully', 'success');
        }
      } catch (error) {
        console.error('Error processing the asset:', error); // Log detailed error for debugging
        onSubmit('An error occurred while processing the asset', 'error');
      }

    },
  });

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom>
          {asset ? 'Edit Asset' : 'Create Asset'}
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
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          fullWidth
          margin="normal"
          label="IP Address"
          name="networkAddress"
          value={formik.values.networkAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.networkAddress && Boolean(formik.errors.networkAddress)}
          helperText={formik.touched.networkAddress && formik.errors.networkAddress}
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {asset ? 'Edit' : 'Create'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateUpdateGiottoAsset;
