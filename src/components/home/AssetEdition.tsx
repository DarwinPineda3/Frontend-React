import { Alert, Box, Button, LinearProgress, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { createAsset, editAsset } from 'src/store/sections/AssetsSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import { AssetType } from 'src/types/assets/asset';
import * as Yup from 'yup';
import PageContainer from '../container/PageContainer';

interface Props {
  asset?: AssetType; // Optional for edit
  onSubmit: () => void; // Callback after submission
}

const CreateUpdateAsset: React.FC<Props> = ({ asset, onSubmit }) => {
  const { t } = useTranslation();
  const { loading, error } = useSelector((state: any) => state.assetsReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      name: asset?.name || '',
      ip: asset?.ip || '',
      dominio: asset?.domain || '',
      url: asset?.url || '',
      hostname: asset?.hostname || '',
      uuid: asset?.uuid || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('home.assets.name_required')!),
      ip: Yup.string()
        .nullable()
        .matches(
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
          t('home.assets.ip_invalid_format')!,
        ),
      dominio: Yup.string()
        .nullable()
        .matches(
          /^([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$/,
          t('home.assets.domain_invalid_format')!,
        ),
      url: Yup.string().nullable().url(t('home.assets.url_invalid_format')!),
      hostname: Yup.string(),
    }).test(
      'at-least-one-field',
      t('home.assets.at_least_one_required')!,
      function (values, context) {
        const { ip, dominio, url } = values || {};
        const isValid = !!(ip?.trim() || dominio?.trim() || url?.trim());
        if (!isValid) {
          return context.createError({
            message: t('home.assets.at_least_one_required') || '',
            path: 'at-least-one-field',
          });
        }
      },
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
        dispatch(editAsset(newAsset, t));
        onSubmit();
        formik.resetForm({
          values: { name: '', ip: '', dominio: '', url: '', hostname: '', uuid: '' },
        });
      } else {
        dispatch(createAsset(newAsset, t));
        onSubmit();
        formik.resetForm({
          values: { name: '', ip: '', dominio: '', url: '', hostname: '', uuid: '' },
        });
        navigate('/home/assets', {
          state: {
            snackbarMessage: t('home.assets.asset_created_success'),
            snackbarSeverity: 'success',
          },
        });
      }
    },
  });

  return (
    <PageContainer title="Akila">
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Stack spacing={3}>
          <Typography variant="h5" gutterBottom>
            {asset ? t('home.assets.edit_asset') : t('home.assets.create_asset')}
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label={t('home.assets.name')}
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
            label={t('home.assets.ip_address')}
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
            label={t('home.assets.domain')}
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
            label={t('home.assets.url')}
            name="url"
            value={formik.values.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.url && Boolean(formik.errors.url)}
            helperText={formik.touched.url && formik.errors.url}
          />
          {(formik.errors as any)['at-least-one-field'] && (
            <Typography color="error">{t('home.assets.at_least_one_required')}</Typography>
          )}

          <Alert severity="info">
            <Typography variant="body2" color="textSecondary">
              {t('home.assets.form_instruction')}
            </Typography>
          </Alert>

          <Box>
            {!loading ? (
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {asset ? t('home.assets.edit') : t('home.assets.create')}
              </Button>
            ) : (
              <LinearProgress />
            )}
          </Box>
        </Stack>
      </Box>
    </PageContainer>
  );
};

export default CreateUpdateAsset;
