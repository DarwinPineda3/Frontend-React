import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import { IconNetwork, IconNetworkOff } from '@tabler/icons-react';
import Loader from '../../shared/Loader/Loader'; // Loader component

import { useDispatch, useSelector } from 'src/store/Store'; // Correct imports
import { fetchAssetStatusData } from 'src/store/sections/dashboard/AssetStatusSlice';
import { AppState } from 'src/store/Store';

const AssetStatus = () => {
  const dispatch = useDispatch();
  const { loading, connectedAssets, disconnectedAssets, error } = useSelector(
    (state: AppState) => state.dashboard.assetStatus
  );

  useEffect(() => {
    dispatch(fetchAssetStatusData());
  }, [dispatch]);

  const theme = useTheme();
  const primary = theme.palette.background.default;
  const primarylight = theme.palette.primary.light;
  const secondary = theme.palette.success.main;
  const secondarylight = theme.palette.success.light;

  const stats = [
    {
      title: 'Connected Assets',
      subtitle: '',
      amount: connectedAssets?.amount || 0,
      color: secondary,
      lightcolor: secondarylight,
      icon: IconNetwork,
    },
    {
      title: 'Disconnected Assets',
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
    <DashboardCard title="Asset Status">
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
