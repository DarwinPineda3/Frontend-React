import { useTheme } from '@mui/material';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

interface RiskBarChartProps {
  contLow: number;
  contMedium: number;
  contHigh: number;
  contCritical: number;
  contInfo: number;
}



const RiskConsolidateChart: React.FC<RiskBarChartProps> = ({ contLow, contMedium, contHigh, contCritical, contInfo }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { high, medium, low, critical, info } = theme.palette.level;
  const chartOptions = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [t("redteam.low"),
      t("redteam.medium"),
      t("redteam.high"),
      t("redteam.critical"),
      t("redteam.info")],

    },
    colors: [low, medium, high, critical, info],
  };

  const chartSeries = [
    {
      data: [contLow, contMedium, contHigh, contCritical, contInfo],
    },
  ];

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      height={300}
    />
  );
};

export default RiskConsolidateChart;
