import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { ApexOptions } from 'apexcharts';
import { AppState, useSelector } from 'src/store/Store';

const SentimentRibbonChart: React.FC = () => {
    const theme = useTheme();
    const { t } = useTranslation();

    
    const customizer = useSelector((state: AppState) => state.customizer);

    // Mock data for sentiment levels over time to simulate a ribbon effect
    const series = [
        {
            name: t('sentiments.no_expressed_feeling'),
            data: [10, 15, 12, 20, 15, 10, 12, 8]
        },
        {
            name: t('sentiments.very_dissatisfied'),
            data: [5, 6, 4, 7, 5, 6, 4, 5]
        },
        {
            name: t('sentiments.dissatisfied'),
            data: [20, 18, 22, 25, 20, 18, 15, 20]
        },
        {
            name: t('sentiments.neutral'),
            data: [30, 32, 28, 35, 33, 31, 34, 30]
        },
        {
            name: t('sentiments.satisfied'),
            data: [18, 20, 22, 19, 18, 21, 22, 23]
        },
        {
            name: t('sentiments.very_satisfied'),
            data: [12, 10, 8, 13, 15, 12, 13, 14]
        },
    ];

    const options = {
        chart: {
            type: 'area',
            stacked: true,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01',
                '2023-05-01', '2023-06-01', '2023-07-01', '2023-08-01'
            ],
            labels: {
                format: 'MMM yyyy',
                style: {
                    colors: theme.palette.text.primary,  // Set x-axis label color based on theme
                },
            },
        },
        yaxis: {
            title: {
                text: t('sentiments.count'),
                style: {
                    color: theme.palette.text.primary,  // Set y-axis title color based on theme
                },
            },
            labels: {
                style: {
                    colors: theme.palette.text.primary,  // Set y-axis label color based on theme
                },
            },
        },
        stroke: {
            curve: 'smooth',
            width: 0,
        },
        fill: {
            type: 'solid',
            opacity: 0.8,
        },
        colors: [
            theme.palette.grey[400],
            theme.palette.secondary.main,
            theme.palette.error.main,
            theme.palette.warning.main,
            theme.palette.info.main,
    
            theme.palette.success.main,
        ],
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'center',
            labels: {
                colors: theme.palette.text.primary,  // Set legend text color based on theme
            },
        },
        tooltip: {
            shared: true,
            intersect: false,

            theme: customizer.activeMode, 
            y: {
                formatter: function (val: number) {
                    return `${val}`;
                },
            },
        },
    };

    return (
        <DashboardCard title={t('sentiments.sentiment_history')!}>
            <Chart options={options} series={series} type="area" height={350} />
        </DashboardCard>
    );
};

export default SentimentRibbonChart;
