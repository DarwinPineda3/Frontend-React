//basic component

import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Data } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import NoDataAvailable from 'src/views/general/NoDataAvailable';
import BreachElementTypeChart from '../../charts/breachByElementTypeChart';
import OrgBreachesChart from '../../charts/OrgBreachesChart';
import SentimentAnalysisChart from '../../charts/sentimentAnalysisChart';
import SocialNetworksIndicators from '../social-networks/SocialNetworksIndicators';
import SocialNetworksAccordion from './SocialNetworksAccordion';

interface SecurityLeaksProps {
  brandMonitoringDetail: Data;
  accordionId: string;
}

const SocialNetworks: React.FC<SecurityLeaksProps> = ({ brandMonitoringDetail, accordionId }) => {
  const { t } = useTranslation();
  const socialNetworksData = brandMonitoringDetail?.consolidated_data?.social_networks_data || [];

  if (socialNetworksData.length === 0) {
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
        <SocialNetworksIndicators
          socialNetworkCounters={brandMonitoringDetail.consolidated_data?.social_networks_counters}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <BreachElementTypeChart
          security_leaks_data_chart={
            brandMonitoringDetail.consolidated_data?.graphics_charts_social_networks
          }
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <OrgBreachesChart
          security_leaks_data_chart={
            brandMonitoringDetail.consolidated_data?.graphics_charts_social_networks
          }
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <SentimentAnalysisChart
          social_networks_sentiment_analysis_chart={
            brandMonitoringDetail.consolidated_data
              ?.graphics_charts_social_networks_sentiment_analysis
          }
        />
      </Grid>

      <Grid item xs={12} lg={12}>
        <SocialNetworksAccordion
          social_network_data={socialNetworksData}
          accordionId={accordionId}
        />
      </Grid>
    </Grid>
  );
};

export default SocialNetworks;
