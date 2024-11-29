import { Person } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import iconOrange from '../../../../assets/images/svgs/icon-alert-orange.svg';
import iconRed from '../../../../assets/images/svgs/icon-alert-red.svg';
import iconYellow from '../../../../assets/images/svgs/icon-alert-yellow.svg';

const cardConfig: Record<Severity, {
  icon: any;
  title: string;
  bgcolor: string;
  txtcolor: string;
}> = {
  critical: {
    icon: iconRed,
    title: 'vulnerabilities.vulnerabilities',
    bgcolor: '#FFE6E6',
    txtcolor: '#FF0000',
  },
  high: {
    icon: iconOrange,
    title: 'vulnerabilities.outdated_plugins',
    bgcolor: '#FFF4E6',
    txtcolor: '#FFA500',
  },
  medium: {
    icon: Person,
    title: 'vulnerabilities.users',
    bgcolor: '#E6FFE6',
    txtcolor: '#008000',
  },
  low: {
    icon: iconYellow,
    title: 'vulnerabilities.interesting_findings',
    bgcolor: '#E6E6FF',
    txtcolor: '#0000FF',
  },
};

const burntTopCardsData = [
  { severity: 'critical', value: '96' },
  { severity: 'high', value: '350' },
  { severity: 'medium', value: '356' },
  { severity: 'low', value: '696' },
] as const;

const WpScanTopCards = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3}>
      {burntTopCardsData.map((card, i) => {
        const config = cardConfig[card.severity];
        return (
          <Grid item xs={6} sm={6} lg={3} key={i}>
            <Box
              bgcolor={config.bgcolor}
              display="flex"
              justifyContent="space-between"
              px={2}
              py={2}
              textAlign="center"
            >
              {typeof config.icon === 'string' ? (
                <Box component="img" src={config.icon} alt={t(config.title)} width="30" />
              ) : (
                <config.icon style={{ color: config.txtcolor, fontSize: 50 }} />
              )}
              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography color={config.txtcolor} variant="subtitle2" fontWeight={600}>
                  {t(config.title).toUpperCase()}
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

export default WpScanTopCards;

type Severity = 'critical' | 'high' | 'medium' | 'low';
