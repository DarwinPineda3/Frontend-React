import { Box, CardContent, Grid, Typography } from '@mui/material';
import iconYellow from '../../../assets/images/svgs/icon-alert-yellow.svg';
import iconRed from '../../../assets/images/svgs/icon-alert-red.svg';
import iconOrange from '../../../assets/images/svgs/icon-alert-orange.svg';
import { Computer, ComputerTwoTone, Person } from '@mui/icons-material';

const cardConfig: Record<Severity, {
  icon: any;
  title: string;
  bgcolor: string;
  txtcolor: string;
}> = {
  critical: {
    icon: ComputerTwoTone,
    title: 'Hosts Activos',
    bgcolor: '#ebf3fe', 
    txtcolor: '#60a2ff', // Red text color
  },
  high: {
    icon: Computer,
    title: 'Hosts Caidos',
    bgcolor: '#FFF4E6', // Light orange background color
    txtcolor: '#FFA500', // Orange text color
  },
  medium: {
    icon: Person,
    title: 'Hosts Total',
    bgcolor: '#E6FFE6', // Light green background color
    txtcolor: '#008000', // Green text color
  },
  low: {
    icon: iconYellow,
    title: 'HALLAZGOS INTERESANTES',
    bgcolor: '#E6E6FF', // Light blue background color
    txtcolor: '#0000FF', // Blue text color
  },
};

// Burnt data for the first four severity levels (excluding total)
const burntTopCardsData = [
  { severity: 'critical', value: '96' },
  { severity: 'high', value: '350' },
  { severity: 'medium', value: '356' }
] as const;

const NetworkScanCards = () => {
    return (
      <Grid container spacing={3} >
        {burntTopCardsData.map((card, i) => {
          const config = cardConfig[card.severity];
          return (
            <Grid item xs={6} sm={6} lg={4} key={i}>
              <Box
                bgcolor={config.bgcolor }
                display="flex"
                justifyContent="space-between"
                px={2}
                py={2} 
                textAlign="center"
              >
                {/* Icon */}
                
                {typeof config.icon === 'string' ? (
                  <Box component="img" src={config.icon} alt={config.title} width="30" />
                ) : (
                  <config.icon style={{ color: config.txtcolor, fontSize: 50 }} />
                )}
                {/* Title and Value in a row */}
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                  <Typography color={config.txtcolor} variant="subtitle2" fontWeight={600}>
                    {config.title}
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
