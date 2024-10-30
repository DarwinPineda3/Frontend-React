import { Box, CardContent, Grid, Typography } from '@mui/material';
import iconYellow from '../../../assets/images/svgs/icon-alert-yellow.svg';
import iconRed from '../../../assets/images/svgs/icon-alert-red.svg';
import iconOrange from '../../../assets/images/svgs/icon-alert-orange.svg';
import { Computer, ComputerTwoTone, Person } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const cardConfig: Record<Severity, {
  icon: any;
  title: string;
  bgcolor: string;
  txtcolor: string;
}> = {
  critical: {
    icon: ComputerTwoTone,
    title: 'observability.hosts_activos',
    bgcolor: '#ebf3fe', 
    txtcolor: '#60a2ff',
  },
  high: {
    icon: Computer,
    title: 'observability.hosts_caidos',
    bgcolor: '#FFF4E6',
    txtcolor: '#FFA500',
  },
  medium: {
    icon: Person,
    title: 'observability.hosts_total',
    bgcolor: '#E6FFE6',
    txtcolor: '#008000',
  },
  low: {
    icon: iconYellow,
    title: 'observability.hallazgos_interesantes',
    bgcolor: '#E6E6FF',
    txtcolor: '#0000FF',
  },
};

const burntTopCardsData = [
  { severity: 'critical', value: '96' },
  { severity: 'high', value: '350' },
  { severity: 'medium', value: '356' }
] as const;

const NetworkScanCards = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3}>
      {burntTopCardsData.map((card, i) => {
        const config = cardConfig[card.severity];
        return (
          <Grid item xs={6} sm={6} lg={4} key={i}>
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
                  {t(config.title)}
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

export default NetworkScanCards;

type Severity = 'critical' | 'high' | 'medium' | 'low';
