import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import { EHReportType } from 'src/types/vulnerabilities/redteam/ethicalHackingReport';
import EHMatrixVulnerabilities from './EHMatrixVulnerabilities';
import EHRiskExposureLevelChart from './EHRiskExposureLevelChart';

const EHReportDetail: React.FC<{ ehReport: EHReportType }> = ({ ehReport }) => {
  const { t } = useTranslation();

  let riskMatrizData = ehReport?.ehsummaries
  ? [
      ehReport.ehsummaries.matriz_low_low!,
      ehReport.ehsummaries.matriz_low_medium,
      ehReport.ehsummaries.matriz_low_high,
      ehReport.ehsummaries.matriz_medium_low,
      ehReport.ehsummaries.matriz_medium_medium,
      ehReport.ehsummaries.matriz_medium_high,
      ehReport.ehsummaries.matriz_high_low,
      ehReport.ehsummaries.matriz_high_medium,
      ehReport.ehsummaries.matriz_high_high
    ]
  : [];

  return (
    <Grid container spacing={1}>
      {!ehReport ? (
        <Loader />
      ) : (
        <>

          <Grid item xs={12} xl={12}>
            <Breadcrumb title={ehReport.name}> {/* // translate */}
              <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                <Chip label={`Objetives: ${ehReport.objectives}`} color="secondary" variant="outlined" />
                <Chip label={`Start date: ${ehReport.start_date_report}`} color="info" variant="outlined" />
                <Chip label={`End date: ${ehReport.end_date_report}`} color="primary" variant="outlined" />
              </Box>
            </Breadcrumb>
          </Grid>
          <Grid item xs={12} xl={6}>
            <DashboardCard
              title="Baseline Information" //translate
            >
              <Box display="flex" flexDirection="column" gap={2} mt={1} sx={{ minHeight: '200px' }}>
                <Box>
                  <Stack
                    direction="row"
                    spacing={2}
                    mb={1}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Start date  {/* // translate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.start_date_report}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    End date  {/* // translate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.end_date_report}</Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Objetives  {/* // translate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.objectives}</Typography>
                </Box>
              </Box>
            </DashboardCard>
          </Grid>


          <Grid item xs={12} xl={6}>
            <DashboardCard
              title="Report Summary" //translate
            >
              <Box display="flex" flexDirection="column" gap={2} mt={1} sx={{ minHeight: '200px' }}>
                <Box>
                  <Stack
                    direction="row"
                    spacing={2}
                    mb={1}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Ethical hacking tab  {/* // translate */}
                  </Typography>
                  <Typography variant="body2">Sección del informe que contiene los resultados técnicos y el resumen ejecutivo.</Typography>  {/* // translate */}
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Evidence tab  {/* // translate */}
                  </Typography>
                  <Typography variant="body2">Contenedor de todos los anexos informativos y de soporte sobre las pruebas realizadas.</Typography>  {/* // translate */}
                </Box>
              </Box>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} xl={6}>
            <DashboardCard
              title="Risk Exposure Level" //translate
            >
              <Box display="flex" flexDirection="column" gap={2} mt={1}>
                <EHRiskExposureLevelChart riskExposureLevel={ehReport.ehsummaries?.risk_exposure_level!} />
              </Box>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} xl={6}>
            <DashboardCard
              title="Evaluation result" //translate
            >
              <Box display="flex" flexDirection="column" gap={2} mt={1} sx={{ minHeight: '200px' }}>
                <Box>
                  <Stack
                    direction="row"
                    spacing={2}
                    mb={1}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Comments  {/* // translate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.ehsummaries.comments}</Typography>  {/* // translate */}
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Description of the tests  {/* // translate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.ehsummaries.description_tests}</Typography>  {/* // translate */}
                </Box>
              </Box>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} xl={6}>
            <DashboardCard
              title="Matrix of Unique Vulnerabilities" //translate
            >
              <Box display="flex" flexDirection="column" gap={2} mt={1} sx={{ minHeight: '200px' }}>
                {/* <HeatmapChart></HeatmapChart> */}
                <EHMatrixVulnerabilities matrixRequest={riskMatrizData} />
              </Box>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} xl={6}>
            <DashboardCard
              title="Conclusions" //translate
            >
              <Box display="flex" flexDirection="column" gap={2} mt={1} sx={{ minHeight: '200px' }}>
                <Box>
                  <Stack
                    direction="row"
                    spacing={2}
                    mb={1}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Conclusion #1  {/* // translate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.ehsummaries.first_conclusion}</Typography>  {/* // translate */}
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Conclusion #2  {/* // translate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.ehsummaries.second_conclusion}</Typography>  {/* // translate */}
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Conclusion #3  {/* // translate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.ehsummaries.third_conclusion}</Typography>  {/* // translate */}
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Conclusion #4  {/* // translate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.ehsummaries.fourth_conclusion}</Typography>  {/* // translate */}
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Conclusion #5  {/* // translate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.ehsummaries.fifth_conclusion}</Typography>  {/* // translate */}
                </Box>
              </Box>
            </DashboardCard>
          </Grid>

        </>
      )}
    </Grid>
  );
};

export default EHReportDetail;
