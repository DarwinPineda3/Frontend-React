import { Box, Grid, Stack, Typography } from "@mui/material";
import { IconAlertCircle, IconAlertOctagon, IconAlertTriangle, IconCheck } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const cardConfig: Record<string, {
  bgcolor: string;
  txtcolor: string;
}> = {
  critical: {
    bgcolor: 'level.critical', 
    txtcolor: 'background.default', 
  },
  high: {
    bgcolor: 'level.high', 
    txtcolor: 'background.default', 
  },
  medium: {
    bgcolor: 'level.medium', 
    txtcolor: 'background.default', 
  },
  low: {
    bgcolor: 'level.low', 
    txtcolor: 'background.default', 
  },
};

const CloudScanTopCards: React.FC<{ statistics: any }> = ({ statistics }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={3}>
        <Box bgcolor={cardConfig.critical.bgcolor} p={3} sx={{ cursor: 'pointer' }}>
          <Stack direction="row" gap={2} alignItems="center">
            <Box
              width={38}
              height={38}
              bgcolor={cardConfig.critical.bgcolor} 
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography color={cardConfig.critical.txtcolor} display="flex" alignItems="center" justifyContent="center">
                <IconAlertCircle width={22} />
              </Typography>
            </Box>
            <Box>
              <Typography color="background.default">{t('vulnerabilities.critical')}</Typography>
              <Typography fontWeight={500} color="background.default">
                {statistics?.critical} {t('vulnerabilities.alerts')}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <Box bgcolor={cardConfig.high.bgcolor} p={3} sx={{ cursor: 'pointer' }}>
          <Stack direction="row" gap={2} alignItems="center">
            <Box
              width={38}
              height={38}
              bgcolor={cardConfig.high.bgcolor} 
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography color={cardConfig.high.txtcolor} display="flex" alignItems="center" justifyContent="center">
                <IconAlertTriangle width={22} />
              </Typography>
            </Box>
            <Box>
              <Typography color="background.default">{t('vulnerabilities.high')}</Typography>
              <Typography fontWeight={500} color="background.default">
                {statistics?.high} {t('vulnerabilities.alerts')}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <Box bgcolor={cardConfig.medium.bgcolor} p={3} sx={{ cursor: 'pointer' }}>
          <Stack direction="row" gap={2} alignItems="center">
            <Box
              width={38}
              height={38}
              bgcolor={cardConfig.medium.bgcolor} 
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography color={cardConfig.medium.txtcolor} display="flex" alignItems="center" justifyContent="center">
                <IconAlertOctagon width={22} />
              </Typography>
            </Box>
            <Box>
              <Typography color={cardConfig.medium.txtcolor}>{t('vulnerabilities.medium')}</Typography>
              <Typography fontWeight={500} color={cardConfig.medium.txtcolor}>
                {statistics?.medium} {t('vulnerabilities.alerts')}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <Box bgcolor={cardConfig.low.bgcolor} p={3} sx={{ cursor: 'pointer' }}>
          <Stack direction="row" gap={2} alignItems="center">
            <Box
              width={38}
              height={38}
              bgcolor={cardConfig.low.bgcolor}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography color={cardConfig.low.txtcolor} display="flex" alignItems="center" justifyContent="center">
                <IconCheck width={22} />
              </Typography>
            </Box>
            <Box>
              <Typography color={cardConfig.low.txtcolor}>{t('vulnerabilities.low')}</Typography>
              <Typography fontWeight={500} color={cardConfig.low.txtcolor}>
                {statistics?.low} {t('vulnerabilities.alerts')}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CloudScanTopCards;
