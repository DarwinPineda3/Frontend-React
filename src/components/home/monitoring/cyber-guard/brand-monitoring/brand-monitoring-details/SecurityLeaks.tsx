//basic component

import { Grid, Typography } from '@mui/material';
import SecurityLeaksIndicators from './SecurityLeaksIndicators';
import BreachElementTypeChart from '../charts/breachByElementTypeChart';
import OrgBreachesChart from '../charts/OrgBreachesChart';
import SecurityLeaksAccordion from './SecurityLeaksAccordion';
import { Data } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';

interface SecurityLeaksProps {
  brandMonitoringDetail: Data;
}

const SecurityLeaks: React.FC<SecurityLeaksProps> = ({ brandMonitoringDetail }) => {
  const securityLeaksData = brandMonitoringDetail.consolidated_data?.security_leaks_data || [];

  if (securityLeaksData.length === 0) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">No security leaks data available.</Typography>
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
        <SecurityLeaksAccordion security_leaks_data={securityLeaksData} />
      </Grid>
    </Grid>
  );
};

export default SecurityLeaks;
