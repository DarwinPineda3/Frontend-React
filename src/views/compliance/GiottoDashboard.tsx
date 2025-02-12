import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import ComplianceChart from 'src/components/compliance/dashboard/ComplianceChart';
import ExecutionByGroup from 'src/components/compliance/dashboard/ExecutionByGroup';
import ExecutionByMonth from 'src/components/compliance/dashboard/ExecutionByMonth';
import ExecutionByProject from 'src/components/compliance/dashboard/ExecutionByProject';
import GroupComplianceChart from 'src/components/compliance/dashboard/GroupComplianceChart';
import PercentageOfUse from 'src/components/compliance/dashboard/PercentageOfUse';
import ProjectComplianceChart from 'src/components/compliance/dashboard/ProjectComplianceChart';
import StatsCardGrid from 'src/components/compliance/dashboard/StatsCard';
import PageContainer from 'src/components/container/PageContainer';
import { useTranslation } from 'react-i18next';

const GiottoDashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <PageContainer title="Akila">
      <Box pt={2}>
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
                         {t('compliance.compliance_by_project')}
                        </Typography>
                        <ComplianceChart />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" color="textPrimary">
                         {t('compliance.compliance_by_group')}
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
                     {t('compliance.compliance_by_group')}
                    </Typography>
                    <ProjectComplianceChart />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textPrimary">
                     {t('compliance.execution_by_month')}
                    </Typography>
                    <ExecutionByMonth />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textPrimary">
                     {t('compliance.execution_by_project')}
                    </Typography>
                    <ExecutionByProject />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textPrimary">
                     {t('compliance.execution_by_group')}
                    </Typography>
                    <ExecutionByGroup />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textPrimary">
                     {t('compliance.percentage_of_use')}
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
