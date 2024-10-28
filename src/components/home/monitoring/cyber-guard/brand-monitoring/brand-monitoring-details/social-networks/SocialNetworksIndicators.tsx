import { Box, Grid, Typography } from '@mui/material';
import { Security, Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import React from 'react';

interface SocialNetworksIndicatorsProps {
  socialNetworkCounters: {
    twitter: number;
    instagram: number;
    linkedin: number;
    facebook: number;
    social_network_total: number;
  };
}

// Function to return color based on value
const getColorByValue = (value: number) => {
  if (value <= 0) return 'success';
  return 'error';
};

const SocialNetworksIndicators: React.FC<SocialNetworksIndicatorsProps> = ({
  socialNetworkCounters,
}) => {
  const topCardsData = [
    {
      title: 'Total Compromises',
      value: socialNetworkCounters.social_network_total,
      icon: <Security fontSize="large" />,
    },
    {
      title: 'FACEBOOK',
      value: socialNetworkCounters.facebook,
      icon: <Facebook fontSize="large" />,
    },
    {
      title: 'TWITTER',
      value: socialNetworkCounters.twitter,
      icon: <Twitter fontSize="large" />,
    },
    {
      title: 'INSTAGRAM',
      value: socialNetworkCounters.instagram,
      icon: <Instagram fontSize="large" />,
    },
    {
      title: 'LINKEDIN',
      value: socialNetworkCounters.linkedin,
      icon: <LinkedIn fontSize="large" />,
    },
  ];

  return (
    <Grid container spacing={2}>
      {topCardsData.map((card, i) => {
        const color = getColorByValue(card.value);

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
            <Box
              bgcolor={`${color}.light`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={2}
              py={2}
              textAlign="center"
              border={`1px solid ${color}.main`}
              borderRadius="8px"
              width="100%"
            >
              {/* Social Icon */}
              <Box display="flex" alignItems="center">
                {React.cloneElement(card.icon, { color })}
              </Box>

              {/* Title and Value in a column */}
              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography color={`${color}.main`} variant="subtitle2" fontWeight={600}>
                  {card.title}
                </Typography>
                <Typography color={`${color}.main`} variant="h5" fontWeight={600}>
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

export default SocialNetworksIndicators;