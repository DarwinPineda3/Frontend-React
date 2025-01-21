import React from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import StatsCardGrid from 'src/components/compliance/dashboard/StatsCard'; 
import ComplianceChart from 'src/components/compliance/dashboard/ComplianceChart'; 
import GroupComplianceChart from 'src/components/compliance/dashboard/GroupComplianceChart'; 
import ProjectComplianceChart from 'src/components/compliance/dashboard/ProjectComplianceChart';
import ExecutionByMonth from 'src/components/compliance/dashboard/ExecutionByMonth'; 
import ExecutionByProject from 'src/components/compliance/dashboard/ExecutionByProject'; 
import ExecutionByGroup from 'src/components/compliance/dashboard/ExecutionByGroup'; 
import PercentageOfUse from 'src/components/compliance/dashboard/PercentageOfUse';  

const GiottoDashboard: React.FC = () => {
  return (
    <PageContainer title="Akila">
      <Box>
        <Grid container spacing={3}>
          {/* Top Section */}
          <Grid item xs={12}>
            <StatsCardGrid />
          </Grid>

          {/* Main Section */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" color="textPrimary">
                          Compliance by Project
                        </Typography>
                        <ComplianceChart />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" color="textPrimary">
                          Compliance by Group
                        </Typography>
                        <GroupComplianceChart />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textPrimary">
                      Compliance by Group
                    </Typography>
                    <ProjectComplianceChart /> 
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textPrimary">
                      Execution by Month
                    </Typography>
                    <ExecutionByMonth /> 
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textPrimary">
                      Execution by Project
                    </Typography>
                    <ExecutionByProject /> 
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textPrimary">
                      Execution by Group
                    </Typography>
                    <ExecutionByGroup />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textPrimary">
                      Percentage of Use
                    </Typography>
                    <PercentageOfUse /> 
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default GiottoDashboard;
