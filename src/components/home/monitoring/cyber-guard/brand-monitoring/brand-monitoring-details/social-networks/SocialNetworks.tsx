//basic component

import { Grid, Typography } from '@mui/material';
import SocialNetworksIndicators from '../social-networks/SocialNetworksIndicators';
import BreachElementTypeChart from '../../charts/breachByElementTypeChart';
import OrgBreachesChart from '../../charts/OrgBreachesChart';
import { Data } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import SocialNetworksAccordion from './ SocialNetworksAccordion';

interface SecurityLeaksProps {
  brandMonitoringDetail: Data;
}

const SocialNetworks: React.FC<SecurityLeaksProps> = ({ brandMonitoringDetail }) => {
  const socialNetworksData = brandMonitoringDetail?.consolidated_data?.social_networks_data || [];

  if (socialNetworksData.length === 0) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">No social networks data available.</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SocialNetworksIndicators
          socialNetworkCounters={brandMonitoringDetail.consolidated_data?.social_networks_counters}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <BreachElementTypeChart
          security_leaks_data_chart={
            brandMonitoringDetail.consolidated_data?.graphics_charts_social_networks
          }
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <OrgBreachesChart
          security_leaks_data_chart={
            brandMonitoringDetail.consolidated_data?.graphics_charts_social_networks
          }
        />
      </Grid>

      <Grid item xs={12} lg={12}>
        <SocialNetworksAccordion social_network_data={socialNetworksData} />
      </Grid>
    </Grid>
  );
};

export default SocialNetworks;
