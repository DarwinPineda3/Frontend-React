import { useEffect } from 'react';
import { Box, CardContent, Grid, Typography } from '@mui/material';
import { AppState, useDispatch, useSelector } from 'src/store/Store';
import Loader from '../../shared/Loader/Loader';
import { fetchTopCardsData } from 'src/store/sections/dashboard/TopCardsSlice';

import iconBlue from '../../../assets/images/svgs/icon-connect.svg';
import iconYellow from '../../../assets/images/svgs/icon-alert-yellow.svg';
import iconRed from '../../../assets/images/svgs/icon-alert-red.svg';
import iconOrange from '../../../assets/images/svgs/icon-alert-orange.svg';
import iconTan from '../../../assets/images/svgs/icon-alert-tan.svg';




const cardConfig: Record<Severity, {
  icon: string;
  title: string;
  bgcolor: string;
  txtcolor: string;
}> = {
  critical: {
    icon: iconRed,
    title: 'Critical',
    bgcolor: 'primary',
    txtcolor: 'background.default',
  },
  high: {
    icon: iconOrange,
    title: 'High',
    bgcolor: 'secondary',
    txtcolor: 'background.default',
  },
  medium: {
    icon: iconTan,
    title: 'Medium',
    bgcolor: 'error',
    txtcolor: 'error.main',
  },
  low: {
    icon: iconYellow,
    title: 'Low',
    bgcolor: 'warning',
    txtcolor: 'warning.main',
  },
  total: {
    icon: iconBlue,
    title: 'Total Assets',
    bgcolor: 'info',
    txtcolor: 'info.main',
  },
};


const TopCards = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state: AppState) => state.dashboard.topCards);

  useEffect(() => {
    dispatch(fetchTopCardsData());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Grid container spacing={3} mt={4}>
      {data?.map((card, i) => {
        const config = cardConfig[card.severity];
        return (
          <Grid item xs={6} sm={4} lg={2.4} key={i}>
            <Box bgcolor={config.bgcolor + '.light'} textAlign="center">
              <CardContent>
                <img src={config.icon} alt={config.title} width="50" />
                <Typography color={config.txtcolor} mt={1} variant="subtitle1" fontWeight={600}>
                  {config.title}
                </Typography>
                <Typography color={config.txtcolor} variant="h4" fontWeight={600}>
                  {card.value}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TopCards;
