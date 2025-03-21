import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import iconYellow from '../../../../assets/images/svgs/icon-alert-yellow.svg';
import iconRed from '../../../../assets/images/svgs/icon-alert-red.svg';
import iconOrange from '../../../../assets/images/svgs/icon-alert-orange.svg';
import iconTan from '../../../../assets/images/svgs/icon-alert-tan.svg';

type Severity = 'critical' | 'high' | 'medium' | 'low';

const cardConfig: Record<Severity, {
  icon: string;
  titleKey: string;  // Use keys for translation
  bgcolor: string;
  txtcolor: string;
}> = {
  critical: {
    icon: iconRed,
    titleKey: 'vulnerabilities.critical',
    bgcolor: 'primary',
    txtcolor: 'background.default',
  },
  high: {
    icon: iconOrange,
    titleKey: 'vulnerabilities.high',
    bgcolor: 'secondary',
    txtcolor: 'background.default',
  },
  medium: {
    icon: iconTan,
    titleKey: 'vulnerabilities.medium',
    bgcolor: 'error',
    txtcolor: 'error.main',
  },
  low: {
    icon: iconYellow,
    titleKey: 'vulnerabilities.low',
    bgcolor: 'warning',
    txtcolor: 'warning.main',
  },
};

// Burnt data for the first four severity levels (excluding total)
const burntTopCardsData = [
  { severity: 'critical', value: '96' },
  { severity: 'high', value: '350' },
  { severity: 'medium', value: '356' },
  { severity: 'low', value: '696' },
] as const;

const ScanTopCards = () => {
  const { t } = useTranslation();
  
  return (
    <Grid container spacing={3} mt={4}>
      {burntTopCardsData.map((card, i) => {
        const config = cardConfig[card.severity];
        return (
          <Grid item xs={6} sm={6} lg={3} key={i}>
            <Box
              bgcolor={config.bgcolor + '.light'}
              display="flex"
              justifyContent="space-between"
              px={2}
              py={2} 
              textAlign="center"
            >
              {/* Icon */}
              <Box component="img" src={config.icon} alt={t(config.titleKey)} width="30" />

              {/* Title and Value in a row */}
              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography color={config.txtcolor} variant="subtitle2" fontWeight={600}>
                  {t(config.titleKey)}
                </Typography>
                <Typography color={config.txtcolor} variant="h5" fontWeight={600}>
                  {card.value}
                </Typography>
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ScanTopCards;
