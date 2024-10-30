import React from 'react';
import { Grid, Box, Chip, Typography, Stack } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
// import AlphaSuspicionLevel from './MalwareAnalysisAlphaSuspicionLevel';
import MalwareAnalysisAccordion from './MalwareAnalysisAccordion';




const MobileAppDetail: React.FC<{ mobileAppId: string }> = ({ mobileAppId }) => {

  const analysisReport = {
    id: 1,
    summary: {
      file: "f2e7fcb20146.exe",
      size: 275.0,
      type: "PE32 executable (GUI) Intel 80386, for MS Windows",
      md5: "9f5aaba5a45e58b62cf44460a6e8e7e3",
      sha1: "03532bab162af0e7bb0953f29730a439c0b803fd",
      sha256: "2468722fef139e68cbf0cb1f8f531b9e61abd9cfacd450868015052d5a00fb5d",
      sha512: "17cd4b8d7972f189150f4c4d85d2ff469d02cd51d8f92bbc4c5184917e6f59c5de3fdb709897a665d4a32331bcccbeea0fba8db9faffb020918aae64257c8b9d",
      crc32: "00F3327E",
      ssdeep: "None",
      score: 10
    },
    informationExecution: {
      category: "FILE",
      started: "Oct. 22, 2024, 11:10 p.m.",
      completed: "Oct. 22, 2024, 11:11 p.m.",
      duration: "45 seconds",
      routing: "internet",
      state: "Finished",
      yara: [
        "anti_dbg - Checks if being debugged",
        "win_files_operation - Affect private profile"
      ],
      logs: [
        {
          type: "Analyzer Log",
          log: [
            "2024-10-22 23:10:34,015 [analyzer] DEBUG: Starting analyzer from: C:\\tmpd0os1j",
            "2024-10-22 23:10:34,015 [analyzer] DEBUG: Pipe server name: \\PIPE\\JUqBuioggeRAOFXNMUaQHUpyvux",
            "2024-10-22 23:10:34,015 [analyzer] DEBUG: Log pipe server name: ?\\PIPE\\kIhdBbrUWRTiNjccCXkMychtrJvuIlIu",
            "2024-10-22 23:10:34,328 [analyzer] DEBUG: Started auxiliary module Curtain",
            "2024-10-22 23:10:34,328 [analyzer] DEBUG: Started auxiliary module DbgView",
            "2024-10-22 23:10:34,765 [analyzer] DEBUG: Started auxiliary module Disguise",
            "2024-10-22 23:10:34,983 [analyzer] DEBUG: Loaded monitor into process with pid 512",
            "2024-10-22 23:10:34,983 [analyzer] DEBUG: Started auxiliary module DumpTLSMasterSecrets",
            "2024-10-22 23:10:34,983 [analyzer] DEBUG: Started auxiliary module Human",
            "2024-10-22 23:10:34,983 [analyzer] DEBUG: Started auxiliary module InstallCertificate",
            "2024-10-22 23:10:34,983 [analyzer] DEBUG: Started auxiliary module Reboot",
            "2024-10-22 23:10:35,078 [analyzer] DEBUG: Started auxiliary module RecentFiles",
            "2024-10-22 23:10:35,078 [analyzer] DEBUG: Started auxiliary module Screenshots",
            "2024-10-22 23:10:35,078 [analyzer] DEBUG: Started auxiliary module Sysmon",
            "2024-10-22 23:10:35,078 [analyzer] DEBUG: Started auxiliary module LoadZer0m0n",
            "2024-10-22 23:10:35,203 [lib.api.process] INFO: Successfully executed process from path u'C:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\f2e7fcb20146.exe' with arguments '' and pid 2164",
            "2024-10-22 23:10:35,358 [analyzer] DEBUG: Loaded monitor into process with pid 2164",
            "2024-10-22 23:10:35,905 [analyzer] INFO: Injected into process with pid 820 and name u'MSBuild.exe'",
            "2024-10-22 23:10:36,015 [lib.api.process] ERROR: Failed to dump memory of 32-bit process with pid 820.",
            "2024-10-22 23:10:36,217 [analyzer] DEBUG: Loaded monitor into process with pid 820",
            "2024-10-22 23:10:36,217 [analyzer] INFO: Process with pid 2164 has terminated",
            "2024-10-22 23:10:37,233 [analyzer] INFO: Process with pid 820 has terminated",
            "2024-10-22 23:10:37,233 [analyzer] INFO: Process list is empty, terminating analysis.",
            "2024-10-22 23:10:38,467 [analyzer] INFO: Terminating remaining processes before shutdown.",
            "2024-10-22 23:10:38,467 [analyzer] INFO: Analysis completed."
          ]
        },
        {
          type: "Cuckoo Log",
          log: [
            "2024-10-22 23:10:45,528 [cuckoo.core.scheduler] INFO: Task #5335245: acquired machine win7x6429 (label=win7x6429)",
            "2024-10-22 23:10:45,528 [cuckoo.core.resultserver] DEBUG: Now tracking machine 192.168.168.229 for task #5335245",
            "2024-10-22 23:10:45,899 [cuckoo.auxiliary.sniffer] INFO: Started sniffer with PID 3190566 (interface=vboxnet0, host=192.168.168.229)",
            "2024-10-22 23:10:46,378 [cuckoo.machinery.virtualbox] DEBUG: Starting vm win7x6429",
            "2024-10-22 23:10:47,094 [cuckoo.machinery.virtualbox] DEBUG: Restoring virtual machine win7x6429 to vmcloak",
            "2024-10-22 23:11:08,838 [cuckoo.core.guest] INFO: Starting analysis #5335245 on guest (id=win7x6429, ip=192.168.168.229)",
            "2024-10-22 23:11:09,845 [cuckoo.core.guest] DEBUG: win7x6429: not ready yet",
            "2024-10-22 23:11:14,879 [cuckoo.core.guest] INFO: Guest is running Cuckoo Agent 0.10 (id=win7x6429, ip=192.168.168.229)",
            "2024-10-22 23:11:14,957 [cuckoo.core.guest] DEBUG: Uploading analyzer to guest (id=win7x6429, ip=192.168.168.229, monitor=latest, size=6660546)",
            "2024-10-22 23:11:16,181 [cuckoo.core.resultserver] DEBUG: Task #5335245: live log analysis.log initialized.",
            "2024-10-22 23:11:17,116 [cuckoo.core.resultserver] DEBUG: Task #5335245 is sending a BSON stream",
            "2024-10-22 23:11:17,490 [cuckoo.core.resultserver] DEBUG: Task #5335245 is sending a BSON stream",
            "2024-10-22 23:11:18,288 [cuckoo.core.resultserver] DEBUG: Task #5335245 is sending a BSON stream",
            "2024-10-22 23:11:18,431 [cuckoo.core.resultserver] DEBUG: Task #5335245: File upload for 'shots/0001.jpg'",
            "2024-10-22 23:11:18,452 [cuckoo.core.resultserver] DEBUG: Task #5335245 uploaded file length: 133438",
            "2024-10-22 23:11:20,547 [cuckoo.core.resultserver] DEBUG: Task #5335245: File upload for 'curtain/1729631438.34.curtain.log'",
            "2024-10-22 23:11:20,553 [cuckoo.core.resultserver] DEBUG: Task #5335245 uploaded file length: 36",
            "2024-10-22 23:11:20,661 [cuckoo.core.resultserver] DEBUG: Task #5335245: File upload for 'procdump/1729631438.34/procdump.log'",
            "2024-10-22 23:11:20,667 [cuckoo.core.resultserver] DEBUG: Task #5335245 uploaded file length: 198",
            "2024-10-22 23:11:20,789 [cuckoo.core.resultserver] DEBUG: Task #5335245: File upload for 'shots/0002.jpg'",
            "2024-10-22 23:11:20,791 [cuckoo.core.resultserver] DEBUG: Task #5335245 uploaded file length: 136065",
            "2024-10-22 23:11:21,208 [cuckoo.core.resultserver] DEBUG: Task #5335245: File upload for 'shots/0003.jpg'",
            "2024-10-22 23:11:21,210 [cuckoo.core.resultserver] DEBUG: Task #5335245 uploaded file length: 145042",
            "2024-10-22 23:11:23,453 [cuckoo.core.resultserver] DEBUG: Task #5335245: File upload for 'shots/0004.jpg'",
            "2024-10-22 23:11:23,455 [cuckoo.core.resultserver] DEBUG: Task #5335245 uploaded file length: 142968"
          ]
        }
      ]
    },

  };

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
    score: 5,
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
        <DashboardCard title="Summary" subtitle="Detail mobile app">
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
                App name:
              </Typography>
              <Typography variant="body2">{mobileApp.appName}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Id:
              </Typography>
              <Typography variant="body2">{mobileApp.idApp}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Version:
              </Typography>
              <Typography variant="body2">{mobileApp.version}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Download link:
              </Typography>
              <Typography variant="body2">{mobileApp.downloadLink}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Release date:
              </Typography>
              <Typography variant="body2">{mobileApp.releaseDate}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Source:
              </Typography>
              <Typography variant="body2">{mobileApp.source}</Typography>
            </Box>
            

            {/* <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Rules (Yara):
              </Typography>
              {mobileApp.id((rule, index) => (
                <Typography key={index} variant="body2">
                  {rule}
                </Typography>
              ))}
            </Box> */}
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
                Score:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-all" // Rompe el texto en una nueva línea si es necesario
                }}
              >
                {analysisReport.summary.sha1}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                SHA256:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-all" // Rompe el texto en una nueva línea si es necesario
                }}
              >
                {analysisReport.summary.sha256}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                SHA512:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-all" // Rompe el texto en una nueva línea si es necesario
                }}
              >
                {analysisReport.summary.sha512}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                CRC32:
              </Typography>
              <Typography variant="body2">{analysisReport.summary.crc32}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                SSDEEP:
              </Typography>
              <Typography variant="body2">
                {analysisReport.summary.ssdeep}
              </Typography>
            </Box>
          </Box>
        </DashboardCard>

      </Grid>

      <Grid item xs={12} xl={12}>
        tabla
      </Grid>
    </Grid>
  );
};

export default MobileAppDetail;