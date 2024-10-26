import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme, Box } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard'; // Replace with your correct card component

const ThreatsByFuzzerChart = () => {
  const theme = useTheme();

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
      name: 'Threats by Fuzzer',
      data: [10, 4, 3, 3, 2, 2, 1], // Each number corresponds to the count of threats by fuzzer type
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
      categories: ['tld-swap', 'subdomain', 'addition', 'bitsquatting', 'insertion', 'vowel-swap'],
      labels: {
        show: true,
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: 'Count',
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
    <DashboardCard title="Threats by Fuzzer">
      <Chart options={options} series={series} type="bar" height="300" />
    </DashboardCard>
  );
};

export default ThreatsByFuzzerChart;
