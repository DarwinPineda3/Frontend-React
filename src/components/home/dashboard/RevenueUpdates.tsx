import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconGridDots } from '@tabler/icons-react';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import EmptyState from 'src/components/shared/EmptyState';
import DashboardCard from '../../shared/DashboardCard';
import Loader from '../../shared/Loader/Loader';

const RevenueUpdates = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.info.main;

  const [loading, setLoading] = useState(true);
  const [totalReports, setTotalReports] = useState(0);
  const [redTeamReports, setRedTeamReports] = useState(0);
  const [series, setSeries] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular la carga de datos estáticos
    const fetchData = () => {
      setLoading(true);
      try {
        const exampleData = {
          totalReports: 100,
          redTeamReports: 20,
          series: [
            {
              name: 'Series 1',
              data: [10, 20, 30, 40, 50],
            },
            {
              name: 'Series 2',
              data: [15, 25, 35, 45, 55],
            },
          ],
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        };
        setTotalReports(exampleData.totalReports);
        setRedTeamReports(exampleData.redTeamReports);
        setSeries(exampleData.series);
        setCategories(exampleData.categories);
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
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 370,
      stacked: true,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '20%',
        borderRadius: 6,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
    },
    yaxis: {
      min: 0,
      tickAmount: 4,
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };

  if (loading) {
    return (
      <DashboardCard title={t("dashboard.reports_updates") ?? "Reports Updates"}>
        <Box display="flex" justifyContent="center" mt={4} mb={4}>
          <Loader />
        </Box>
      </DashboardCard>
    );
  }

  if (error) {
    return <div>{t("dashboard.error", { error })}</div>;
  }

  if (series.length === 0 || categories.length === 0) {
    return (
      <DashboardCard title={t("dashboard.reports_updates") ?? "Reports Updates"}>
        <EmptyState />
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title={t("dashboard.reports_updates") ?? "Reports Updates"}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Box className="rounded-bars">
            <Chart
              options={optionscolumnchart}
              series={series}
              type="bar"
              height="370px"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack spacing={3} mt={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                width={40}
                height={40}
                bgcolor="primary.light"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography color="primary" variant="h6" display="flex">
                  <IconGridDots width={21} />
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" fontWeight="700">
                  {totalReports}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {t("dashboard.total_reports")}
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Stack spacing={3} my={5}>
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{ width: 9, mt: 1, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  {t("dashboard.red_team")}
                </Typography>
                <Typography variant="h5">{redTeamReports}</Typography>
              </Box>
            </Stack>
          </Stack>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => {
              //redirect to vulnerabilities/redteam
              navigate('/vulnerabilities/redteam');
            }}
          >
            {t("dashboard.view_full_report")}
          </Button>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default RevenueUpdates;