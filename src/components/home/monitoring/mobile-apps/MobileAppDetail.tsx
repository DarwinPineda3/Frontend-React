import React from 'react';
import { Grid, Box, Chip, Typography, Stack } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import AlphaSuspicionLevel from '../malware-analyses/MalwareAnalysisAlphaSuspicionLevel';
import MobileAppAccordion from './MobileAppAccordion';
import { useTranslation } from 'react-i18next';


const MobileAppDetail: React.FC<{ mobileAppId: string }> = ({ mobileAppId }) => {
  const { t } = useTranslation();
  const mobileApp = {
    id: "123867435",
    idApp: "com.bancodebogota.apklive",
    appName: "Banco de Bogotá",
    downloadLink: "https://apklive.com/bancodebogota",
    releaseDate: "2024-08-15",
    version: "3.4.7",
    source: "APK Live",
    digitalSignature: "3082025D308201C6A0030201020214A7B4C6D5F8A3B9E5D4C1F2B7A6E8F9C1",
    apkHash: "C1D8B5A4F7C2A9E3F5D1C4B9E7A6B3D8F1C2E9A4B5D3F6A7",
    score: 0,
    details: {
      language: "Español",
      downloads: "2 millones+",
      permissions: ["Acceso a contactos", "Ubicación"],
      risks: ["Almacenamiento inseguro de datos", "Exposición de ubicaciones de usuarios"],
      OWASP: ["A7 - Almacenamiento de datos inseguro", "A4 - Configuración insegura"],
      externalCommunications: ["Comunicación no cifrada detectada", "Análisis de tráfico no autorizado"]
    }
  }

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
                {t("mobile_apps.release_date")}
              </Typography>
              <Typography variant="body2">{mobileApp.releaseDate}</Typography>
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