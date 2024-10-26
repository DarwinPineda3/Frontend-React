import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../shared/DashboardCard';
import Loader from '../../shared/Loader/Loader';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchOrgBreachesData } from 'src/store/sections/dashboard/OrgBreachesSlice';
import { AppState } from 'src/store/Store';
import { ApexOptions } from 'apexcharts';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const OrgBreachesCompare = () => {
  const { t } = useTranslation();
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
    labels: labels,
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  if (loading) {
    return (
      <DashboardCard title={t("dashboard.organization_breaches") || ''}>
        <Box display="flex" justifyContent="center" mt={4} mb={4}>
          <Loader />
        </Box>
      </DashboardCard>
    );
  }

  if (error) {
    return <div>{t("dashboard.error", { error })}</div>;
  }

  return (
    <DashboardCard title={t("dashboard.organization_breaches") || ''}>
      <Chart
        options={optionsradarchart}
        series={series}
        type="radar"
        height="300px"
      />
    </DashboardCard>
  );
};

export default OrgBreachesCompare;
