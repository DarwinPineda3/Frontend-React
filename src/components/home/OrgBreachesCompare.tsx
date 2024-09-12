// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import Chart from 'react-apexcharts';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Props } from 'react-apexcharts';
import DashboardCard from '../shared/DashboardCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Radialbar Chart',
  },
];

const OrgBreachesCompare = () => {

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const success = theme.palette.success.main;
  const warning = theme.palette.warning.main;

  // 2
  const optionsradarchart: Props = {
    chart: {
      id: 'pie-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: [primary],
    labels: ['Username', 'Phone', 'P.Email', 'IP', 'Domain'],
    tooltip: {
      theme: 'dark',
    },
  };
  const seriesradarchart: any = [
    {
      name: 'Sales',
      data: [8, 0, 10, 40, 1],
    },
  ];

  return (
    <DashboardCard title="Organization Breaches">
      <Chart
        options={optionsradarchart}
        series={seriesradarchart}
        type="radar"
        height="300px"
      />
    </DashboardCard>

  );
};

export default OrgBreachesCompare;