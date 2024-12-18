import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import EHMatrixVulnerabilities from './EHMatrixVulnerabilities';
import RiskConsolidateChart from './EHRiskConsolidateChart';
import EHRiskExposureLevelChart from './EHRiskExposureLevelChart';

const EHOverview: React.FC<{ ehReport: any }> = ({ ehReport }) => {
  const { t } = useTranslation();

  let riskMatrizData = ehReport
    ? [
      ehReport?.matriz_low_low!,
      ehReport?.matriz_low_medium,
      ehReport?.matriz_low_high,
      ehReport?.matriz_medium_low,
      ehReport?.matriz_medium_medium,
      ehReport?.matriz_medium_high,
      ehReport?.matriz_high_low,
      ehReport?.matriz_high_medium,
      ehReport?.matriz_high_high
    ]
    : [];


  function generateCounters(vulnerabilities: any[] = []): number[] {
    let contLow = 0;
    let contMedium = 0;
    let contHigh = 0;
    let contCritical = 0;
    let contInfo = 0;

    vulnerabilities.forEach((vulnerability) => {
      const risk = vulnerability.risk?.toLowerCase();
      switch (risk) {
        case "low":
          contLow++;
          break;
        case "medium":
          contMedium++;
          break;
        case "high":
          contHigh++;
          break;
        case "critical":
          contCritical++;
          break;
        case "info":
          contInfo++;
          break;
      }
    });

    return [contLow, contMedium, contHigh, contCritical, contInfo];
  }
  const [contLow, contMedium, contHigh, contCritical, contInfo] = generateCounters(
    ehReport?.vulnerabilities || []
  );



  return (
    <Grid container spacing={1}>
      {!ehReport ? (
        <Loader />
      ) : (
        <>
          <Grid item xs={12} xl={12}>
            <Breadcrumb title={ehReport?.name}>
              <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                <Chip label={`${t("redteam.objectives")}: ${ehReport?.objectives}`} color="secondary" variant="outlined" />
                <Chip label={`${t("redteam.start_date")}: ${ehReport?.start_date_report}`} color="info" variant="outlined" />
                <Chip label={`${t("redteam.end_date")}: ${ehReport?.end_date_report}`} color="primary" variant="outlined" />
              </Box>
            </Breadcrumb>
          </Grid>
          <Grid item xs={12} xl={6}>
            <DashboardCard
              title={t("redteam.baseline_information") || ''}
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
                    {t("redteam.start_date")}
                  </Typography>
                  <Typography variant="body2">{ehReport?.start_date_report}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("redteam.end_date")}
                  </Typography>
                  <Typography variant="body2">{ehReport?.end_date_report}</Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("redteam.objectives")}
                  </Typography>
                  <Typography variant="body2">{ehReport?.objectives}</Typography>
                </Box>
              </Box>
            </DashboardCard>
          </Grid>


          <Grid item xs={12} xl={6}>
            <DashboardCard
              title={t("redteam.report_summary") || ''}
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
                    {t("redteam.ethical_hacking_tab")}
                  </Typography>
                  <Typography variant="body2">Sección del informe que contiene los resultados técnicos y el resumen ejecutivo.</Typography>  {/* // translate */}
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("redteam.evidence_tab")}
                  </Typography>
                  <Typography variant="body2">Contenedor de todos los anexos informativos y de soporte sobre las pruebas realizadas.</Typography>  {/* // translate */}
                </Box>
              </Box>
            </DashboardCard>
          </Grid>



          <Grid item xs={12} xl={6}>
            <DashboardCard
              title={t("redteam.risk_exposure_level") || ''}
            >
              <Box display="flex" flexDirection="column" gap={2} mt={1} sx={{ minHeight: '250px' }}>
                <EHRiskExposureLevelChart riskExposureLevel={ehReport?.risk_exposure_level!} />
              </Box>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} xl={6}>
            <DashboardCard
              title={t("redteam.evaluation_result") || ''}
            >
              <Box display="flex" flexDirection="column" gap={2} mt={1} sx={{ minHeight: '250px' }}>
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
                    {t("redteam.comments")}
                  </Typography>
                  <Typography variant="body2">{ehReport?.comments}</Typography>  {/* // translate */}
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("redteam.description_of_the_tests")}
                  </Typography>
                  <Typography variant="body2">{ehReport?.description_tests}</Typography>  {/* // translate */}
                </Box>
              </Box>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} xl={6}>
            <DashboardCard
              title={t("redteam.risk_consolidation") || ''}
            >
              <Box display="flex" flexDirection="column" gap={2} mt={1} sx={{ minHeight: '350px', maxHeight: '350px' }}>
                <RiskConsolidateChart
                  contLow={contLow} contMedium={contMedium}
                  contHigh={contHigh} contCritical={contCritical}
                  contInfo={contInfo}
                />
              </Box>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} xl={6}>
            <DashboardCard
              title={t("redteam.matrix_of_unique_vulnerabilities") || ''}
            >
              <Box display="flex" flexDirection="column" gap={2} mt={1} sx={{ minHeight: '350px' }}>
                {/* <HeatmapChart></HeatmapChart> */}
                <EHMatrixVulnerabilities matrixRequest={riskMatrizData} />
              </Box>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} xl={12}>
            <DashboardCard
              title={t("redteam.conclusions") || ''}
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
                {ehReport?.first_conclusion && (
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t("redteam.conclusion")} #1
                    </Typography>
                    <Typography variant="body2">{ehReport?.first_conclusion}</Typography>
                  </Box>
                )}

                {ehReport?.second_conclusion && (
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t("redteam.conclusion")} #2
                    </Typography>
                    <Typography variant="body2">{ehReport?.second_conclusion}</Typography>
                  </Box>
                )}

                {ehReport?.third_conclusion && (
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t("redteam.conclusion")} #3
                    </Typography>
                    <Typography variant="body2">{ehReport?.third_conclusion}</Typography>
                  </Box>
                )}

                {ehReport?.fourth_conclusion && (
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t("redteam.conclusion")} #4
                    </Typography>
                    <Typography variant="body2">{ehReport?.fourth_conclusion}</Typography>
                  </Box>
                )}

                {ehReport?.fifth_conclusion && (
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t("redteam.conclusion")} #5
                    </Typography>
                    <Typography variant="body2">{ehReport?.fifth_conclusion}</Typography>
                  </Box>
                )}

              </Box>
            </DashboardCard>
          </Grid>

        </>
      )}
    </Grid>
  );
};

export default EHOverview;
