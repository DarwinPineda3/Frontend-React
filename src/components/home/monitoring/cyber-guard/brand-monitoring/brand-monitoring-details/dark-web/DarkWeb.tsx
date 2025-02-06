//basic component

import { Grid, Typography } from '@mui/material';
import BreachElementTypeChart from '../../charts/breachByElementTypeChart';
import OrgBreachesChart from '../../charts/OrgBreachesChart';
import { Data } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import DarkWebAccordion from './DarkWebAccordion';
import DarkWebIndicators from './DarkWebIndicators';
import { useTranslation } from 'react-i18next';
import NoDataAvailable from 'src/views/general/NoDataAvailable';

interface DarkWebProps {
  brandMonitoringDetail: Data;
}

const DarkWeb: React.FC<DarkWebProps> = ({ brandMonitoringDetail }) => {
  
  const { t } = useTranslation();
  const DarkWebData = brandMonitoringDetail?.consolidated_data?.dark_web_data || [];

  if (DarkWebData.length === 0) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NoDataAvailable entityType='monitoring'/>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DarkWebIndicators
          darkWebCounters={brandMonitoringDetail.consolidated_data?.dark_web_counters}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <BreachElementTypeChart
          security_leaks_data_chart={
            brandMonitoringDetail.consolidated_data?.graphics_charts_dark_web
          }
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <OrgBreachesChart
          security_leaks_data_chart={
            brandMonitoringDetail.consolidated_data?.graphics_charts_dark_web
          }
        />
      </Grid>

      <Grid item xs={12} lg={12}>
        <DarkWebAccordion dark_web_data={DarkWebData} />
      </Grid>
    </Grid>
  );
};

export default DarkWeb;
