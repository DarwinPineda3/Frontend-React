import { Box, Grid } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import RevenueUpdates from "src/components/dashboards/modern/RevenueUpdates";
import TopCards from "src/components/dashboards/modern/TopCards";
import WeeklyStats from "src/components/dashboards/modern/WeeklyStats";
import AlertDistribution from "src/components/home/AlertDistribution";
import AssetStatus from "src/components/home/AssetStatus";
import HostResourceTable from "src/components/home/HostResourceTable";
import OrgBreachesCompare from "src/components/home/OrgBreachesCompare";
import RecentEvents from "src/components/home/RecentEvents";
import TopVulnerabilities from "src/components/home/TopVulnerabilities";
import Welcome from "src/layouts/full/shared/welcome/Welcome";

const Dashboard = () => {
  return (
    <PageContainer title="Akila">
      <Box>
        <Grid container spacing={3} >
          {/* column */}
          <Grid item xs={9} lg={9}>
            <TopCards />
          </Grid>
          <Grid item xs={3} lg={3}>
            <AssetStatus />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={9} >
            <TopVulnerabilities />
            <Box my={2} />
            <RevenueUpdates />
            <Box my={2} />
            <Grid item xs={12} lg={12}>
              <HostResourceTable />
            </Grid>
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={3} >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={12}>
                <AlertDistribution />
              </Grid>
              <Grid item xs={12} sm={6} lg={12}>
                <RecentEvents />
              </Grid>
              <Grid item xs={12} lg={12}>
                <WeeklyStats />
              </Grid>
              <Grid item xs={12} lg={12}>
                <OrgBreachesCompare />
              </Grid>
            </Grid>
          </Grid>
          {/* column */}



        </Grid>
        {/* column */}
        <Welcome />
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
