import { Box, Grid } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import AlertDistribution from "src/components/home/dashboard/AlertDistribution";
import AssetStatus from "src/components/home/dashboard/AssetStatus";
import HostResourceTable from "src/components/home/dashboard/HostResourceTable";
import OrgBreachesCompare from "src/components/home/dashboard/OrgBreachesCompare";
import RevenueUpdates from "src/components/home/dashboard/RevenueUpdates";
import SentimentStreamGraph from "src/components/home/dashboard/SentimentHistory";
import TopCardCyberGuardDashboard from "src/components/home/dashboard/TopCardCyberGuardDashboard";
import TopCardsDashboard from "src/components/home/dashboard/TopCards";
import TopVulnerabilities from "src/components/home/dashboard/TopVulnerabilities";
import WeeklyStats from "src/components/home/dashboard/WeeklyStats";
import RecentEvents from "src/components/home/RecentEvents";
import { getUserGroups } from "src/guards/jwt/Jwt";

const Dashboard = () => {
  //const groups = getUserGroups();

  const groups = getUserGroups();

  return (
    <PageContainer title="Akila">
      <Box>
        <Grid container spacing={3}>
          {/* Top Section */}
          <Grid item xs={12}>
            {
              groups.includes('Scan360') && (
                <Box mb={3}>
                  <TopCardsDashboard />
                </Box>
              )
            }
            {
              groups.includes('CyberGuard') && !groups.includes('Scan360') && (
                <Box mb={3}>
                  <TopCardCyberGuardDashboard />
                </Box>
              )
            }
          </Grid>
          {/* Main Section */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {/* Left Column (Main Content, 60% of screen width) */}
              <Grid item xs={12} lg={9}>
                {
                  groups.includes('Scan360') && (
                    <><TopVulnerabilities /><Box my={2} /></>
                  )
                }
                {
                  groups.includes('Scan360') && (
                    <><RevenueUpdates /><Box my={2} /></>
                  )
                }
                {
                  groups.includes('Scan360') && (
                    <><HostResourceTable /><Box my={2} /></>
                  )
                }
                <Grid item xs={12}>
                  {
                    groups.includes('CyberGuard') && (
                      <SentimentStreamGraph />
                    )
                  }
                </Grid>
              </Grid>
              {/* Right Column (Sidebar) */}
              <Grid item xs={12} lg={3}>
                <Grid container spacing={3}>
                  {
                    groups.includes('Scan360') && (
                      <Grid item xs={12}>
                        <AssetStatus />
                      </Grid>
                    )
                  }
                  {
                    groups.includes('Scan360') && (
                      <Grid item xs={12}>
                        <AlertDistribution />
                      </Grid>
                    )
                  }
                  {
                    groups.includes('Scan360') && (
                      <Grid item xs={12}>
                        <RecentEvents />
                      </Grid>
                    )
                  }
                  {
                    groups.includes('CyberGuard') && (
                      <Grid item xs={12}>
                        <WeeklyStats />
                      </Grid>
                    )
                  }
                  {
                    groups.includes('CyberGuard') && (
                      <Grid item xs={12}>
                        <OrgBreachesCompare />
                      </Grid>
                    )
                  }
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
