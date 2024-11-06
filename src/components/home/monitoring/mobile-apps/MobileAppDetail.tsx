import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "src/store/Store";
import { ResultAppType } from 'src/types/monitoring/mobile-apps/mobileApp';
// import AlphaSuspicionLevel from '../malware-analyses/MalwareAnalysisAlphaSuspicionLevel';
// import MobileAppAccordion from './MobileAppAccordion';


const MobileAppDetail: React.FC<{ resultAppDetail: ResultAppType }> = ({ resultAppDetail }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  console.log("--------------");
  console.log(resultAppDetail);
  console.log("--------------");


  return (
    <div>
      <h1>Hola</h1>
    </div>

    // <Grid container spacing={1}>
    //   <Grid item xs={12} xl={12}>
    //     <Breadcrumb title={mobileAppDetail.results.appName}>
    //       <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
    //         <Chip label={`Score: ${mobileAppDetail.score}`} color="secondary" variant="outlined" />
    //         <Chip label={`Version: ${mobileAppDetail.version}`} color="info" variant="outlined" />
    //         <Chip label={`Release Date: ${mobileAppDetail.releaseDate}`} color="primary" variant="outlined" />
    //       </Box>
    //     </Breadcrumb>
    //   </Grid>
    //   <Grid item xs={12} xl={6}>
    //     <DashboardCard
    //       title={t("mobile_apps.summary")}
    //       subtitle={t("mobile_apps.mobile_application_details")}
    //     >
    //       <Box display="flex" flexDirection="column" gap={2} mt={1}>
    //         <Box>
    //           <Stack
    //             direction="row"
    //             spacing={2}
    //             mb={1}
    //             justifyContent="space-between"
    //             alignItems="center"
    //           >
    //           </Stack>
    //         </Box>
    //         <AlphaSuspicionLevel score={mobileAppDetail.score} type={"mobile app"} />
    //         <Box>
    //           <Typography variant="subtitle2" fontWeight={600}>
    //             {t("mobile_apps.source")}
    //           </Typography>
    //           <Typography variant="body2">{mobileAppDetail.source}</Typography>
    //         </Box>
    //         <Box>
    //           <Typography variant="subtitle2" fontWeight={600}>
    //             {t("mobile_apps.download_link")}
    //           </Typography>
    //           <Typography variant="body2">{mobileAppDetail.downloadLink}</Typography>
    //         </Box>

    //         <Box>
    //           <Typography variant="subtitle2" fontWeight={600}>
    //             {t("mobile_apps.language")}
    //           </Typography>
    //           <Typography variant="body2">{mobileAppDetail.details.language}</Typography>
    //         </Box>
    //       </Box>
    //     </DashboardCard>
    //   </Grid>

    //   <Grid item xs={12} xl={6}>
    //     <DashboardCard
    //       title={t("mobile_apps.security")}
    //       subtitle={t("mobile_apps.security_and_integrity_analysis")}
    //     >
    //       <Box display="flex" flexDirection="column" gap={2} mt={1}>

    //         <Box>
    //           <Stack
    //             direction="row"
    //             spacing={2}
    //             mb={1}
    //             justifyContent="space-between"
    //             alignItems="center"
    //           >
    //           </Stack>
    //         </Box>
    //         <Box>
    //           <Typography variant="subtitle2" fontWeight={600}>
    //             {t("mobile_apps.id")}
    //           </Typography>
    //           <Typography variant="body2">{mobileAppDetail.idApp}</Typography>
    //         </Box>

    //         <Box>
    //           <Typography variant="subtitle2" fontWeight={600}>
    //             {t("mobile_apps.score")}
    //           </Typography>
    //           <Typography
    //             variant="body2"
    //             sx={{
    //               wordBreak: "break-all"
    //             }}
    //           >
    //             {mobileAppDetail.score}
    //           </Typography>
    //         </Box>

    //         <Box>
    //           <Typography variant="subtitle2" fontWeight={600}>
    //             {t("mobile_apps.version")}
    //           </Typography>
    //           <Typography variant="body2">{mobileAppDetail.version}</Typography>
    //         </Box>
    //         <Box>
    //           <Typography variant="subtitle2" fontWeight={600}>
    //             Número de descargas
    //           </Typography>
    //           <Typography variant="body2">{mobileAppDetail.details.downloads}</Typography>
    //         </Box>
    //         <Box>
    //           <Typography variant="subtitle2" fontWeight={600}>
    //             {t("mobile_apps.digital_signature")}
    //           </Typography>
    //           <Typography
    //             variant="body2"
    //             sx={{
    //               wordBreak: "break-all"
    //             }}
    //           >
    //             {mobileAppDetail.digitalSignature}
    //           </Typography>
    //         </Box>

    //         <Box>
    //           <Typography variant="subtitle2" fontWeight={600}>
    //             {t("mobile_apps.hash")}
    //           </Typography>
    //           <Typography
    //             variant="body2"
    //             sx={{
    //               wordBreak: "break-all"
    //             }}
    //           >
    //             {mobileAppDetail.apkHash}
    //           </Typography>
    //         </Box>

    //       </Box>
    //     </DashboardCard>

    //   </Grid>

    //   <Grid item xs={12} xl={12}>
    //     <DashboardCard title={t("mobile_apps.application_analysis_report")}>
    //       <MobileAppAccordion data={mobileAppDetail} />
    //     </DashboardCard>
    //   </Grid>
    // </Grid>
  );
};

export default MobileAppDetail;