import { useTheme } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

const EHRiskExposureLevelChart = ({ riskExposureLevel }) => {

  const theme = useTheme();
  const { high, medium, low, critical, unknown, none, info } = theme.palette.level;

  let label = 'Bajo'; // Por defecto es 'Bajo'
  if (riskExposureLevel >= 4 && riskExposureLevel <= 6.9) {
    label = 'Medio';
  } else if (riskExposureLevel >= 7) {
    label = 'Alto';
  }

  const options = {
    chart: {
      type: 'radialBar',
      offsetY: -20,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#e7e7e7',
          strokeWidth: '97%',
          margin: 5,
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '16px',
            color: '#000',
            offsetY: -10,
            text: 'Risk Exposure Level',
          },
          value: {
            fontSize: '24px',
            show: true,
            offsetY: -5,
            formatter: (val) => riskExposureLevel.toFixed(1),
          },
        },
        hollow: {
          size: '60%',
        },
      },
    },
    colors: [
      function ({ value }) {
        if (value <= 39) return low; // Bajo
        if (value <= 69) return medium; // Medio
        return hihg; // Alto
      },
    ],
    labels: [label],
    fill: {
      type: 'solid',
    },
    stroke: {
      lineCap: 'round',
    },
    yaxis: {
      min: 0,
      max: 10,
      show: false,
    },
  };
  const series = [riskExposureLevel * 10]; // se multiplica para convertilo a porcentaje

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      height="300"
    />
  );
};

export default EHRiskExposureLevelChart;
