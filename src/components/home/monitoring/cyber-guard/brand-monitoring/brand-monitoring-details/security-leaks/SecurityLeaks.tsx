//basic component

import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Data } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import NoDataAvailable from 'src/views/general/NoDataAvailable';
import BreachElementTypeChart from '../../charts/breachByElementTypeChart';
import OrgBreachesChart from '../../charts/OrgBreachesChart';
import SecurityLeaksIndicators from '../security-leaks/SecurityLeaksIndicators';
import SecurityLeaksAccordion from './SecurityLeaksAccordion';

interface SecurityLeaksProps {
  brandMonitoringDetail: Data;
  accordionId: string;
}

const SecurityLeaks: React.FC<SecurityLeaksProps> = ({ brandMonitoringDetail, accordionId }) => {
  const { t } = useTranslation();

  const securityLeaksData = brandMonitoringDetail?.consolidated_data?.security_leaks_data || [];

  if (securityLeaksData.length === 0) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NoDataAvailable entityType="monitoring" />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SecurityLeaksIndicators
          securityLeakCounters={brandMonitoringDetail.consolidated_data?.security_leaks_counters}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <BreachElementTypeChart
          security_leaks_data_chart={
            brandMonitoringDetail.consolidated_data?.graphics_charts_security_leaks
          }
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <OrgBreachesChart
          security_leaks_data_chart={
            brandMonitoringDetail.consolidated_data?.graphics_charts_security_leaks
          }
        />
      </Grid>

      <Grid item xs={12} lg={12}>
        <SecurityLeaksAccordion security_leaks_data={securityLeaksData} accordionId={accordionId} />
      </Grid>
    </Grid>
  );
};

export default SecurityLeaks;
