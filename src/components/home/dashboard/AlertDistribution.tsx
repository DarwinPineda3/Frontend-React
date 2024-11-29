import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import Loader from '../../shared/Loader/Loader'; // Loader component

import { useDispatch, useSelector } from 'src/store/Store'; // Correct imports
import { fetchAlertDistributionData } from 'src/store/sections/dashboard/AlertDistributionSlice';
import { AppState } from 'src/store/Store';
import { ApexOptions } from 'apexcharts';  // Correct type
import { useTranslation } from 'react-i18next';

const AlertDistribution = () => {
  const dispatch = useDispatch();
  
  const { t } = useTranslation();
  
  const { loading, labels, series, error } = useSelector(
    (state: AppState) => state.dashboard.alertDistribution
  );

  useEffect(() => {
    dispatch(fetchAlertDistributionData());
  }, [dispatch]);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const secondary = theme.palette.secondary.main;
  const secondarylight = theme.palette.secondary.light;
  const warning = theme.palette.warning.main;

  const optionspiechart: ApexOptions = {
    chart: {
      id: 'pie-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      //width: '50px',
    },
    colors: [primary, primarylight, secondary, secondarylight, warning],
    tooltip: {
      fillSeriesColor: false,
    },
    labels: labels, 
  };

  if (loading) {
    return (
      <DashboardCard>
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
    <DashboardCard title={t("dashboard.montly_distribution")??"montly_distribution"}>
      <Chart options={optionspiechart} series={series} type="pie" height="300px" />
    </DashboardCard>
  );
};

export default AlertDistribution;
