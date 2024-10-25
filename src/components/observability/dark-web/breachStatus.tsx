import React from 'react';
import Chart from 'react-apexcharts';
import { Box, useTheme } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard'; 
import { ApexOptions } from 'apexcharts';

const BreachStatusChart = () => {
    // Burned (static) data for now
    const labels = ['Open', 'In mitigation', 'Completed'];
    const series = [70, 20, 10]; // Static series data representing breaches by status
    const theme = useTheme();
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
        <DashboardCard title="Breaches by Status">
            <Chart options={options} series={series} type="donut" height="300" />
        </DashboardCard>
    );
};

export default BreachStatusChart;
