import React from 'react';
import Chart from 'react-apexcharts';
import { Box, useTheme } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard'; 
import { ApexOptions } from 'apexcharts';
import { useTranslation } from 'react-i18next';

const BreachStatusChart = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    const labels = [
        t('observability.open'),
        t('observability.in_mitigation'),
        t('observability.completed')
    ];
    
    const series = [70, 20, 10]; // Static series data representing breaches by status

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
        <DashboardCard title={t('observability.breaches_by_status')!}>
            <Chart options={options} series={series} type="donut" height="300" />
        </DashboardCard>
    );
};

export default BreachStatusChart;
