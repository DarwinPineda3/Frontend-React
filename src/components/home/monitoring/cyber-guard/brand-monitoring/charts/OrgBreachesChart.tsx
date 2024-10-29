// import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../../../shared/DashboardCard';
// import Loader from '../../../../../shared/Loader/Loader'; // Loader component
import { ApexOptions } from 'apexcharts';  // Correct type
import { GraphicsCharts } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import { useTranslation } from 'react-i18next';

interface OrgBreachesChartChartProps {
  security_leaks_data_chart: GraphicsCharts;
}
const OrgBreachesChart: React.FC<OrgBreachesChartChartProps> = ({ security_leaks_data_chart }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.grey[400];
  const secondary = theme.palette.info.main;

  const labels = security_leaks_data_chart.labels || [];
  const series = [{ name: 'Breaches', data: security_leaks_data_chart.values || [] }];

  const optionsLineChart: ApexOptions = {
    chart: {
      id: 'line-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: [primary],
    xaxis: {
      categories: labels,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
    stroke: {
      curve: 'smooth',
    },
  };

  // Define options for radar chart
  const optionsRadarChart: ApexOptions = {
    chart: {
      id: 'radar-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: [primary],
    labels: labels,
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  // Define options for bar chart
  const optionsBarChart: ApexOptions = {
    chart: {
      id: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: [primary, primarylight, secondary],
    xaxis: {
      categories: labels,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '35%',
        distributed: true,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  // Determine which chart to display based on the number of labels
  let chartType;
  let chartOptions;

  if (labels.length < 3) {
    chartType = 'bar' as 'bar';
    chartOptions = optionsBarChart;
  } else if (labels.length > 6) {
    chartType = 'line' as 'line';
    chartOptions = optionsLineChart;
  } else {
    chartType = 'radar' as 'radar';
    chartOptions = optionsRadarChart;
  }

  return (
    <DashboardCard title={t('monitoring.organization_data_found')}>
      <Chart
        options={chartOptions}
        series={series}
        type={chartType}
        height="300px"
      />
    </DashboardCard>
  );
};

export default OrgBreachesChart;