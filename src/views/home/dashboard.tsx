import { Box, Grid } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import Customers from "src/components/dashboards/modern/Customers";
import EmployeeSalary from "src/components/dashboards/modern/EmployeeSalary";
import MonthlyEarnings from "src/components/dashboards/modern/MonthlyEarnings";
import Projects from "src/components/dashboards/modern/Projects";
import RevenueUpdates from "src/components/dashboards/modern/RevenueUpdates";
import SellingProducts from "src/components/dashboards/modern/SellingProducts";
import Social from "src/components/dashboards/modern/Social";
import TopCards from "src/components/dashboards/modern/TopCards";
import WeeklyStats from "src/components/dashboards/modern/WeeklyStats";
import YearlyBreakup from "src/components/dashboards/modern/YearlyBreakup";
import AlertDistribution from "src/components/home/AlertDistribution";
import AssetStatus from "src/components/home/AssetStatus";
import RecentEvents from "src/components/home/RecentEvents";
import TopVulnerabilities from "src/components/home/TopVulnerabilities";
import Welcome from "src/layouts/full/shared/welcome/Welcome";

const Dashboard = () => {
    return (
        <PageContainer title="Akila">
          <Box>
            <Grid container spacing={3} >
              {/* column */}
              <Grid item xs={12} lg={12}>
                <TopCards />
              </Grid>
              {/* column */}
              <Grid item xs={12} lg={9} >
                <TopVulnerabilities />
              </Grid>
              {/* column */}
              <Grid item xs={12} lg={3} >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={12}>
                    <AssetStatus />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={12}>
                    <RecentEvents/>
                  </Grid>
                </Grid>
              </Grid>
              {/* column */}
              <Grid item xs={12} lg={4}>
                <WeeklyStats/>
              </Grid>
              <Grid item xs={12} lg={8}>
                <RevenueUpdates />
              </Grid>
              {/**
              <Grid item xs={12} lg={4}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Customers />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Projects />
                  </Grid>
                  <Grid item xs={12}>
                    <Social />
                  </Grid>
                </Grid>
              </Grid>
              */}
              {/* column */}
              {/* column */}
              <Grid item xs={8} lg={8}>
                <AlertDistribution />
              </Grid>
            </Grid>
            {/* column */}
            <Welcome />
          </Box>
        </PageContainer>
      );
};

export default Dashboard;
