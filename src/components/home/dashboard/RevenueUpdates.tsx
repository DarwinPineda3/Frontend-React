import React, { useEffect } from 'react';
import { MenuItem, Grid, Stack, Typography, Button, Avatar, Box } from '@mui/material';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { IconGridDots } from '@tabler/icons-react';
import DashboardCard from '../../shared/DashboardCard';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import Loader from '../../shared/Loader/Loader';

import { useDispatch, useSelector } from 'src/store/Store'; // Correct imports
import { fetchRevenueUpdatesData } from 'src/store/sections/dashboard/RevenueUpdatesSlice';
import { AppState } from 'src/store/Store';
import { ApexOptions } from 'apexcharts';  // Ensure correct import

const RevenueUpdates = () => {
  const dispatch = useDispatch();
  const { loading, totalReports, redTeamReports, blueTeamReports, series, categories, error } = useSelector(
    (state: AppState) => state.dashboard.revenueUpdates
  );

  const [month, setMonth] = React.useState('1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchRevenueUpdatesData());
  }, [dispatch]);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.info.main;

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
      min: -5,
      max: 5,
      tickAmount: 4,
    },
    xaxis: {
      categories: categories, // Use categories from the state
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
          <DashboardCard
      title="Reports Updates">
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
    <DashboardCard
      title="Reports Updates"
      action={
        <CustomSelect
          labelId="month-dd"
          id="month-dd"
          size="small"
          value={month}
          onChange={handleChange}
        >
          <MenuItem value={1}>March 2023</MenuItem>
          <MenuItem value={2}>April 2023</MenuItem>
          <MenuItem value={3}>May 2023</MenuItem>
        </CustomSelect>
      }
    >
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
                  Total Reports
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
                  Red Team
                </Typography>
                <Typography variant="h5">{redTeamReports}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{ width: 9, mt: 1, height: 9, bgcolor: secondary, svg: { display: 'none' } }}
              ></Avatar>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  Blue Team
                </Typography>
                <Typography variant="h5">{blueTeamReports}</Typography>
              </Box>
            </Stack>
          </Stack>
          <Button color="primary" variant="contained" fullWidth>
            View Full Report
          </Button>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default RevenueUpdates;
