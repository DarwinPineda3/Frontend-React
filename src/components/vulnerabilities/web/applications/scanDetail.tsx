import { Box, Chip, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import { AppState, useDispatch, useSelector } from 'src/store/Store';
import { fetchWebApplicationData } from 'src/store/vulnerabilities/web/WebAplicationsSlice';
import ScanAlertTable from './scanAlertTable';

const ScanListDetail: React.FC<{ scanId: string, onAlertClick: (alertId: number) => void; }> = ({ scanId, onAlertClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading, detail, error } = useSelector((state: AppState) => state.WebApplicationsReducer);
  useEffect(() => {
    if (scanId) {
      dispatch(fetchWebApplicationData(scanId));
    }
  }, [dispatch, scanId]);

  if (loading || detail === null) {
    return <DashboardCard title={t('vulnerabilities.scan_details')!} subtitle={t('vulnerabilities.scan_details')!}>
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Loader />
      </Box>
    </DashboardCard>;
  }

  return (
    <Grid container>
      <Grid item xs={12} xl={12}>
        <Breadcrumb title={detail.name ?? detail.id}>
          <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
            <Chip label={`${t('vulnerabilities.date')}: ${detail.date}`} color="primary" variant="outlined" />
            <Chip label={`${t('vulnerabilities.version')}: ${detail.version}`} color="secondary" variant="outlined" />
            <Chip label={`${t('vulnerabilities.site_url')}: ${detail.hosts_name}`} color="info" variant="outlined" />
            <Chip label={`${t('vulnerabilities.false_positives')}: ${detail.false_positives_count}`} color="warning" variant="outlined" />
          </Box>
        </Breadcrumb>
      </Grid>

      <Grid item xs={12} xl={12}>
        <DashboardCard>
          <ScanAlertTable alerts={detail.alerts} onAlertClick={onAlertClick} />
        </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default ScanListDetail;
