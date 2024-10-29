import Chart from 'react-apexcharts';
import DashboardCard from '../../../../../shared/DashboardCard'; // Replace with your correct card component
import { useTheme } from '@mui/material';
import { GraphicsCharts } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import { useTranslation } from 'react-i18next';

interface SentimentAnalysisChartProps {
  social_networks_sentiment_analysis_chart: GraphicsCharts;
}

const SentimentAnalysisChart: React.FC<SentimentAnalysisChartProps> = ({
  social_networks_sentiment_analysis_chart,
}) => {
  const { t } = useTranslation();

  const labels = social_networks_sentiment_analysis_chart.labels || [];
  const series = social_networks_sentiment_analysis_chart.values || [];

  const theme = useTheme();
  const colors = [
    theme.palette.error.main, // Red for Domain
    theme.palette.info.main, // Blue for P. Email
    theme.palette.warning.main, // Yellow for IP
    theme.palette.secondary.main, // Purple for Username
    theme.palette.success.main, // Green for Phone
  ];

  const options = {
    chart: {
      type: 'donut' as 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
    },
    labels: labels,
    colors: colors,
    legend: {
      show: true,
      position: 'top' as 'top',
      horizontalAlign: 'center' as 'center',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
    },
  };

  return (
    <DashboardCard title={t('monitoring.sentiment_analysis_for_social_network')}>
      <Chart options={options} series={series} type="donut" height="300" />
    </DashboardCard>
  );
};

export default SentimentAnalysisChart;
