import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft, IconArrowDownRight } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import { Props } from 'react-apexcharts';
import DashboardCard from 'src/components/shared/DashboardCard';
import StorageIcon from '@mui/icons-material/Storage';

interface HistoryPoint {
  percentage: number;
  datetime: string;
}

interface StorageCardProps {
  history: HistoryPoint[];
}

const StorageCard: React.FC<StorageCardProps> = ({ history }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = theme.palette.secondary.light;
  const successlight = theme.palette.success.light;
  const errorlight = theme.palette.error.light;

  const lastPoint = history[history.length - 1];
  const previousPoint = history[history.length - 2] || { percentage: lastPoint.percentage };

  const trend = lastPoint.percentage - previousPoint.percentage;
  const isPositive = trend >= 0;

  const optionscolumnchart: Props = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: { show: false },
      height: 70,
      sparkline: { enabled: true },
      group: 'sparklines',
    },
    stroke: { curve: 'smooth', width: 2 },
    fill: { colors: [secondarylight], type: 'solid', opacity: 0.05 },
    markers: { size: 0 },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      x: { show: false },
    },
  };

  const seriescolumnchart = [
    {
      name: t('observability.storage_usage'),
      color: secondary,
      data: history.map((point) => point.percentage),
    },
  ];

  return (
    <DashboardCard
      title={t('observability.storage_usage')!}
      action={
        <Avatar variant="rounded" sx={{ bgcolor: secondarylight, width: 40, height: 40 }}>
          <StorageIcon />
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
            {isPositive ? '+' : ''}
            {trend}%
          </Typography>
        </Stack>
      </Stack>
    </DashboardCard>
  );
};

export default StorageCard;
