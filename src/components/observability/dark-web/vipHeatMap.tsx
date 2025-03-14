import { useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

interface VariableObject {
  query: string;
  id: number;
}
interface VIPsHeatmapChartProps {
  varList: VariableObject[];
}

const VIPsHeatmapChart: React.FC<VIPsHeatmapChartProps> = ({ varList }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [dataSeries, setDataSeries] = useState([
    { name: t('monitoring.dark_web'), data: [] },
    { name: t('monitoring.data_leaks'), data: [] },
    { name: t('monitoring.social_media'), data: [] },
    { name: t('monitoring.internet'), data: [] }
  ]);

  useEffect(() => {
    // Simular la carga de datos estáticos
    const exampleDataSeries = [
      { name: t('monitoring.dark_web'), data: [{ x: 'VIP 1', y: 30 }, { x: 'VIP 2', y: 40 }, { x: 'VIP 3', y: 50 }] },
      { name: t('monitoring.data_leaks'), data: [{ x: 'VIP 1', y: 20 }, { x: 'VIP 2', y: 30 }, { x: 'VIP 3', y: 40 }] },
      { name: t('monitoring.social_media'), data: [{ x: 'VIP 1', y: 10 }, { x: 'VIP 2', y: 20 }, { x: 'VIP 3', y: 30 }] },
      { name: t('monitoring.internet'), data: [{ x: 'VIP 1', y: 40 }, { x: 'VIP 2', y: 50 }, { x: 'VIP 3', y: 60 }] }
    ];
    setDataSeries(exampleDataSeries);
  }, [t]);

  const options: ApexOptions = {
    chart: {
      type: 'heatmap',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: { show: false }
    },
    xaxis: {
      type: 'category',
      categories: varList.map((item) => item.query)
    },
    yaxis: {
      title: { text: t('monitoring.platforms_or_types') }
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 20, color: theme.palette.level.low },
            { from: 21, to: 40, color: theme.palette.level.medium },
            { from: 41, to: 70, color: theme.palette.level.high },
            { from: 71, to: 100, color: theme.palette.level.critical }
          ]
        }
      }
    },
    dataLabels: { enabled: false },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}`
      }
    }
  };

  return (
    <DashboardCard >
      <Chart options={options} series={dataSeries} type="heatmap" height={350} />
    </DashboardCard>
  );
};

export default VIPsHeatmapChart;