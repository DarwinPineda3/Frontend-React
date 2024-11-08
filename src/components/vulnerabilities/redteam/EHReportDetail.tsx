import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import { EHReportType } from 'src/types/vulnerabilities/redteam/ethicalHackingReport';

const EHReportDetail: React.FC<{ ehReport: EHReportType }> = ({ ehReport }) => {
  const { t } = useTranslation();

  console.log(ehReport);


  return (
    <Grid container spacing={1}>
      {!ehReport ? (
        <Loader />
      ) : (
        <>

          <Grid item xs={12} xl={12}>
            <Breadcrumb title={ehReport.name}> {/* // traslate */}
              <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                <Chip label={`Objetives: ${ehReport.objectives}`} color="secondary" variant="outlined" />
                <Chip label={`Start date: ${ehReport.start_date_report}`} color="info" variant="outlined" />
                <Chip label={`End date: ${ehReport.end_date_report}`} color="primary" variant="outlined" />
              </Box>
            </Breadcrumb>
          </Grid>
          <Grid item xs={12} xl={6}>
            <DashboardCard
              title="Baseline Information" //traslate
            >
              <Box display="flex" flexDirection="column" gap={2} mt={1}>
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
                    Start date  {/* // traslate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.start_date_report}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    End date  {/* // traslate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.end_date_report}</Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Objetives  {/* // traslate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.objectives}</Typography>
                </Box>
              </Box>
            </DashboardCard>
          </Grid>


          <Grid item xs={12} xl={6}>
            <DashboardCard
              title="Report Summary" //traslate
            >
              <Box display="flex" flexDirection="column" gap={2} mt={1}>
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
                    Ethical hacking tab  {/* // traslate */}
                  </Typography>
                  <Typography variant="body2">Sección del informe que contiene los resultados técnicos y el resumen ejecutivo.</Typography>  {/* // traslate */}
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Evidence tab  {/* // traslate */}
                  </Typography>
                  <Typography variant="body2">Contenedor de todos los anexos informativos y de soporte sobre las pruebas realizadas.</Typography>  {/* // traslate */}
                </Box>
              </Box>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} xl={6}>
            <DashboardCard
              title="Evaluation result" //traslate
            >
              <Box display="flex" flexDirection="column" gap={2} mt={1}>
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
                    Comments  {/* // traslate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.ehsummaries.comments}</Typography>  {/* // traslate */}
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Description of the tests  {/* // traslate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.ehsummaries.description_tests}</Typography>  {/* // traslate */}
                </Box>
              </Box>
            </DashboardCard>
          </Grid>


          <Grid item xs={12} xl={6}>
            <DashboardCard
              title="Conclusions" //traslate
            >
              <Box display="flex" flexDirection="column" gap={2} mt={1}>
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
                  Conclusion #1  {/* // traslate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.ehsummaries.first_conclusion}</Typography>  {/* // traslate */}
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                  Conclusion #2  {/* // traslate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.ehsummaries.second_conclusion}</Typography>  {/* // traslate */}
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                  Conclusion #3  {/* // traslate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.ehsummaries.third_conclusion}</Typography>  {/* // traslate */}
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                  Conclusion #4  {/* // traslate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.ehsummaries.fourth_conclusion}</Typography>  {/* // traslate */}
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                  Conclusion #5  {/* // traslate */}
                  </Typography>
                  <Typography variant="body2">{ehReport.ehsummaries.fifth_conclusion}</Typography>  {/* // traslate */}
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
