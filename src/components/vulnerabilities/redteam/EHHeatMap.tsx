import { useTheme } from '@mui/material';
import Chart from 'react-apexcharts';

const HeatmapChart = () => {
  const theme = useTheme();
  const { high, medium, low, critical } = theme.palette.level;

  const options = {
    chart: {
      toolbar: { show: false },
    },
    plotOptions: {
      heatmap: {
        enableShades: false,
        colorScale: {
          ranges: [
            { from: 0.5, to: 1.5, color: low },     // Posición (1,1)
            { from: 1.5, to: 2.5, color: medium },  // Posición (1,2)
            { from: 2.5, to: 3.5, color: high },    // Posición (1,3)
            { from: 3.5, to: 4.5, color: medium },  // Posición (2,1)
            { from: 4.5, to: 5.5, color: high },    // Posición (2,2)
            { from: 5.5, to: 6.5, color: critical },// Posición (2,3)
            { from: 6.5, to: 7.5, color: high },    // Posición (3,1)
            { from: 7.5, to: 8.5, color: critical },// Posición (3,2)
            { from: 8.5, to: 9.5, color: "#721D88" }// Posición (3,3)
          ]
        }
      },
    },
    dataLabels: {
      enabled: true,
      style: { colors: ['#fff'] }
    },
    xaxis: {
      categories: ['Col 1', 'Col 2', 'Col 3'],
    },
    yaxis: {
      labels: { show: true }
    }
  };

  const series = [
    {
      name: 'Row 1',
      data: [{ x: 'Col 1', y: 1 }, { x: 'Col 2', y: 2 }, { x: 'Col 3', y: 3 }]
    },
    {
      name: 'Row 2',
      data: [{ x: 'Col 1', y: 4 }, { x: 'Col 2', y: 5 }, { x: 'Col 3', y: 6 }]
    },
    {
      name: 'Row 3',
      data: [{ x: 'Col 1', y: 5 }, { x: 'Col 2', y: 8 }, { x: 'Col 3', y: 9 }]
    }
  ];

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="heatmap"
        width="100%"
        height="400"
      />
    </div>
  );
};

export default HeatmapChart;
