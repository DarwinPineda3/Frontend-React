import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { fetchFilteredAssets } from 'src/store/sections/AssetsSlice';
import {
  createScheduleScan,
  fetchScheduleScanCreateData,
} from 'src/store/sections/schedule-scans-settings/ScheduleScansSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import { ScheduledTaskType } from 'src/types/schedule-scans-settings/schedule_scans_type';
import { NetworkScanType } from 'src/types/vulnerabilities/network/networkScansType';
import { getExecutionFrequencyLabels, getScanTypeLabels } from 'src/utils/scanLabels';
import * as Yup from 'yup';
import DashboardCard from '../shared/DashboardCard';

interface Props {
  onSubmit: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void;
}

const ScheduleScanForm: React.FC<Props> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const networkScans = useSelector((state: any) => state.scheduleScansReducer.networkScans);
  const assets = useSelector((state: any) => state.assetsReducer.assets);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchScheduleScanCreateData());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      scanType: '1',
      name: '',
      frequency: '1',
      executionTime: '',
      selectedAsset: '',
      networkScan: {
        elastic_task_id: '',
        openvas_task_id: '',
        asset_id: '',
      },
    },
    validationSchema: Yup.object({
      scanType: Yup.number().required(
        t('settings.scheduled_scans.form.validations.scan_type_required')!,
      ),
      name: Yup.string().required(t('settings.scheduled_scans.form.validations.name_required')!),
      frequency: Yup.string().required(
        t('settings.scheduled_scans.form.validations.execution_frequency_required')!,
      ),
      executionTime: Yup.string().required(
        t('settings.scheduled_scans.form.validations.execution_time_required')!,
      ),
      networkScan: Yup.object({
        elastic_task_id: Yup.string().when('scanType', {
          is: 1,
          then: Yup.string().required(
            t('settings.scheduled_scans.form.validations.select_task_required')!,
          ),
          otherwise: Yup.string(),
        }),
        openvas_task_id: Yup.string().when('scanType', {
          is: 1,
          then: Yup.string().required(
            t('settings.scheduled_scans.form.validations.select_task_required')!,
          ),
          otherwise: Yup.string(),
        }),
      }).test(
        'at-least-one',
        t('settings.scheduled_scans.form.validations.select_task_required')!,
        (value, context) => {
          if (context.parent.scanType === 1) {
            return value?.elastic_task_id || value?.openvas_task_id;
          }
          return true;
        },
      ),
      selectedAsset: Yup.string().required(
        t('settings.scheduled_scans.form.validations.asset_required')!,
      ),
    }),
    onSubmit: async (values) => {
      const payload: ScheduledTaskType = {
        scan_type: values.scanType,
        name: values.name,
        asset: values.selectedAsset,
        execution_frequency: values.frequency,
        execution_time: `${new Date().toISOString().split('T')[0]}T${values.executionTime}:00.000Z`,
        elastic_task_id: values.networkScan?.elastic_task_id,
        openvas_task_id: values.networkScan?.openvas_task_id,
        is_active: true,
      };
      try {
        await dispatch(createScheduleScan(payload));
        onSubmit(`${t('settings.scheduled_scans.form.success.scan_scheduled')}`, 'success');
      } catch (error) {
        console.error('Error al enviar vulnerabilidad:', error);
        onSubmit(`${t('settings.scheduled_scans.form.error.scan_schedule_failed')}`, 'error');
      }
    },
  });

  const scanTypeLabels = getScanTypeLabels(t);
  const executionFrequencyLabels = getExecutionFrequencyLabels(t);

  useEffect(() => {
    const fetchDataFilteredAssets = async () => {
      if (formik.values.scanType !== '1') {
        let filters = {};

        if (formik.values.scanType === '2' || formik.values.scanType === '3') {
          filters = { url: true };
        } else if (formik.values.scanType === '4') {
          filters = { url: true, domain: true };
        }

        await dispatch(fetchFilteredAssets(filters));
      }
    };
    fetchDataFilteredAssets();
  }, [formik.values.scanType, dispatch]);

  return (
    <DashboardCard
      title={t('configuration.create_scheduled_scan') as string}
      subtitle={t('configuration.create_scheduled_scan_subtitle') as string}
    >
      <Box component="form" onSubmit={formik.handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="scanType-label" shrink>
            {t('scan.type')}
          </InputLabel>
          <Select
            labelId="scanType-label"
            id="scanType"
            name="scanType"
            value={formik.values.scanType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.scanType && Boolean(formik.errors.scanType)}
          >
            {Object.keys(scanTypeLabels).map((key) => (
              <MenuItem key={key} value={key}>
                {scanTypeLabels[parseInt(key)]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          id="name"
          name="name"
          label={t('scan.name')}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          InputLabelProps={{ shrink: true }}
        />

        {formik.values.scanType === '1' && (
          <FormControl fullWidth margin="normal">
            <InputLabel id="networkScan-label" shrink>
              {t('settings.scheduled_scans.form.label_task')}
            </InputLabel>
            <Select
              labelId="networkScan-label"
              id="networkScan"
              name="networkScan"
              value={formik.values.networkScan?.elastic_task_id || ''}
              onChange={(event) => {
                const selectedScan = networkScans.find(
                  (scan: NetworkScanType) => scan.id_elastic === event.target.value,
                );
                if (selectedScan) {
                  formik.setFieldValue('networkScan', {
                    elastic_task_id: selectedScan.id_elastic,
                    openvas_task_id: selectedScan.id,
                  });
                  formik.setFieldValue('selectedAsset', `${selectedScan.asset_id}`);
                }
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.networkScan && Boolean(formik.errors.networkScan)}
            >
              {isLoading ? (
                <MenuItem disabled>{t('loading')}</MenuItem>
              ) : networkScans.length > 0 ? (
                networkScans.map((scan: NetworkScanType) => (
                  <MenuItem key={scan.id} value={scan.id_elastic}>
                    {scan.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>{t('settings.scheduled_scans.form.no_tasks')}</MenuItem>
              )}
            </Select>
            {formik.touched.networkScan && formik.errors.networkScan?.elastic_task_id && (
              <Typography variant="body2" color="error" sx={{ mt: 1, ml: 1 }}>
                {formik.errors.networkScan.elastic_task_id}
              </Typography>
            )}
            {formik.touched.networkScan && (
              <Typography variant="body2" color="error" sx={{ mt: 1, ml: 1 }}>
                {formik.errors.networkScan}
              </Typography>
            )}
            {networkScans.length === 0 && !isLoading && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1, ml: 1 }}>
                {t('settings.scheduled_scans.form.create_scan')}{' '}
                <Link component={RouterLink} to="/vulnerabilities/network/scans/create">
                  {t('settings.scheduled_scans.form.task')}
                </Link>
              </Typography>
            )}
          </FormControl>
        )}
        {formik.values.scanType !== '1' && assets && assets.length > 0 && (
          <FormControl fullWidth margin="normal">
            <InputLabel id="asset-select-label">{t('scan.select_asset')}</InputLabel>
            <Select
              labelId="asset-select-label"
              id="selectedAsset"
              name="selectedAsset"
              value={formik.values.selectedAsset}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.selectedAsset && Boolean(formik.errors.selectedAsset)}
            >
              {assets.map((asset: any) => (
                <MenuItem key={asset.id} value={asset.id}>
                  {asset.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.selectedAsset && formik.errors.selectedAsset && (
              <Typography variant="body2" color="error">
                {formik.errors.selectedAsset}
              </Typography>
            )}
          </FormControl>
        )}

        <FormControl fullWidth margin="normal">
          <InputLabel>{t('scan.execution_frequency')}</InputLabel>
          <Select
            id="frequency"
            name="frequency"
            value={formik.values.frequency}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.frequency && Boolean(formik.errors.frequency)}
          >
            {Object.keys(executionFrequencyLabels).map((key) => (
              <MenuItem key={key} value={key}>
                {executionFrequencyLabels[parseInt(key)]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          id="executionTime"
          name="executionTime"
          label={t('scan.execution_time')}
          type="time"
          value={formik.values.executionTime}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.executionTime && Boolean(formik.errors.executionTime)}
          helperText={formik.touched.executionTime && formik.errors.executionTime}
          InputLabelProps={{ shrink: true }}
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          {t('configuration.create')}
        </Button>
      </Box>
    </DashboardCard>
  );
};

export default ScheduleScanForm;
