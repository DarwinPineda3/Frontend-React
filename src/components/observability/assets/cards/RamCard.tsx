import { Avatar, Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconArrowDownRight, IconArrowUpLeft } from '@tabler/icons-react';
import React from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

import MemoryIcon from '@mui/icons-material/Memory';
import { Props } from 'react-apexcharts';
import DashboardCard from 'src/components/shared/DashboardCard';

interface HistoryPoint {
  percentage: number;
  datetime: string;
}

interface CpuCardProps {
  history: HistoryPoint[];
}

const RamCard: React.FC<CpuCardProps> = ({ history }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const info = theme.palette.info.main;
  const infolight = theme.palette.info.light;
  const successlight = theme.palette.success.light;
  const errorlight = theme.palette.error.light;

  if (history.length === 0) {
    return (
      <DashboardCard
        title={t('observability.ram_usage')!}
        action={
          <Avatar
            variant="rounded"
            sx={{ bgcolor: theme.palette.info.light, width: 40, height: 40 }}
          >
            <MemoryIcon color="info" />
          </Avatar>
        }
      >
        <Box>
          <Typography variant="h6" color="textSecondary">
            {t('observability.no_data_available_for_selected_date')}
          </Typography>
        </Box>
      </DashboardCard>
    );
  }

  const lastPoint = history[history.length - 1];
  const previousPoint = history[history.length - 2] || { percentage: lastPoint.percentage };

  const trend = lastPoint.percentage - previousPoint.percentage;
  const isPositive = trend >= 0;

  const average = history.reduce((sum, point) => sum + point.percentage, 0) / history.length;

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
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const datetime = new Date(history[dataPointIndex].datetime).toLocaleString();
        const percentage = series[seriesIndex][dataPointIndex];

        return `
          <div style="padding: 10px; font-family: 'Plus Jakarta Sans', sans-serif;">
            <strong>${t('observability.ram_usage')}: ${percentage}%</strong><br />
            <span>${t('observability.datetime')}: ${datetime}</span>
          </div>
        `;
      },
    },
    annotations: {
      yaxis: [
        {
          y: average,
          borderColor: '#FF6F61',
          label: {
            style: {
              color: '#FF6F61',
              background: '#fff',
              borderRadius: 2,
              padding: 4,
            },
          },
        },
      ],
    },
  };

  const seriescolumnchart = [
    {
      name: t('observability.ram_usage'),
      color: info,
      data: history.map((point) => point.percentage),
    },
  ];

  return (
    <DashboardCard
      title={t('observability.ram_usage')!}
      action={
        <Avatar
          variant="rounded"
          sx={{ bgcolor: (theme) => theme.palette.info.light, width: 40, height: 40 }}
        >
          <MemoryIcon color="info" />
        </Avatar>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="70px" />
      }
    >
      <Box>
        <Stack direction="row" spacing={1} alignItems="center" mb={3}>
          <Typography variant="h3" fontWeight="700">
            {lastPoint.percentage}%
          </Typography>
          <Stack direction="row" spacing={1} mt={1} mb={2} alignItems="center">
            <Avatar sx={{ bgcolor: isPositive ? errorlight : successlight, width: 20, height: 20 }}>
              {isPositive ? (
                <IconArrowUpLeft width={18} color="#FF5B5C" />
              ) : (
                <IconArrowDownRight width={18} color="#13DEB9" />
              )}
            </Avatar>
            <Typography variant="subtitle2" color="textSecondary">
              {isPositive ? '+' : ''}
              {trend.toFixed(2)}%
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" mb={2}>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              color: '#FF6F61',
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '5px 10px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            {`Avg: ${average.toFixed(2)}%`}
          </Typography>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default RamCard;
