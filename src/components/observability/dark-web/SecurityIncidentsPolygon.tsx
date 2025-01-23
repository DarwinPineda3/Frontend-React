import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import React from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import DashboardCard from '../../shared/DashboardCard';

interface SecurityIncidentsPolygonProps {
  series: { name: string; data: number[] }[];
  labels: string[];
}
const SecurityIncidentsPolygon: React.FC<SecurityIncidentsPolygonProps> = ({ series, labels }) => {
  const { t } = useTranslation();

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
  return (
    <DashboardCard title={t("dashboard.organization_breaches") || ''} >
      <Chart
        options={optionsradarchart}
        series={series}
        type="radar"
        height="300px"
      />
    </DashboardCard>
  );
};

export default SecurityIncidentsPolygon;
