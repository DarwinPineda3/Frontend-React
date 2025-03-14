import { Avatar, Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconGridDots } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import DashboardCard from '../../shared/DashboardCard';
import Loader from '../../shared/Loader/Loader';

import { ApexOptions } from 'apexcharts';
import { useTranslation } from 'react-i18next';
import EmptyState from 'src/components/shared/EmptyState';

const WeeklyStats: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;

  const [loading, setLoading] = useState(true);
  const [maxSeries, setMaxSeries] = useState<number[]>([]);
  const [minSeries, setMinSeries] = useState<number[]>([]);
  const [avgSeries, setAvgSeries] = useState<number[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular la carga de datos estáticos
    const fetchData = () => {
      setLoading(true);
      try {
        const exampleData = {
          maxSeries: [10, 20, 30, 40, 50, 60, 70],
          minSeries: [5, 15, 25, 35, 45, 55, 65],
          avgSeries: [7, 17, 27, 37, 47, 57, 67],
          stats: [
            { title: 'Service 1', percent: 90, color: primary, lightcolor: primarylight },
            { title: 'Service 2', percent: 80, color: primary, lightcolor: primarylight },
            { title: 'Service 3', percent: 70, color: primary, lightcolor: primarylight },
          ],
        };
        setMaxSeries(exampleData.maxSeries);
        setMinSeries(exampleData.minSeries);
        setAvgSeries(exampleData.avgSeries);
        setStats(exampleData.stats);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    yaxis: {
      min: Math.min(...maxSeries) - 1,
      max: Math.max(...maxSeries) + 1,
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
      <DashboardCard title={t("dashboard.weekly_stats")} subtitle={t("dashboard.average_downtime")}>
        <Box display="flex" justifyContent="center" mt={4} mb={4}>
          <Loader />
        </Box>
      </DashboardCard>
    );
  }

  if (error) {
    return <div>{t("dashboard.error", { error })}</div>;
  }

  if (stats.reduce((acc, stat) => acc + stat.percent, 0) === 0) {
    return (
      <DashboardCard title={t("dashboard.weekly_stats")} subtitle={t("dashboard.average_downtime")}>
        <EmptyState />
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title={t("dashboard.weekly_stats")} subtitle={t("dashboard.average_downtime")}>
      <>
        <Stack mt={4}>
          <Chart options={optionscolumnchart}
            series={[
              { name: 'Max Service uptime', data: maxSeries },
              { name: 'Avg Service uptime', data: minSeries },
            ]} type="area" height="130px" />
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
                  <IconGridDots width={18} />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb="4px">
                    {stat.title}
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
                  padding: '4px',
                }}
              >
                <Typography variant="subtitle2" fontWeight="600">
                  {Math.round(stat.percent)}
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