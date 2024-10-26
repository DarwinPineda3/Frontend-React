//basic component

import { Grid } from '@mui/material';
import TopCardsDarkWeb from 'src/components/observability/dark-web/topCardsDarkWeb';
import OrgBreachesCompare from 'src/components/home/dashboard/OrgBreachesCompare';
import BreachStatusChart from 'src/components/observability/dark-web/breachStatus';
import BreachElementTypeChart from 'src/components/observability/dark-web/breachByElementTypeChart';
import ThreatsByFuzzerChart from 'src/components/observability/dark-web/ThreatsByFuzzerChart';
import UsernamesTable from 'src/components/observability/dark-web/UsernamesTable';
import DomainTable from 'src/components/observability/dark-web/domainTable';
import ThreatTypesBarChart from 'src/components/observability/dark-web/threatTypesBarChart';
import VIPsHeatmapChart from 'src/components/observability/dark-web/vipHeatMap';
import CompromisedTypesChart from 'src/components/observability/dark-web/vipsRadarChart';

const DarkWeb = () => {

  return (
    <Grid container spacing={3} mt={2}>
        <Grid item xs={12}>
            <TopCardsDarkWeb />
        </Grid>
        <Grid item xs={12} lg={3}>
            <OrgBreachesCompare />
        </Grid>
        <Grid item xs={12} lg={3}>
            <BreachStatusChart />
        </Grid>
        <Grid item xs={12} lg={3}>
            <BreachElementTypeChart />
        </Grid>
        <Grid item xs={12} lg={3}>
            <CompromisedTypesChart/>
        </Grid>
        <Grid item xs={12} lg={6}>
            <ThreatTypesBarChart />
        </Grid>
        <Grid item xs={12} lg={6}>
            <VIPsHeatmapChart/>
        </Grid>
        <Grid item xs={12} lg={12}>
            <ThreatsByFuzzerChart />
        </Grid>
        <Grid item xs={12} lg={12}>
            <UsernamesTable />
        </Grid>
        <Grid item xs={12} lg={12}>
            <DomainTable />
        </Grid>
        
    </Grid>
  );
};

export default DarkWeb;