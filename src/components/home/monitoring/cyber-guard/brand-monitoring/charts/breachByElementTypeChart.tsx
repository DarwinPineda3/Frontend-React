import Chart from 'react-apexcharts';
import DashboardCard from '../../../../../shared/DashboardCard'; // Replace with your correct card component
import { useTheme } from '@mui/material';
import { GraphicsCharts } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';


interface BreachElementTypeChartProps {
    security_leaks_data_chart: GraphicsCharts;
}

const BreachElementTypeChart: React.FC<BreachElementTypeChartProps> = ({ security_leaks_data_chart }) => {
    const labels = security_leaks_data_chart.labels || [];
    const series = security_leaks_data_chart.values || [];

    const theme = useTheme();
    const colors = [
        theme.palette.error.main,     // Red for Domain
        theme.palette.info.main,      // Blue for P. Email
        theme.palette.warning.main,   // Yellow for IP
        theme.palette.secondary.main, // Purple for Username
        theme.palette.success.main,   // Green for Phone
    ];

    const options = {
        chart: {
            type: 'donut' as 'donut',
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
            position: 'top' as 'top',
            horizontalAlign: 'center' as 'center',
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
        <DashboardCard title="Breaches by element type">
            <Chart options={options} series={series} type="donut" height="300" />
        </DashboardCard>
    );
};

export default BreachElementTypeChart;
