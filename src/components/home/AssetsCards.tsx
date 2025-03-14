import { Box, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import iconOrange from '../../assets/images/svgs/icon-alert-orange.svg';
import iconYellow from '../../assets/images/svgs/icon-alert-yellow.svg';
import iconRed from '../../assets/images/svgs/icon-bars.svg';
import iconTan from '../../assets/images/svgs/icon-connect.svg';
import Loader from '../shared/Loader/Loader';

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
  const [loading, setLoading] = useState(true);
  const [connectedAssets, setConnectedAssets] = useState<{ amount: number }>({ amount: 0 });
  const [disconnectedAssets, setDisconnectedAssets] = useState<{ amount: number }>({ amount: 0 });
  const [unsecuredAssets, setUnsecuredAssets] = useState<{ amount: number }>({ amount: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular la carga de datos estáticos
    const fetchData = () => {
      setLoading(true);
      try {
        const exampleData = {
          connectedAssets: { amount: 356 },
          disconnectedAssets: { amount: 696 },
          unsecuredAssets: { amount: 3650 },
        };
        setConnectedAssets(exampleData.connectedAssets);
        setDisconnectedAssets(exampleData.disconnectedAssets);
        setUnsecuredAssets(exampleData.unsecuredAssets);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Typography color="error" variant="h6">
          {t('dashboard.errorMessage')}
        </Typography>
      </Box>
    );
  }

  const updatedAssetsCards = assetsCards.map((card, i) => {
    switch (card.title) {
      case 'total':
        return {
          ...card, digits: (
            (connectedAssets?.amount || 0) +
            (disconnectedAssets?.amount || 0) +
            (unsecuredAssets?.amount || 0)
          ).toString()
        };
      case 'unsecured':
        return { ...card, digits: unsecuredAssets?.amount.toString() };
      case 'connected':
        return { ...card, digits: connectedAssets?.amount.toString() };
      case 'disconnected':
        return { ...card, digits: disconnectedAssets?.amount.toString() };
      default:
        return card;
    }
  });

  return (
    <Grid container spacing={3} >
      {updatedAssetsCards.map((topcard, i) => (
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