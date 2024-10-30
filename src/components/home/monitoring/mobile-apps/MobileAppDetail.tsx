import React from 'react';
import { Grid, Box, Chip, Typography, Stack } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import AlphaSuspicionLevel from '../malware-analyses/MalwareAnalysisAlphaSuspicionLevel';
import MobileAppAccordion from './MobileAppAccordion';
import { useTranslation } from 'react-i18next';


const MobileAppDetail: React.FC<{ mobileAppId: string }> = ({ mobileAppId }) => {

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
        <DashboardCard title="Summary" subtitle="Mobile application details">
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
            <AlphaSuspicionLevel score={mobileApp.score} type={"mobile app"}/>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Source:
              </Typography>
              <Typography variant="body2">{mobileApp.source}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Download link:
              </Typography>
              <Typography variant="body2">{mobileApp.downloadLink}</Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Language:
              </Typography>
              <Typography variant="body2">{mobileApp.details.language}</Typography>
            </Box>
          </Box>
        </DashboardCard>
      </Grid>

      <Grid item xs={12} xl={6}>
        <DashboardCard title="Security" subtitle="Security and Integrity Analysis">
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
                Id:
              </Typography>
              <Typography variant="body2">{mobileApp.idApp}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Score:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-all" // Rompe el texto en una nueva línea si es necesario
                }}
              >
                {mobileApp.score}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Version:
              </Typography>
              <Typography variant="body2">{mobileApp.version}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Release date:
              </Typography>
              <Typography variant="body2">{mobileApp.releaseDate}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Digital Signature:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-all" // Rompe el texto en una nueva línea si es necesario
                }}
              >
                {mobileApp.digitalSignature}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Hash:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-all" // Rompe el texto en una nueva línea si es necesario
                }}
              >
                {mobileApp.apkHash}
              </Typography>
            </Box>

          </Box>
        </DashboardCard>

      </Grid>

      <Grid item xs={12} xl={12}>
      <DashboardCard title='Application Analysis Report'>
        <MobileAppAccordion data={mobileApp} />
      </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default MobileAppDetail;