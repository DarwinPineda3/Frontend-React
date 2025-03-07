import { Box, Button, CircularProgress, Grid, MenuItem, Select, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { createNetworkObservabilityScan } from 'src/store/observability/ObservabilityNetworkSlice';
import { fetchFilteredAssets } from 'src/store/sections/AssetsSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import { ScanConfig } from 'src/types/vulnerabilities/network/networkScansType';
import * as Yup from 'yup';

interface Props {
  onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void;
}

const configs = [
  { id: 'ping', name: 'Ping Sweep' },
  { id: 'ports_tcp', name: 'TCP port scanning' },
  { id: 'ports_fast_tcp', name: 'Fast TCP port scanning' },
  { id: 'ports_udp', name: 'UDP port scanning' },
  { id: 'ports_udp_tcp', name: 'Port scanning with TCP services' },
];

const NetworkObsScansCreate: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const assets = useSelector((state: any) => state.assetsReducer.assets);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFilteredAssets({ ip: true, domain: true }));
    };
    fetchData();
  }, [dispatch]);

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      hosts: '',
      config: '',
    },
    validationSchema: Yup.object({
      hosts: Yup.string().required(
        `${t('vulnerabilities.network_vulnerabilities.required_field')}`,
      ),
      config: Yup.string().required(
        `${t('vulnerabilities.network_vulnerabilities.required_field')}`,
      ),
    }),
    onSubmit: async (values) => {
      const newNetworkScan = {
        ...values,
      };
      setIsSubmitting(true);
      try {
        await dispatch(createNetworkObservabilityScan(newNetworkScan));
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
              {assets?.map((asset: any) => (
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
              name="config"
              value={formik.values.config}
              onChange={formik.handleChange}
              error={formik.touched.config && Boolean(formik.errors.config)}
              displayEmpty
              inputProps={{ 'aria-label': 'Select Scan Config' }}
            >
              <MenuItem value="" disabled>
                {t('vulnerabilities.network_vulnerabilities.scan_config')}
              </MenuItem>
              {configs.map((config: ScanConfig) => (
                <MenuItem key={config.id} value={config.id}>
                  {config.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.config && formik.errors.config && (
              <Box color="error.main" mt={1} fontSize="0.75rem">
                {formik.errors.config}
              </Box>
            )}
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-start" mt={2}>
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

export default NetworkObsScansCreate;
