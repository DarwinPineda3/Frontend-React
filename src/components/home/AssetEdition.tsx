import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
} from '@mui/material';
import { useDispatch } from 'src/store/Store';
import { createAsset, editAsset } from 'src/store/sections/AssetsSlice';
import { AssetType } from 'src/types/assets/asset';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
  asset?: AssetType; // Optional for edit
  onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void; // Callback after submission
}

const CreateUpdateAsset: React.FC<Props> = ({ asset, onSubmit }) => {
  const dispatch = useDispatch();

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      name: asset?.name || '',
      ip: asset?.ip || '',
      dominio: asset?.dominio || '',
      url: asset?.url || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      ip: Yup.string()
        .matches(
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
          'Invalid IP address format'
        )
        .required('IP address is required'),
      dominio: Yup.string().required('Domain is required'),
      url: Yup.string().url('Invalid URL format').required('URL is required'),
    }),
    onSubmit: (values) => {
      const newAsset: AssetType = {
        ...values,
        id: asset?.id || undefined, // Only include `id` if updating
      };

      if (asset) {
        dispatch(editAsset(newAsset));
        onSubmit('Asset updated successfully', 'success'); // Show success message for update
      } else {
        dispatch(createAsset(newAsset));
        onSubmit('Asset created successfully', 'success'); // Show success message for create
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
          name="ip"
          value={formik.values.ip}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.ip && Boolean(formik.errors.ip)}
          helperText={formik.touched.ip && formik.errors.ip}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Domain"
          name="dominio"
          value={formik.values.dominio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.dominio && Boolean(formik.errors.dominio)}
          helperText={formik.touched.dominio && formik.errors.dominio}
        />

        <TextField
          fullWidth
          margin="normal"
          label="URL"
          name="url"
          value={formik.values.url}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.url && Boolean(formik.errors.url)}
          helperText={formik.touched.url && formik.errors.url}
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

export default CreateUpdateAsset;
