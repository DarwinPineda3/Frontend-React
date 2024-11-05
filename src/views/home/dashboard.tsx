import { Box, Grid } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import AlertDistribution from "src/components/home/dashboard/AlertDistribution";
import AssetStatus from "src/components/home/dashboard/AssetStatus";
import HostResourceTable from "src/components/home/dashboard/HostResourceTable";
import OrgBreachesCompare from "src/components/home/dashboard/OrgBreachesCompare";
import RevenueUpdates from "src/components/home/dashboard/RevenueUpdates";
import SentimentStreamGraph from "src/components/home/dashboard/SentimentHistory";
import TopCardsDashboard from "src/components/home/dashboard/TopCards";
import TopVulnerabilities from "src/components/home/dashboard/TopVulnerabilities";
import WeeklyStats from "src/components/home/dashboard/WeeklyStats";
import RecentEvents from "src/components/home/RecentEvents";

const Dashboard = () => {
  return (
    <PageContainer title="Akila">
      <Box>
        <Grid container spacing={3}>
          {/* Top Section */}
          <Grid item xs={12}>
            <TopCardsDashboard />
          </Grid>
          {/* Main Section */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {/* Left Column (Main Content, 60% of screen width) */}
              <Grid item xs={12} lg={9}>
                <TopVulnerabilities />
                <Box my={2} />
                <RevenueUpdates />
                <Box my={2} />
                <HostResourceTable />

                <Box my={2} />
                <Grid item xs={12}>
                  <SentimentStreamGraph />
                </Grid>
              </Grid>
              {/* Right Column (Sidebar) */}
              <Grid item xs={12} lg={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} >
                    <AssetStatus />
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
        </Grid>
        {/* Footer Section */}
        {/* <Welcome /> */}
      </Box>
    </PageContainer>


  );
};

export default Dashboard;
