import Chart from 'react-apexcharts';
import DashboardCard from '../../shared/DashboardCard'; // Replace with your correct card component
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React from 'react';

interface BreachElementTypeChartProps {
    series: number[];
}

const BreachElementTypeChart: React.FC<BreachElementTypeChartProps> = ({ series }) => {
    const { t } = useTranslation();
    
    // Static data for now
    const labels = [
        t('observability.ip'),
        t('observability.p_email'),
        t('observability.phone'),
        t('observability.domain'),
        t('observability.username'),
    ];

    //const series = [10, 20, 30, 25, 15]; 

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
                    size: '50%',
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
        <DashboardCard title={t('observability.breaches_by_element_type')!}  style={{ height: '100%' }}>
            <Chart options={options} series={series} type="donut" height="300px" />
        </DashboardCard>
    );
};

export default BreachElementTypeChart;
