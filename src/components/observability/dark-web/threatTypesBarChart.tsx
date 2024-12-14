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

  // Data for categories
  const categories = [
    t('monitoring.data_leaks'),
    t('monitoring.dark_web'),
    t('monitoring.phishing'),
    t('monitoring.social_media'),
  ];

  // Sorting data and categories in descending order based on the data values
  const sortedDataWithCategories = data
    .map((value, index) => ({
      value,
      category: categories[index],
    }))
    .sort((a, b) => b.value - a.value); // Sorting in descending order

  // Extract sorted values and categories
  const sortedData = sortedDataWithCategories.map(item => item.value);
  const sortedCategories = sortedDataWithCategories.map(item => item.category);

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
      categories: sortedCategories, // Use sorted categories
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
    }
  };

  const series = [
    {
      name: t('monitoring.threat_types'),
      data: sortedData, // Use sorted data
    },
  ];

  return (
    <DashboardCard title={t('monitoring.top_threat_types')!}>
      <Chart options={options} series={series} type="bar" height={350} />
    </DashboardCard>
  );
};

export default ThreatTypesBarChart;
