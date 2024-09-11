import { Box, CardContent, Grid, Typography } from '@mui/material';

import iconBlue from '../../../assets/images/svgs/icon-connect.svg';
import iconYellow from '../../../assets/images/svgs/icon-alert-yellow.svg';
import iconRed from '../../../assets/images/svgs/icon-alert-red.svg';
import iconOrange from '../../../assets/images/svgs/icon-alert-orange.svg';
import iconTan from '../../../assets/images/svgs/icon-alert-tan.svg';
import iconGreen from '../../../assets/images/svgs/icon-alert-green.svg';
interface cardType {
  icon: string;
  title: string;
  digits: string;
  bgcolor: string;
  txtcolor: string;
}

const topcards: cardType[] = [
  {
    icon: iconRed,
    title: 'Critical',
    digits: '96',
    bgcolor: 'primary',
    txtcolor: 'background.default',
  },
  {
    icon: iconOrange,
    title: 'Severe',
    digits: '3,650',
    bgcolor: 'secondary',
    txtcolor: 'background.default',
  },
  {
    icon: iconTan,
    title: 'High',
    digits: '356',
    bgcolor: 'error',
    txtcolor: 'error.main',
  },
  {
    icon: iconYellow,
    title: 'Moderate',
    digits: '696',
    bgcolor: 'warning',
    txtcolor: 'warning.main',
  },
  {
    icon: iconGreen,
    title: 'Low',
    digits: '96',
    bgcolor: 'success',
    txtcolor: 'success.main',
  },

  {
    icon: iconBlue,
    title: 'Minimal',
    digits: '59',
    bgcolor: 'info',
    txtcolor: 'info.main',
  },
];

const TopCards = () => {
  return (
    <Grid container spacing={3} mt={3}>
      
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={2} key={i}>
          <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
            <CardContent>
              <img src={topcard.icon} alt={topcard.icon} width="50" />
              <Typography
                color={topcard.txtcolor}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography color={topcard.txtcolor } variant="h4" fontWeight={600}>
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
