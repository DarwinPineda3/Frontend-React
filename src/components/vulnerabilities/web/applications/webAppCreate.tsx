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
import { createWebApplicationScan } from 'src/store/vulnerabilities/web/WebAplicationsSlice';
import {
  ResponseData,
  ScanConfig
} from 'src/types/vulnerabilities/network/networkScansType';
import { WebAppScanCreate } from 'src/types/vulnerabilities/web/webAppsType';
import * as Yup from 'yup';

interface Props {
  webAppCreate: ResponseData;
  onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void;
}

const WebAppCreateForm: React.FC<Props> = ({ webAppCreate, onSubmit }) => {
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
        `${t('vulnerabilities.web_app.required_field')}`,
      ),
      name: Yup.string().required(`${t('vulnerabilities.web_app.required_field')}`),
      scan_config_id: Yup.string().required(
        `${t('vulnerabilities.web_app.required_field')}`,
      ),
    }),
    onSubmit: async (values) => {
      const newNetworkScan: WebAppScanCreate = {
        ...values,
      };
      setIsSubmitting(true);
      try {
        await dispatch(createWebApplicationScan(newNetworkScan));
        onSubmit(
          `${t('vulnerabilities.web_app.network_scan_create_successfully')}`,
          'success',
        );
      } catch (error) {
        console.error('Error creating network scan:', error);
        onSubmit(
          `${t('vulnerabilities.web_app.network_scan_create_failed')}`,
          'error',
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <DashboardCard
      title={t('vulnerabilities.web_app.create_network_scan')!}
      subtitle={t('vulnerabilities.web_app.create_network_scan_subtitle')!}
    >
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label={t('vulnerabilities.web_app.name')}
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin="normal"
            />
          </Grid>

          {/* Hosts */}
          <Grid item xs={12} sm={6} >
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
                {t('vulnerabilities.web_app.scan_target')}
              </MenuItem>
              {webAppCreate.assets.
                filter((asset) => asset.url).
                map((asset) => (
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
              {t('vulnerabilities.web_app.you_can_create_an_asset')}{' '}
              <a
                href="/home/assets"
                style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}
              >
                {t('vulnerabilities.web_app.here')}
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
                {t('vulnerabilities.web_app.scan_config')}
              </MenuItem>
              {[{ "id": "passive_scan", "name": "Passive Scan" }, { "id": "active_scan", "name": "Active Scan" }].map((config: ScanConfig) => (
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
            {isSubmitting ? '' : t('vulnerabilities.web_app.create_scan')}
          </Button>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default WebAppCreateForm;
