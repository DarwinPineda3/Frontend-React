import React from 'react';
import { Box } from '@mui/material';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from 'src/components/shared/DashboardCard';

interface BrandMonitoringChartProps {
  data: any[];
}

const BrandMonitoringChart: React.FC<BrandMonitoringChartProps> = ({ data }) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.grey[400];
  const secondary = theme.palette.info.main;

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 280,
    },
    colors: [primary, primarylight, secondary],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '35%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories: data.map((entry: any) => entry.query) || [],
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  const chartSeries = [
    {
      name: 'Total Results',
      data: data.map((entry: any) => entry.total_results) || [],
    },
  ];

  return (
    <DashboardCard title="Total Results by Query"> 
      <Box mb={3}>
        <Chart
          options={options}
          series={chartSeries}
          type="bar"
          height={200}
        />
      </Box>
    </DashboardCard>
  );
};

export default BrandMonitoringChart;