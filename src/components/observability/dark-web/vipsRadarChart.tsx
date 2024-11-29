import { useTheme } from '@mui/material';
import React from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

interface CompromisedTypesChartProps {
  data: number[];
}

const CompromisedTypesChart: React.FC<CompromisedTypesChartProps> = ({ data }) => {
  const theme = useTheme();
  const { t } = useTranslation();


  const options = {
    chart: {
      type: 'donut',  // Set to 'pie' if you prefer a pie chart instead
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
    },
    labels: [
      t('monitoring.malware'),
      t('monitoring.fake_apps'),
      t('monitoring.data_leaks'),
      t('monitoring.social_media')
    ],
    colors: [
      theme.palette.error.main,       // Red for Malware
      theme.palette.warning.main,     // Yellow for Fake Apps
      theme.palette.info.main,        // Blue for Data Leaks
      theme.palette.secondary.main,   // Purple for Social Media
    ],
    legend: {
      show: true,
      position: 'top' as 'top',
      horizontalAlign: 'center',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '50%',
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
    <DashboardCard title={t('monitoring.compromised_elements_by_type')!}>
      <Chart options={options} series={data} type="donut" height='300px' />
    </DashboardCard>
  );
};

export default CompromisedTypesChart;
