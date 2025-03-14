import { Dashboard } from '@mui/icons-material';
import {
  Box,
  Button,
  Stack,
  Alert,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ComplianceAsset, createAsset, editAsset } from 'src/store/sections/compliance/giotoAssetsSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import * as Yup from 'yup';
import DashboardCard from 'src/components/shared/DashboardCard';

interface Props {
  asset?: ComplianceAsset; // Optional for edit
  onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void;
}

const CreateUpdateGiottoAsset: React.FC<Props> = ({ asset, onSubmit }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { loading } = useSelector((state: any) => state.GiottoAssetsReducer);


  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      name: asset?.name || '',
      networkAddress: asset?.networkAddress || '',
      description: asset?.description || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('giotto.assets.name_required') || ''),
      networkAddress: Yup.string()
        .required(t('giotto.assets.ip_required') || '')
        .matches(
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
          t('giotto.assets.ip_invalid_format') || ''
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
          onSubmit(t('giotto.assets.asset_updated') || '', 'success');
          //clear the form
          formik.resetForm();
        } else {
          await dispatch(createAsset(newAsset)); // Use await to handle the promise
          onSubmit(t('giotto.assets.asset_created') || '', 'success');
          formik.resetForm();
        }
      } catch (error) {
        console.error('Error processing the asset:', error); // Log detailed error for debugging
        onSubmit(t('giotto.assets.asset_error') || '', 'error');
      }

    },
  });

  return (
    <DashboardCard
      title={asset ? t('giotto.assets.edit_asset') || '' : t('giotto.assets.create_asset') || ''}
      subtitle={asset ? t('giotto.assets.edit_asset_subtitle') || '' : t('giotto.assets.create_asset_subtitle') || ''}
    >
      
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Stack spacing={3}>
        <TextField
          fullWidth
          margin="normal"
          label={t('giotto.assets.name')}
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
          label={t('giotto.assets.ip_address')}
          name="networkAddress"
          value={formik.values.networkAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.networkAddress && Boolean(formik.errors.networkAddress)}
          helperText={formik.touched.networkAddress && formik.errors.networkAddress}
        />

         <Alert severity="info" sx={{ marginTop: 2 }}>
          <Typography variant="body2" color="textSecondary">
            {t('giotto.assets.form_instruction')}
          </Typography>
         </Alert>

         <Box mt={2}>
          {
            !loading ? (<Button type="submit" variant="contained" color="primary" >
              {asset ? t('giotto.assets.edit_asset') || '' : t('giotto.assets.create_asset') || ''}
                    </Button>) : <LinearProgress />
          }

         </Box>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default CreateUpdateGiottoAsset;
