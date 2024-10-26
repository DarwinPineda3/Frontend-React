import { Box, CardContent, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import iconYellow from '../../assets/images/svgs/icon-alert-yellow.svg';
import iconRed from '../../assets/images/svgs/icon-bars.svg';
import iconOrange from '../../assets/images/svgs/icon-alert-orange.svg';
import iconTan from '../../assets/images/svgs/icon-connect.svg';

interface cardType {
  icon: string;
  title: string;
  digits: string;
  bgcolor: string;
  txtcolor: string;
}

const assetsCards: cardType[] = [
  {
    icon: iconRed,
    title: 'total',
    digits: '96',
    bgcolor: 'info',
    txtcolor: 'info.main',
  },
  {
    icon: iconOrange,
    title: 'unsecured',
    digits: '3,650',
    bgcolor: 'error',
    txtcolor: 'error.main',
  },
  {
    icon: iconTan,
    title: 'connected',
    digits: '356',
    bgcolor: 'success',
    txtcolor: 'success.main',
  },
  {
    icon: iconYellow,
    title: 'disconnected',
    digits: '696',
    bgcolor: 'warning',
    txtcolor: 'warning.main',
  },
];

const AssetsCards = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3} mt={4}>
      {assetsCards.map((topcard, i) => (
        <Grid item xs={6} sm={4} lg={3} key={i}>
          <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
            <CardContent>
              <img src={topcard.icon} alt={topcard.icon} width="50" />
              <Typography
                color={topcard.txtcolor}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {t(`dashboard.${topcard.title}`)}
              </Typography>
              <Typography color={topcard.txtcolor} variant="h4" fontWeight={600}>
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default AssetsCards;
