import { Computer, ComputerTwoTone, Person } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const cardConfig: Record<Severity, {
  icon: any;
  title: string;
  bgcolor: string;
  txtcolor: string;
}> = {
  up: {
    icon: ComputerTwoTone,
    title: 'observability.hosts_activos',
    bgcolor: '#ebf3fe',
    txtcolor: '#60a2ff',
  },
  down: {
    icon: Computer,
    title: 'observability.hosts_caidos',
    bgcolor: '#FFF4E6',
    txtcolor: '#FFA500',
  },
  total: {
    icon: Person,
    title: 'observability.hosts_total',
    bgcolor: '#E6FFE6',
    txtcolor: '#008000',
  }
};
const NetworkScanCards = ({ cardData }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3}>
      {Object.entries(cardData).map((card) => {
        const config = cardConfig[card[0]];
        return (
          <Grid item xs={6} sm={6} lg={4} key={card[0]}>
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
                  {card[1]}
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

type Severity = 'up' | 'down' | 'total';
