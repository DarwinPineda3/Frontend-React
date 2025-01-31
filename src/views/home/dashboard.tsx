import { Box, Grid } from "@mui/material";
import ExecutionByGroup from "src/components/compliance/dashboard/ExecutionByGroup";
import ExecutionByMonth from "src/components/compliance/dashboard/ExecutionByMonth";
import StatsCardGrid from "src/components/compliance/dashboard/StatsCard";
import PageContainer from "src/components/container/PageContainer";
import AlertDistribution from "src/components/home/dashboard/AlertDistribution";
import AssetStatus from "src/components/home/dashboard/AssetStatus";
import ObservedAssetsTable from "src/components/observability/assets/ObservedAssetsTableView";
import OrgBreachesCompare from "src/components/home/dashboard/OrgBreachesCompare";
import RevenueUpdates from "src/components/home/dashboard/RevenueUpdates";
import SentimentStreamGraph from "src/components/home/dashboard/SentimentHistory";
import TopCardCyberGuardDashboard from "src/components/home/dashboard/TopCardCyberGuardDashboard";
import TopCardsDashboard from "src/components/home/dashboard/TopCards";
import TopVulnerabilities from "src/components/home/dashboard/TopVulnerabilities";
import WeeklyStats from "src/components/home/dashboard/WeeklyStats";
import RecentEvents from "src/components/home/RecentEvents";
import { getUserGroups } from "src/guards/jwt/Jwt";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const groups = getUserGroups();
  const navigate = useNavigate();
  const handleScanClick = (id: string | number) => {
    navigate(`/observability/observed-assets/assets/${id}`);
  };


  /*
  const [groups, setGroups] = useState(['Defender', 'CyberGuard', 'Scan360']);
  const possibleGroups = ['Defender', 'CyberGuard', 'Scan360'];
  function debugPicker() {
    return (
      <Box>
        <h3>Debug Group Picker</h3>
        <div>
          {possibleGroups.map((group) => {
            return (
              <button key={group} onClick={() => {
                if (groups.includes(group)) {
                  setGroups(groups.filter((g) => g !== group));
                } else {
                  setGroups([...groups, group]);
                }
              }}>
                {group}
              </button>
            );
          })}
        </div>
        <div>
          <p>Selected Groups: {groups.join(', ')}</p>
        </div>
      </Box>
    );
  }
  */
  return (
    <PageContainer title="Akila">
      <Box>
        {/*{debugPicker()}*/}
        <Grid container spacing={3}>
          {/* Top Section */}
          <Grid item xs={12}>
            {
              groups.includes('Scan360') && (
                <Box >
                  <TopCardsDashboard />
                </Box>
              )
            }
            {
              groups.includes('CyberGuard') && !groups.includes('Scan360') && (
                <Box >
                  <TopCardCyberGuardDashboard />
                </Box>
              )
            }
            {
              groups.includes('Defender') && !groups.includes('CyberGuard') && !groups.includes('Scan360') && (
                <Box mt={2}>
                  <StatsCardGrid />
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
                    <><ObservedAssetsTable onScanClick={handleScanClick} /><Box my={2} /></>
                  )
                }
                <Grid item xs={12}>
                  {
                    groups.includes('CyberGuard') && (
                      <SentimentStreamGraph />
                    )
                  }
                </Grid>
                {
                  groups.includes('Defender') && (
                    <Grid item xs={12} my={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <ExecutionByMonth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ExecutionByGroup />
                        </Grid>
                      </Grid>
                    </Grid>

                  )
                }
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
