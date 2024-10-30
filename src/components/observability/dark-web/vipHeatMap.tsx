import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { ApexOptions } from 'apexcharts';
import axios from 'src/utils/axios';

interface VariableObject {
    query: string;
    id: number;
}
interface VIPsHeatmapChartProps {
    varList: VariableObject[];
}

const VIPsHeatmapChart: React.FC<VIPsHeatmapChartProps> = ({ varList }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const DETAIL_API_URL = '/api/data/monitoring/cyber-guard/detail/monitoring';

    const [dataSeries, setDataSeries] = useState([
        { name: t('monitoring.dark_web'), data: [] },
        { name: t('monitoring.data_leaks'), data: [] },
        { name: t('monitoring.social_media'), data: [] }
    ]);

    const getVIPsHeatmapData = async () => {
        const updatedSeries = [
            { name: t('monitoring.dark_web'), data: [] },
            { name: t('monitoring.data_leaks'), data: [] },
            { name: t('monitoring.social_media'), data: [] }
        ];

        for (const val of varList) {
            try {
                const response = await axios.get(`${DETAIL_API_URL}/${val.id}`);
                const name = response.data.brandMonitoring.query;

                // Data retrieval
                const dataLeaks = response.data.brandMonitoring.consolidated_data.security_leaks_counters.security_leaks_total;
                const darkWeb = response.data.brandMonitoring.consolidated_data.dark_web_counters.dark_web_total;
                const socialMedia = response.data.brandMonitoring.consolidated_data.social_networks_counters.social_network_total;

                // Update series data
                updatedSeries[0].data.push({ x: name, y: darkWeb });
                updatedSeries[1].data.push({ x: name, y: dataLeaks });
                updatedSeries[2].data.push({ x: name, y: socialMedia });
            } catch (error) {
                console.error(`Error fetching data for VIP ${val.id}:`, error);
            }
        }
        setDataSeries(updatedSeries);
    };

    useEffect(() => {
        getVIPsHeatmapData();
    }, [varList]);

    const options: ApexOptions = {
        chart: {
            type: 'heatmap',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            foreColor: '#adb0bb',
            toolbar: { show: false }
        },
        xaxis: {
            type: 'category',
            categories: varList.map((item) => item.query)
        },
        yaxis: {
            title: { text: t('monitoring.platforms_or_types') }
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                colorScale: {
                    ranges: [
                        { from: 0, to: 20, color: theme.palette.level.low },
                        { from: 21, to: 40, color: theme.palette.level.medium  },
                        { from: 41, to: 70, color: theme.palette.level.high  },
                        { from: 71, to: 100, color: theme.palette.level.critical  }
                    ]
                }
            }
        },
        dataLabels: { enabled: false },
        tooltip: {
            y: {
                formatter: (val: number) => `${val}`
            }
        }
    };

    return (
        <DashboardCard title={t('monitoring.top_compromised_vips')}>
            <Chart options={options} series={dataSeries} type="heatmap" height={350} />
        </DashboardCard>
    );
};

export default VIPsHeatmapChart;
