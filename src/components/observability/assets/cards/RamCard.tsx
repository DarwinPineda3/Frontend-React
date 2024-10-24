import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft, IconArrowDownRight } from '@tabler/icons-react';

import { Props } from 'react-apexcharts';
import DashboardCard from 'src/components/shared/DashboardCard';
import MemoryIcon from '@mui/icons-material/Memory';

interface HistoryPoint {
  percentage: number;
  datetime: string;
}

interface CpuCardProps {
  history: HistoryPoint[];
}

const RamCard: React.FC<CpuCardProps> = ({ history }) => {
  // chart color
  const theme = useTheme();
  const info = theme.palette.info.main;
  const infolight = theme.palette.info.light;
  const successlight = theme.palette.success.light;
  const errorlight = theme.palette.error.light;

  // Get the last two history points for current percentage and trend calculation
  const lastPoint = history[history.length - 1];
  const previousPoint = history[history.length - 2] || { percentage: lastPoint.percentage }; // fallback if no previous point

  const trend = lastPoint.percentage - previousPoint.percentage;
  const isPositive = trend >= 0;

  // Prepare data for the chart
  const optionscolumnchart: Props = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 70,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [infolight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      x: {
        show: false,
      },
    },
  };

  const seriescolumnchart = [
    {
      name: 'Ram Usage',
      color: info,
      data: history.map((point) => point.percentage),
    },
  ];

  return (
    <DashboardCard
      title="Ram Usage"
      action={
        <Avatar
          variant="rounded"
          sx={{ bgcolor: (theme) => theme.palette.info.light, width: 40, height: 40 }}
        >
          <MemoryIcon color="info"/>
        </Avatar>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="70px" />
      }
    >
      <Stack direction="row" spacing={1} alignItems="center" mb={3}>
        <Typography variant="h3" fontWeight="700">
          {lastPoint.percentage}%
        </Typography>
        <Stack direction="row" spacing={1} mt={1} mb={2} alignItems="center">
          <Avatar sx={{ bgcolor: isPositive ? successlight : errorlight, width: 20, height: 20 }}>
            {isPositive ? (
              <IconArrowUpLeft width={18} color="#13DEB9" />
            ) : (
              <IconArrowDownRight width={18} color="#FF5B5C" />
            )}
          </Avatar>
          <Typography variant="subtitle2" color="textSecondary">
            {isPositive ? '+' : ''}{trend}%
          </Typography>
        </Stack>
      </Stack>
    </DashboardCard>
  );
};

export default RamCard;
