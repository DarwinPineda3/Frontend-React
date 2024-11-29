import { useTheme } from '@mui/material';
import React from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

interface ThreatTypesBarChartProps {
  data: number[];
}

const ThreatTypesBarChart: React.FC<ThreatTypesBarChartProps> = ({ data }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  // Using theme colors for the chart bars
  const colors = [
    theme.palette.error.main,         // Red for Malware
    theme.palette.warning.main,       // Yellow for Fake Apps
    theme.palette.info.main,          // Blue for Phishing
    theme.palette.success.main,       // Green for Social Engineering
    theme.palette.secondary.main,     // Purple for Ransomware
    theme.palette.success.light,      // Light Green for Spyware
  ];

  const options = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        endingShape: 'rounded',
        distributed: true,  // Each bar has its own color
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [
        t('monitoring.malware'),
        t('monitoring.fake_apps'),
        t('monitoring.phishing'),
        t('monitoring.social_media'),
      ],
      labels: {
        show: true,
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: t('monitoring.count_of_incidents'),
      },
    },
    fill: {
      opacity: 1,
    },
    colors: colors, // Theme-based colors
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return `${val}`;
        },
      },
    },
  };

  const series = [
    {
      name: t('monitoring.threat_types'),
      data: data,
    },
  ];

  return (
    <DashboardCard title={t('monitoring.top_threat_types')!}>
      <Chart options={options} series={series} type="bar" height={350} />
    </DashboardCard>
  );
};

export default ThreatTypesBarChart;
