import { Box, Grid } from '@mui/material';
import TopCardsDarkWeb from 'src/components/observability/dark-web/topCardsDarkWeb';
import BreachStatusChart from 'src/components/observability/dark-web/breachStatus';
import BreachElementTypeChart from 'src/components/observability/dark-web/breachByElementTypeChart';
import UsernamesTable from 'src/components/observability/dark-web/UsernamesTable';
import DomainTable from 'src/components/observability/dark-web/domainTable';
import ThreatTypesBarChart from 'src/components/observability/dark-web/threatTypesBarChart';
import VIPsHeatmapChart from 'src/components/observability/dark-web/vipHeatMap';
import CompromisedTypesChart from 'src/components/observability/dark-web/vipsRadarChart';
import { useDispatch, useSelector } from 'src/store/Store';
import { useEffect } from 'react';
import { fetchBrandMonitoringData, fetchBrandMonitoringResume } from 'src/store/sections/cyber-guard/BrandMonitoringSlice';
import SecurityIncidentsPolygon from 'src/components/observability/dark-web/SecurityIncidentsPolygon';
import { useTranslation } from 'react-i18next';

const DarkWeb = () => {
    const brandMonitoringResume: any = useSelector((state: any) => state.brandMonitoringReducer.brandMonitoringResume);

    const brandMonitoringData: any = useSelector((state: any) => state.brandMonitoringReducer.brandMonitoringData);


    // Fetch brand monitoring data
    const dispatch = useDispatch();

    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchBrandMonitoringResume());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchBrandMonitoringData());
    }, [dispatch]);

    const cardsValues = [
        brandMonitoringResume?.data?.['security_leaks_total'] ?? 0, // Total Compromises
        brandMonitoringResume?.data?.['domains'] ?? 0, // Domains
        brandMonitoringResume?.data?.['emails'] ?? 0, // Emails
        brandMonitoringResume?.data?.['ip'] ?? 0, // IPs
        brandMonitoringResume?.data?.['usernames'] ?? 0, // Usernames
        brandMonitoringResume?.data?.['phones'] ?? 0, // Phones
        brandMonitoringResume?.data?.['social_network_total'] ?? 0, // Malware Count
        brandMonitoringResume?.data?.['vins'] ?? 0, // Compromised VIPs Count
        brandMonitoringResume?.data?.['dark_web_total'] ?? 0, // Fake Applications Count
    ];


    const polygonValues = [
        brandMonitoringResume?.data?.['ip'] ?? 0,
        brandMonitoringResume?.data?.['emails'] ?? 0,
        brandMonitoringResume?.data?.['phones'] ?? 0,
        brandMonitoringResume?.data?.['domains'] ?? 0,
        brandMonitoringResume?.data?.['usernames'] ?? 0,
    ];

    const polygonLabels = [
        t('observability.ip'),
        t('observability.p_email'),
        t('observability.phone'),
        t('observability.domain'),
        t('observability.username'),
    ]

    const series = {
        name: 'Breaches',
        data: polygonValues,
    };


    

    return (
        <Grid container spacing={3} mt={2} alignItems="stretch">
            <Grid item xs={12}>
                <TopCardsDarkWeb values={cardsValues} />
            </Grid>
            <Grid item xs={12} lg={3}>
                <Box style={{ display: 'flex', height: '100%' }}>
                    <SecurityIncidentsPolygon
                        series={[series]}
                        labels={polygonLabels}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} lg={3}>
                <Box style={{ display: 'flex', height: '100%' }}>
                    <BreachStatusChart />
                </Box>
            </Grid>
            <Grid item xs={12} lg={3}>
                <Box style={{ display: 'flex', height: '100%' }}>
                    <BreachElementTypeChart series={polygonValues} />
                </Box>
            </Grid>
            <Grid item xs={12} lg={3}>
                <Box style={{ display: 'flex', height: '100%' }}>
                    <CompromisedTypesChart />
                </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Box style={{ display: 'flex', height: '100%' }}>
                    <ThreatTypesBarChart />
                </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
                <VIPsHeatmapChart varList={brandMonitoringData.latest_data?.slice(0,3)??[]}/>
            </Grid>
            {/* Optional chart
        <Grid item xs={12} lg={12}>
          <ThreatsByFuzzerChart />
        </Grid>
        
            <Grid item xs={12} lg={12}>
                <UsernamesTable />
            </Grid>
            <Grid item xs={12} lg={12}>
                <DomainTable />
            </Grid>
            */}
        </Grid>
    );
};

export default DarkWeb;

