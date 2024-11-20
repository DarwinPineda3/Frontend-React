import { useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import DashboardCard from '../../shared/DashboardCard';

interface BreachStatusChartProps {
  data: number[];
}

const BreachStatusChart: React.FC<BreachStatusChartProps> = ({ data }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const labels = [
    t('observability.open'),
    t('observability.in_mitigation'),
    t('observability.completed')
  ];


  const colors = [
    theme.palette.error.main,     // Red for 'Open'
    theme.palette.warning.main,   // Orange for 'In mitigation'
    theme.palette.info.main,      // Blue for 'Completed'
  ];

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
    },
    labels: labels,
    colors: colors,
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
    },
  };

  return (
    <DashboardCard title={t('observability.breaches_by_status')!} >
      <Chart options={options} series={data} type="donut" height="300px" />
    </DashboardCard>
  );
};

export default BreachStatusChart;
