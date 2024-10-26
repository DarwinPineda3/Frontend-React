import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const CompromisedTypesChart: React.FC = () => {
    const theme = useTheme();
    const { t } = useTranslation();

    // Mock data for the proportion of compromised types
    const series = [40, 20, 25, 15];  // Example data percentages for each type

    const options = {
        chart: {
            type: 'donut',  // Set to 'pie' if you prefer a pie chart instead
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
        },
        labels: [
            t('monitoring.malware'),
            t('monitoring.fake_apps'),
            t('monitoring.data_leaks'),
            t('monitoring.social_media')
        ],
        colors: [
            theme.palette.error.main,       // Red for Malware
            theme.palette.warning.main,     // Yellow for Fake Apps
            theme.palette.info.main,        // Blue for Data Leaks
            theme.palette.secondary.main,   // Purple for Social Media
        ],
        dataLabels: {
            enabled: true,
            formatter: function (val: number) {
                return `${val.toFixed(1)}%`;
            },
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
        },
        tooltip: {
            y: {
                formatter: function (val: number) {
                    return `${val.toFixed(1)}%`;
                },
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };

    return (
        <DashboardCard title={t('monitoring.compromised_elements_by_type')!}>
            <Chart options={options} series={series} type="donut" height={350} />
        </DashboardCard>
    );
};

export default CompromisedTypesChart;
