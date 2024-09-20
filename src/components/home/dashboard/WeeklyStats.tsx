import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import Loader from '../../shared/Loader/Loader'; // Loader component
import { IconGridDots } from '@tabler/icons-react';

import { useDispatch, useSelector } from 'src/store/Store'; // Correct imports
import { fetchWeeklyStatsData } from 'src/store/sections/dashboard/WeeklyStatsSlice';
import { AppState } from 'src/store/Store';
import { ApexOptions } from 'apexcharts';  // Correct type

const WeeklyStats: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, series, stats, error } = useSelector(
    (state: AppState) => state.dashboard.weeklyStats
  );

  useEffect(() => {
    dispatch(fetchWeeklyStatsData());
  }, [dispatch]);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;

  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 130,
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
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0,
        stops: [20, 180],
      },
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

  if (loading) {
    return (
      <DashboardCard title="Weekly Stats" subtitle="Average downtime">
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Loader />
      </Box>
      </DashboardCard>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <DashboardCard title="Weekly Stats" subtitle="Average downtime">
      <>
      <Stack mt={4}>
        <Chart options={optionscolumnchart} series={[{ name: 'Weekly Stats', data: series }]} type="area" height="130px" />
      </Stack>
      <Stack spacing={3} mt={3}>
        {stats.map((stat, i) => (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            key={i}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                variant="rounded"
                sx={{ bgcolor: stat.lightcolor, color: stat.color, width: 40, height: 40 }}
              >
                <IconGridDots width={18} /> {/* Update this as necessary */}
              </Avatar>
              <Box>
                <Typography variant="h6" mb="4px">
                  {stat.title}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {stat.subtitle}
                </Typography>
              </Box>
            </Stack>
            <Avatar
              sx={{
                bgcolor: stat.lightcolor,
                color: stat.color,
                width: 42,
                height: 24,
                borderRadius: '4px',
              }}
            >
              <Typography variant="subtitle2" fontWeight="600">
                +{stat.percent}
              </Typography>
            </Avatar>
          </Stack>
        ))}
      </Stack>
      </>
    </DashboardCard>
  );
};

export default WeeklyStats;
