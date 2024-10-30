import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme, Box } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import { useTranslation } from 'react-i18next';

const ThreatsByFuzzerChart = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  // Using theme colors for the chart bars
  const colors = [
    theme.palette.success.main,   // Green for tld-swap
    theme.palette.info.main,      // Blue for subdomain
    theme.palette.warning.main,   // Yellow for addition
    theme.palette.success.light,  // Light Green for bitsquatting
    theme.palette.secondary.main, // Purple for insertion
    theme.palette.error.main,     // Red for vowel-swap
  ];

  // Burned (static) data for now
  const series = [
    {
      name: t('observability.threats_by_fuzzer'),
      data: [10, 4, 3, 3, 2, 2, 1],
    },
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
        columnWidth: '40%',
        endingShape: 'rounded',
        distributed: true, // Ensures each bar has its own color
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
        t('observability.tld_swap'),
        t('observability.subdomain'),
        t('observability.addition'),
        t('observability.bitsquatting'),
        t('observability.insertion'),
        t('observability.vowel_swap'),
      ],
      labels: {
        show: true,
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: t('observability.count'),
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
        formatter: function (val) {
          return `${val}`;
        },
      },
    },
  };

  return (
    <DashboardCard title={t('observability.threats_by_fuzzer')!}>
      <Chart options={options} series={series} type="bar" height="300" />
    </DashboardCard>
  );
};

export default ThreatsByFuzzerChart;
