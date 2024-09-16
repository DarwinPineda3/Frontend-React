// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box, Grid } from '@mui/material';

import DashboardCard from '../shared/DashboardCard';
import { IconDeviceAnalytics, IconDeviceDesktop, IconNetwork } from '@tabler/icons-react'; // Import the icon component directly
import { IconNetworkOff } from '@tabler/icons-react';

interface statType {
  title: string;
  subtitle: string;
  ammount: number;
  color: string;
  lightcolor: string;
  icon: any;
}

const AssetStatus: React.FC = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.background.default;
  const primarylight = theme.palette.primary.light;
  const secondary = theme.palette.success.main;
  const secondarylight = theme.palette.success.light;

  const info = theme.palette.info.main;
  const infoLigth = theme.palette.info.light;

  const warning = theme.palette.warning.main;
  const warningLigth = theme.palette.warning.light;
  

  const stats: statType[] = [

    {
      title: 'Connected Assets',
      subtitle: '',
      ammount: 6235,
      color: secondary,
      lightcolor: secondarylight,
      icon: IconNetwork, // Icon component
    },
    {
      title: 'Disconnected Assets',
      subtitle: '',
      ammount: 345,
      color: primary,
      lightcolor: primarylight,
      icon: IconNetworkOff, // Icon component
    },
  ];

  return (
    <DashboardCard title="Asset Status">
      <>
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

                  
                  {/* Use the icon component directly here */}
                  <stat.icon size={24} />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb="4px">
                    {stat.title}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {stat.subtitle}
                  </Typography>
                </Box>
              </Stack>
              {stat.ammount < 400 ? (
                <Typography variant="subtitle2" color="textSecondary" fontWeight="600">
                  {stat.ammount}
                </Typography>
              ) : (
                <Typography variant="subtitle2" fontWeight="600">
                  {stat.ammount}
                </Typography>
              )}
            </Stack>
          ))}
        </Stack>
      </>
    </DashboardCard>
  );
};

export default AssetStatus;
