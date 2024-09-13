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
    <Grid container spacing={3}>
      {/* Top Section */}
      <Grid item xs={12} lg={12}>
            <TopCards  />
      </Grid>

      {/* Main Section */}
      <Grid item container xs={12} spacing={3}>
        {/* Left Column (Main Content, 60% of screen width) */}
        <Grid item xs={12} lg={9}>
          <TopVulnerabilities />
          <Box my={2} />
          <RevenueUpdates />
          <Box my={2} />
          <HostResourceTable />
        </Grid>

        {/* Right Column (Sidebar) */}
        <Grid item xs={12} lg={3}>
          <Grid container spacing={3}>
            
            <Grid item xs={12} >
            <AssetStatus  />
            </Grid>
            <Grid item xs={12}>
              <AlertDistribution />
            </Grid>
            <Grid item xs={12}>
              <RecentEvents />
            </Grid>
            <Grid item xs={12}>
              <WeeklyStats />
            </Grid>
            <Grid item xs={12}>
              <OrgBreachesCompare />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    {/* Footer Section */}
    <Welcome />
  </Box>
</PageContainer>


  );
};

export default Dashboard;
