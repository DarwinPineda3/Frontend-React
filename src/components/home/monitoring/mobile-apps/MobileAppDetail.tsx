import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import AlphaSuspicionLevel from '../malware-analyses/MalwareAnalysisAlphaSuspicionLevel';
import MobileAppAccordion from './MobileAppAccordion';
import { fetchMobielAppById } from "src/store/sections/mobile-app/MobileAppSlice";
import { useDispatch, useSelector } from "src/store/Store";


const MobileAppDetail: React.FC<{ mobileAppId: string }> = ({ mobileAppId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const mobileApp = {
  //   id: "123867435",
  //   idApp: "co.com.ath.bbog.icbs",
  //   appName: "Banco de Bogotá App Negocios APK",
  //   downloadLink: "https://apk.support/download-app-es/co.com.ath.bbog.icbs",
  //   releaseDate: "2024-10-21",
  //   version: "1.15.3",
  //   source: "APK Support",
  //   digitalSignature: "3082025D308201C6A0030201020214C8F3A5D7E9B2C1A6F4D7E3B8A2C4D5E7",
  //   apkHash: "B2A6E8C5D9F3C4A1B5E7F1C8A3D2B9F6E4C1A5B8D7F3",
  //   score: 4,
  //   details: {
  //     language: "Español",
  //     downloads: "15.41 mil",
  //     permissions: [
  //       "Dangerous - Allows application to take pictures and videos with the camera. This allows the application to collect images that the camera is seeing at any time",
  //       "Dangerous - Allows the application to access the phone features of the device. An application with this permission can determine the phone number and serial number of this phone, whether a call is active, the number that call is connected to and so on.",
  //       "Normal - Allows an application to view the status of all networks.",
  //       "Normal - Allows a regular application to use Service.startForeground.",
  //       "Normal - Allows an application to create network sockets.",
  //       "Normal - Allows the application to control the vibrator.",
  //       "Normal - Allows an application to prevent the phone from going to sleep."
  //     ],
  //     risks: ["High - External data in SQL queries", "high - A5 - Configuración de seguridad incorrecta", "medium - JS enabled in a WebView"],
  //     OWASP: ["External data in SQL queries", "A5 - Configuración de seguridad incorrecta", "JS enabled in a WebView", "Usage of unencrypted HTTP protocol", "Hardcoded data", "Missing tapjacking protection", "Usage of implicit intent"],
  //     externalCommunications: ["No se detectaron comunicaciones no autorizadas"]
  //   }
  // }
  const mobileApp = useSelector((state: any) => state.mobileAppsReducer.mobileApp);
  React.useEffect(() => {
    dispatch(fetchMobielAppById(mobileAppId));
  }, [dispatch, mobileAppId]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} xl={12}>
        <Breadcrumb title={mobileApp.appName}>
          <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
            <Chip label={`Score: ${mobileApp.score}`} color="secondary" variant="outlined" />
            <Chip label={`Version: ${mobileApp.version}`} color="info" variant="outlined" />
            <Chip label={`Release Date: ${mobileApp.releaseDate}`} color="primary" variant="outlined" />
          </Box>
        </Breadcrumb>
      </Grid>
      <Grid item xs={12} xl={6}>
        <DashboardCard
          title={t("mobile_apps.summary")}
          subtitle={t("mobile_apps.mobile_application_details")}
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
            <AlphaSuspicionLevel score={mobileApp.score} type={"mobile app"} />
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {t("mobile_apps.source")}
              </Typography>
              <Typography variant="body2">{mobileApp.source}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {t("mobile_apps.download_link")}
              </Typography>
              <Typography variant="body2">{mobileApp.downloadLink}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {t("mobile_apps.language")}
              </Typography>
              <Typography variant="body2">{mobileApp.details.language}</Typography>
            </Box>
          </Box>
        </DashboardCard>
      </Grid>

      <Grid item xs={12} xl={6}>
        <DashboardCard
          title={t("mobile_apps.security")}
          subtitle={t("mobile_apps.security_and_integrity_analysis")}
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
                {t("mobile_apps.id")}
              </Typography>
              <Typography variant="body2">{mobileApp.idApp}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {t("mobile_apps.score")}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-all"
                }}
              >
                {mobileApp.score}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {t("mobile_apps.version")}
              </Typography>
              <Typography variant="body2">{mobileApp.version}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Número de descargas
              </Typography>
              <Typography variant="body2">{mobileApp.details.downloads}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {t("mobile_apps.digital_signature")}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-all"
                }}
              >
                {mobileApp.digitalSignature}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {t("mobile_apps.hash")}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-all"
                }}
              >
                {mobileApp.apkHash}
              </Typography>
            </Box>

          </Box>
        </DashboardCard>

      </Grid>

      <Grid item xs={12} xl={12}>
        <DashboardCard title={t("mobile_apps.application_analysis_report")}>
          <MobileAppAccordion data={mobileApp} />
        </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default MobileAppDetail;