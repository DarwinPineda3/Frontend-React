//basic component

import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Data } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import NoDataAvailable from 'src/views/general/NoDataAvailable';
import BreachElementTypeChart from '../../charts/breachByElementTypeChart';
import OrgBreachesChart from '../../charts/OrgBreachesChart';
import InternetAccordion from './InternetAccordion';
import InternetIndicators from './InternetIndicators';

interface InternetProps {
  brandMonitoringDetail: Data;
  accordionId: string;
}

const Internet: React.FC<InternetProps> = ({ brandMonitoringDetail, accordionId }) => {
  const { t } = useTranslation();

  const InternetData = brandMonitoringDetail?.consolidated_data?.internet_data || [];

  if (InternetData.length === 0) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NoDataAvailable entityType="monitoring" />
        </Grid>
      </Grid>
    );
  }

  const { graphics_charts_internet } = brandMonitoringDetail?.consolidated_data;
  const { labels, values } = graphics_charts_internet;

  const filteredGraphicsCharts = {
    labels: labels.filter((label) => label !== 'Correlations'),
    values: values.filter((_, index) => labels[index] !== 'Correlations'),
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <InternetIndicators
          internetCounters={brandMonitoringDetail.consolidated_data?.internet_counters}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <BreachElementTypeChart security_leaks_data_chart={filteredGraphicsCharts} />
      </Grid>

      <Grid item xs={12} lg={6}>
        <OrgBreachesChart security_leaks_data_chart={filteredGraphicsCharts} />
      </Grid>

      <Grid item xs={12} lg={12}>
        <InternetAccordion internet_data={InternetData} accordionId={accordionId} />
      </Grid>
    </Grid>
  );
};

export default Internet;
