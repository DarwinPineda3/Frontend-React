import {
  Box,
  Button,
  Container,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { createAsset, editAsset } from 'src/store/sections/AssetsSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import { AssetType } from 'src/types/assets/asset';
import * as Yup from 'yup';

interface Props {
  asset?: AssetType; // Optional for edit
  onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void; // Callback after submission
}

const CreateUpdateAsset: React.FC<Props> = ({ asset, onSubmit }) => {
  const { loading } = useSelector((state: any) => state.assetsReducer);

  const dispatch = useDispatch();

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      name: asset?.name || '',
      ip: asset?.ip || null,
      dominio: asset?.domain || null,
      url: asset?.url || null,
      hostname: asset?.hostname || '',
      uuid: asset?.uuid || ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      ip: Yup.string().nullable()
        .matches(
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
          'Invalid IP address format'
        ),
      dominio: Yup.string().nullable(),
      url: Yup.string().nullable().url('Invalid URL format'),
      hostname: Yup.string(),
    }).test(
      'at-least-one-field',
      'At least one of IP, Domain or URL must be filled',
      function (values, context) {
        const { ip, dominio, url } = values || {};
        const isValid = !!(ip?.trim() || dominio?.trim() || url?.trim());
        if (!isValid) {
          return context.createError({ message: 'At least one of IP, Domain or URL must be filled', path: 'at-least-one-field' });
        }
      }
    ),
    onSubmit: (values) => {
      const newAsset: AssetType = {
        ...values,
        id: asset?.id || undefined, // Only include `id` if updating
        domain: values.dominio,
        hostname: values.uuid.length > 0 ? values.uuid : values.name,
        uuid: values.uuid.length > 0 ? values.uuid : crypto.randomUUID(),
      };

      if (asset) {
        dispatch(editAsset(newAsset));
        onSubmit('Asset updated successfully', 'success'); // Show success message for update
        formik.resetForm(
          { values: { name: '', ip: '', dominio: '', url: '', hostname: '', uuid: '' } }
        );
      } else {
        dispatch(createAsset(newAsset));
        onSubmit('Asset created successfully', 'success'); // Show success message for create
        formik.resetForm(
          { values: { name: '', ip: '', dominio: '', url: '', hostname: '', uuid: '' } }
        );
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={formik.handleSubmit} >
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
        {formik.errors['at-least-one-field'] && (
          <Typography color="error">{formik.errors['at-least-one-field']}</Typography>
        )}
        <Box mt={2}>
          {
            !loading ? <Button type="submit" variant="contained" color="primary" fullWidth>
              {asset ? 'Edit' : 'Create'}
            </Button> : <LinearProgress />
          }

        </Box>
      </Box>
    </Container>
  );
};

export default CreateUpdateAsset;
