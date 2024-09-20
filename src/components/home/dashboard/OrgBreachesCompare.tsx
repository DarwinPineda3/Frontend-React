import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../shared/DashboardCard';
import Loader from '../../shared/Loader/Loader'; // Loader component

import { useDispatch, useSelector } from 'src/store/Store'; // Correct imports
import { fetchOrgBreachesData } from 'src/store/sections/dashboard/OrgBreachesSlice';
import { AppState } from 'src/store/Store';
import { ApexOptions } from 'apexcharts';  // Correct type
import { Box } from '@mui/material';

const OrgBreachesCompare = () => {
  const dispatch = useDispatch();
  const { loading, series, labels, error } = useSelector(
    (state: AppState) => state.dashboard.orgBreaches
  );

  useEffect(() => {
    dispatch(fetchOrgBreachesData());
  }, [dispatch]);

  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const optionsradarchart: ApexOptions = {
    chart: {
      id: 'radar-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: [primary],
    labels: labels, // Dynamic labels from state
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  if (loading) {
    return (
      <DashboardCard title="Organization Breaches">
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
    <DashboardCard title="Organization Breaches">
      <Chart
        options={optionsradarchart}
        series={series} // Dynamic series from state
        type="radar"
        height="300px"
      />
    </DashboardCard>
  );
};

export default OrgBreachesCompare;
