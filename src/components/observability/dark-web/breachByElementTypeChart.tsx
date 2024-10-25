import Chart from 'react-apexcharts';
import DashboardCard from '../../shared/DashboardCard'; // Replace with your correct card component
import { useTheme } from '@mui/material';

const BreachElementTypeChart = () => {
    // Burned (static) data for now
    const labels = ['Domain', 'P. Email', 'IP', 'Username', 'Phone'];
    const series = [10, 20, 30, 25, 15]; // Static series data representing breaches by element type

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
        <DashboardCard title="Breaches by element type">
            <Chart options={options} series={series} type="donut" height="300" />
        </DashboardCard>
    );
};

export default BreachElementTypeChart;
