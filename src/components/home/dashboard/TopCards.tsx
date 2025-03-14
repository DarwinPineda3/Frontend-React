import { Box, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../../shared/Loader/Loader';

import iconCritical from '../../../assets/images/svgs/icon-alert-critical.svg';
import iconHigh from '../../../assets/images/svgs/icon-alert-high.svg';
import iconLLow from '../../../assets/images/svgs/icon-alert-low.svg';
import iconMedium from '../../../assets/images/svgs/icon-alert-medium.svg';
import iconBlue from '../../../assets/images/svgs/icon-connect.svg';

const cardConfig: Record<string, {
  icon: string;
  title: string;
  bgcolor: string;
  txtcolor: string;
}> = {
  critical: {
    icon: iconCritical,
    title: 'critical',
    bgcolor: 'level.critical',
    txtcolor: 'background.default',
  },
  high: {
    icon: iconMedium,
    title: 'high',
    bgcolor: 'level.high',
    txtcolor: 'background.default',
  },
  medium: {
    icon: iconHigh,
    title: 'medium',
    bgcolor: 'level.medium',
    txtcolor: 'background.default',
  },
  low: {
    icon: iconLLow,
    title: 'low',
    bgcolor: 'level.low',
    txtcolor: 'background.default',
  },
  total: {
    icon: iconBlue,
    title: 'total_assets',
    bgcolor: 'level.none',
    txtcolor: 'background.default',
  },
};

const TopCards = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular la carga de datos estáticos
    const fetchData = () => {
      setLoading(true);
      try {
        const exampleData = [
          { severity: 'critical', value: 5 },
          { severity: 'high', value: 10 },
          { severity: 'medium', value: 15 },
          { severity: 'low', value: 20 },
          { severity: 'total', value: 50 },
        ];
        setData(exampleData);
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
    return <div>{t("dashboard.error", { error })}</div>;
  }

  return (
    <Grid container spacing={3} mt={0}>
      {data?.map((card, i) => {
        const config = cardConfig[card.severity];
        return (
          <Grid item xs={6} sm={4} lg={2.4} key={i}>
            <Box bgcolor={config.bgcolor} textAlign="center">
              <CardContent>
                <img src={config.icon} width="50" />
                <Typography color={config.txtcolor} mt={1} variant="subtitle1" fontWeight={600}>
                  {t(`dashboard.${config.title}`)}
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