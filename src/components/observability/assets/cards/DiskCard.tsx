// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Box } from '@mui/material';
import { IconGridDots } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Props } from 'react-apexcharts';
import DashboardCard from 'src/components/shared/DashboardCard';

const DiskCard = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const primarylight = theme.palette.primary.light;
  const textColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : '#2A3547';

  const usedSpace = 400;
  const freeSpace = 600;
  const totalSpace = usedSpace + freeSpace;

  const optionscolumnchart: Props = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      toolbar: {
        show: false,
      },
      height: 275,
    },
    labels: [t('observability.used_space'), t('observability.free_space')],
    colors: [primary, primarylight],
    plotOptions: {
      pie: {
        donut: {
          size: '89%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 7,
            },
            value: {
              show: false,
            },
            total: {
              show: true,
              color: textColor,
              fontSize: '20px',
              fontWeight: '600',
              label: `${totalSpace} GB`,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart = [usedSpace, freeSpace];

  return (
    <DashboardCard title={t('observability.disk_usage_overview')!} subtitle={t('observability.current_status')!}>
      <>
      <Box mt={3}>
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="donut" height="275px" />
      </Box>

      <Stack direction="row" spacing={2} justifyContent="space-between" mt={7}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            width={38}
            height={38}
            bgcolor="primary.light"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography color="primary.main" display="flex" alignItems="center" justifyContent="center">
              <IconGridDots width={22} />
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="600">
              {usedSpace} GB
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {t('observability.used_space')}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            width={38}
            height={38}
            bgcolor="secondary.light"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography color="secondary.main" display="flex" alignItems="center" justifyContent="center">
              <IconGridDots width={22} />
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="600">
              {freeSpace} GB
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {t('observability.free_space')}
            </Typography>
          </Box>
        </Stack>
      </Stack>
      </>
    </DashboardCard>
  );
};

export default DiskCard;
