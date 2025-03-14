import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import { IconNetwork, IconNetworkOff } from '@tabler/icons-react';
import Loader from '../../shared/Loader/Loader'; // Loader component
import { useTranslation } from 'react-i18next';

const AssetStatus = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const primary = theme.palette.background.default;
  const primarylight = theme.palette.primary.light;
  const secondary = theme.palette.success.main;
  const secondarylight = theme.palette.success.light;

  const [loading, setLoading] = useState(true);
  const [connectedAssets, setConnectedAssets] = useState<{ amount: number }>({ amount: 0 });
  const [disconnectedAssets, setDisconnectedAssets] = useState<{ amount: number }>({ amount: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular la carga de datos estáticos
    const fetchData = () => {
      setLoading(true);
      try {
        const exampleData = {
          connectedAssets: { amount: 120 },
          disconnectedAssets: { amount: 30 },
        };
        setConnectedAssets(exampleData.connectedAssets);
        setDisconnectedAssets(exampleData.disconnectedAssets);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: t('dashboard.connected_assets'),
      subtitle: '',
      amount: connectedAssets?.amount || 0,
      color: secondary,
      lightcolor: secondarylight,
      icon: IconNetwork,
    },
    {
      title: t('dashboard.disconnected_assets'),
      subtitle: '',
      amount: disconnectedAssets?.amount || 0,
      color: primary,
      lightcolor: primarylight,
      icon: IconNetworkOff,
    },
  ];

  if (loading) {
    return (
      <DashboardCard title="Asset Status">
        <Box display="flex" justifyContent="center" mt={4} mb={4}>
          <Loader />
        </Box>
      </DashboardCard>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <DashboardCard title={t("dashboard.asset_status") ?? "asset_status"}>
      <Stack spacing={3} mt={5}>
        {stats.map((stat, i) => (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            key={i}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                variant="rounded"
                sx={{ bgcolor: stat.lightcolor, color: stat.color, width: 40, height: 40 }}
              >
                <stat.icon size={24} />
              </Avatar>
              <Box>
                <Typography variant="h6" mb="4px">
                  {stat.title}
                </Typography>
              </Box>
            </Stack>
            <Typography variant="subtitle2" fontWeight="600">
              {stat.amount}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </DashboardCard>
  );
};

export default AssetStatus;