import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useDispatch } from 'src/store/Store';
import { createNetworkScan } from 'src/store/vulnerabilities/network/NetworkScansSlice';
import {
  NetworkScanCreate,
  ResponseData,
  ScanConfig,
} from 'src/types/vulnerabilities/network/networkScansType';
import * as Yup from 'yup';

interface Props {
  networkScanCreate: ResponseData;
  onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void;
}

const NetworkScanCreateForm: React.FC<Props> = ({ networkScanCreate, onSubmit }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      comment: '',
      hosts: '',
      name: '',
      scan_config_id: '',
    },
    validationSchema: Yup.object({
      comment: Yup.string(),
      hosts: Yup.string().required(
        `${t('vulnerabilities.network_vulnerabilities.required_field')}`,
      ),
      name: Yup.string().required(`${t('vulnerabilities.network_vulnerabilities.required_field')}`),
      scan_config_id: Yup.string().required(
        `${t('vulnerabilities.network_vulnerabilities.required_field')}`,
      ),
    }),
    onSubmit: async (values) => {
      const newNetworkScan: NetworkScanCreate = {
        ...values,
      };
      setIsSubmitting(true);
      try {
        await dispatch(createNetworkScan(newNetworkScan));
        onSubmit(
          `${t('vulnerabilities.network_vulnerabilities.network_scan_create_successfully')}`,
          'success',
        );
      } catch (error) {
        console.error('Error creating network scan:', error);
        onSubmit(
          `${t('vulnerabilities.network_vulnerabilities.network_scan_create_failed')}`,
          'error',
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <DashboardCard
      title={t('vulnerabilities.network_vulnerabilities.create_network_scan')!}
      subtitle={t('vulnerabilities.network_vulnerabilities.create_network_scan_subtitle')!}
    >
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('vulnerabilities.network_vulnerabilities.name')}
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin="normal"
            />
          </Grid>

          {/* Comment */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('vulnerabilities.network_vulnerabilities.comment')}
              name="comment"
              value={formik.values.comment}
              onChange={formik.handleChange}
              error={formik.touched.comment && Boolean(formik.errors.comment)}
              helperText={formik.touched.comment && formik.errors.comment}
              margin="normal"
            />
          </Grid>

          {/* Hosts */}
          <Grid item xs={12} sm={6}>
            <Select
              fullWidth
              name="hosts"
              value={formik.values.hosts}
              onChange={formik.handleChange}
              error={formik.touched.hosts && Boolean(formik.errors.hosts)}
              displayEmpty
              inputProps={{ 'aria-label': 'Select Hosts' }}
            >
              <MenuItem value="" disabled>
                {t('vulnerabilities.network_vulnerabilities.scan_target')}
              </MenuItem>
              {networkScanCreate.assets.map((asset) => (
                <MenuItem key={asset.id} value={asset.id}>
                  {asset.name} ({asset.ip || asset.domain || asset.url})
                </MenuItem>
              ))}
            </Select>
            {formik.touched.hosts && formik.errors.hosts && (
              <Box color="error.main" mt={1} fontSize="0.75rem">
                {formik.errors.hosts}
              </Box>
            )}
            <Box mt={1} fontSize="0.875rem">
              {t('vulnerabilities.network_vulnerabilities.you_can_create_an_asset')}{' '}
              <a
                href="/home/assets"
                style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}
              >
                {t('vulnerabilities.network_vulnerabilities.here')}
              </a>
            </Box>
          </Grid>

          {/* Scan Config ID */}
          <Grid item xs={12} sm={6}>
            <Select
              fullWidth
              name="scan_config_id"
              value={formik.values.scan_config_id}
              onChange={formik.handleChange}
              error={formik.touched.scan_config_id && Boolean(formik.errors.scan_config_id)}
              displayEmpty
              inputProps={{ 'aria-label': 'Select Scan Config' }}
            >
              <MenuItem value="" disabled>
                {t('vulnerabilities.network_vulnerabilities.scan_config')}
              </MenuItem>
              {networkScanCreate.scan_configs
                .filter((config) => config.name === 'Full and fast') // Filtrar por el nombre "Full and fast"
                .map((config: ScanConfig) => (
                  <MenuItem key={config.id} value={config.id}>
                    {config.name}
                  </MenuItem>
                ))}
            </Select>
            {formik.touched.scan_config_id && formik.errors.scan_config_id && (
              <Box color="error.main" mt={1} fontSize="0.75rem">
                {formik.errors.scan_config_id}
              </Box>
            )}
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            sx={{ width: 'auto' }}
          >
            {isSubmitting ? '' : t('vulnerabilities.network_vulnerabilities.create_scan')}
          </Button>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default NetworkScanCreateForm;
