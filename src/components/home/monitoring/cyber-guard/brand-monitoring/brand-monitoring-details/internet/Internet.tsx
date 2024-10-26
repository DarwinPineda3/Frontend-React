//basic component

import { Grid, Typography } from '@mui/material';
import BreachElementTypeChart from '../../charts/breachByElementTypeChart';
import OrgBreachesChart from '../../charts/OrgBreachesChart';
import { Data } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import InternetIndicators from './InternetIndicators';
import InternetAccordion from './InternetAccordion';

interface InternetProps {
  brandMonitoringDetail: Data;
}

const Internet: React.FC<InternetProps> = ({ brandMonitoringDetail }) => {
  const InternetData = brandMonitoringDetail?.consolidated_data?.internet_data || [];

  if (InternetData.length === 0) {
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
        <InternetIndicators
          internetCounters={brandMonitoringDetail.consolidated_data?.internet_counters}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <BreachElementTypeChart
          security_leaks_data_chart={
            brandMonitoringDetail.consolidated_data?.graphics_charts_internet
          }
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <OrgBreachesChart
          security_leaks_data_chart={
            brandMonitoringDetail.consolidated_data?.graphics_charts_internet
          }
        />
      </Grid>

      <Grid item xs={12} lg={12}>
        <InternetAccordion internet_data={InternetData} />
      </Grid>
    </Grid>
  );
};

export default Internet;
