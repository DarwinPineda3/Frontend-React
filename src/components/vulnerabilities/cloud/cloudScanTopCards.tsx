import { Box, Grid, Stack, Typography } from "@mui/material";
import { IconAlertCircle, IconAlertOctagon, IconAlertTriangle, IconCheck } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const CloudScanTopCards = () => {
  const { t } = useTranslation();

  const statistics = {
    critical: 1,
    high: 2,
    medium: 3,
    low: 4,
  };



  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={3}>
        <Box bgcolor="primary.light" p={3} sx={{ cursor: 'pointer' }}>
          <Stack direction="row" gap={2} alignItems="center">
            <Box width={38} height={38} bgcolor="primary.main" display="flex" alignItems="center" justifyContent="center">
              <Typography color="primary.contrastText">
                <IconAlertCircle width={22} />
              </Typography>
            </Box>
            <Box>
              <Typography color="background.default">{t("vulnerabilities.critical")}</Typography>
              <Typography fontWeight={500} color="background.default">
                {statistics.critical} {t("vulnerabilities.alerts")}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Box bgcolor="secondary.light" p={3} sx={{ cursor: 'pointer' }}>
          <Stack direction="row" gap={2} alignItems="center">
            <Box width={38} height={38} bgcolor="secondary.main" display="flex" alignItems="center" justifyContent="center">
              <Typography color="background.default">
                <IconAlertTriangle width={22} />
              </Typography>
            </Box>
            <Box>
              <Typography color="background.default">{t("vulnerabilities.high")}</Typography>
              <Typography fontWeight={500} color="background.default">
                {statistics.high} {t("vulnerabilities.alerts")}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Box bgcolor="error.light" p={3} sx={{ cursor: 'pointer' }}>
          <Stack direction="row" gap={2} alignItems="center">
            <Box width={38} height={38} bgcolor="error.main" display="flex" alignItems="center" justifyContent="center">
              <Typography color="primary.contrastText">
                <IconAlertOctagon width={22} />
              </Typography>
            </Box>
            <Box>
              <Typography color="error.main">{t("vulnerabilities.medium")}</Typography>
              <Typography fontWeight={500} color="error.main">
                {statistics.medium} {t("vulnerabilities.alerts")}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Box bgcolor="warning.light" p={3} sx={{ cursor: 'pointer' }}>
          <Stack direction="row" gap={2} alignItems="center">
            <Box width={38} height={38} bgcolor="warning.main" display="flex" alignItems="center" justifyContent="center">
              <Typography color="primary.contrastText">
                <IconCheck width={22} />
              </Typography>
            </Box>
            <Box>
              <Typography color="warning.main">{t("vulnerabilities.low")}</Typography>
              <Typography fontWeight={500} color="warning.main">
                {statistics.low} {t("vulnerabilities.alerts")}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );

};

export default CloudScanTopCards;
