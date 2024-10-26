import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';

const VIPsHeatmapChart: React.FC = () => {
    const theme = useTheme();
    const { t } = useTranslation();

    // Mock data for each VIP's compromise severity across platforms/types
    const series = [
        {
            name: t('monitoring.malware'),
            data: [
                { x: 'VIP 1', y: 85 },
                { x: 'VIP 2', y: 70 },
                { x: 'VIP 3', y: 60 },
                { x: 'VIP 4', y: 90 }
            ]
        },
        {
            name: t('monitoring.fake_apps'),
            data: [
                { x: 'VIP 1', y: 50 },
                { x: 'VIP 2', y: 85 },
                { x: 'VIP 3', y: 40 },
                { x: 'VIP 4', y: 75 }
            ]
        },
        {
            name: t('monitoring.data_leaks'),
            data: [
                { x: 'VIP 1', y: 65 },
                { x: 'VIP 2', y: 55 },
                { x: 'VIP 3', y: 90 },
                { x: 'VIP 4', y: 60 }
            ]
        },
        {
            name: t('monitoring.social_media'),
            data: [
                { x: 'VIP 1', y: 75 },
                { x: 'VIP 2', y: 95 },
                { x: 'VIP 3', y: 80 },
                { x: 'VIP 4', y: 50 }
            ]
        },
    ];

    const options = {
        chart: {
            type: 'heatmap',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
        },
        title: {
            text: t('monitoring.top_compromised_vips'),
            align: 'center',
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                color: theme.palette.text.primary,
            },
        },
        xaxis: {
            type: 'category',
            categories: ['VIP 1', 'VIP 2', 'VIP 3', 'VIP 4'], // Static labels, no translation needed
        },
        yaxis: {
            title: {
                text: t('monitoring.platforms_or_types')
            },
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                colorScale: {
                    ranges: [
                        { from: 0, to: 30, color: theme.palette.success.light },
                        { from: 31, to: 60, color: theme.palette.warning.main },
                        { from: 61, to: 100, color: theme.palette.error.main }
                    ],
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            y: {
                formatter: function (val: number) {
                    return `${val}%`;
                },
            },
        },
    };

    return (
        <DashboardCard title={t('monitoring.top_compromised_vips')}>
            <Chart options={options} series={series} type="heatmap" height={350} />
        </DashboardCard>
    );
};

export default VIPsHeatmapChart;
