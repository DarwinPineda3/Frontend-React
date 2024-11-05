//basic component

import { Grid, Box, IconButton, Breadcrumbs, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageContainer from 'src/components/container/PageContainer';
import { useTranslation } from 'react-i18next';

const DarkWeb = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="">
              {t('monitoring.monitoring')}
            </Link>
            <Link component={RouterLink} color="inherit" to="">
              {t('monitoring.cyber_guard')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/monitoring/threats-overview">
              {t('menu.dark_web_monitoring')}
            </Link>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12}>
          <TopCardsDarkWeb />
        </Grid>
        <Grid item xs={12} lg={4}>
          <OrgBreachesCompare />
        </Grid>
        <Grid item xs={12} lg={4}>
          <BreachStatusChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <BreachElementTypeChart />
        </Grid>
        <Grid item xs={12} lg={3}>
          <CompromisedTypesChart />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ThreatTypesBarChart />
        </Grid>
        <Grid item xs={12} lg={6}>
          <VIPsHeatmapChart />
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
    </PageContainer>
  );
};

export default DarkWeb;
