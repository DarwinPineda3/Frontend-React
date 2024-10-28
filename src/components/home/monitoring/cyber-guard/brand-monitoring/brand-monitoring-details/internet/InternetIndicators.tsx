import { Box, Grid, Typography } from '@mui/material';
import {
  Security,
  AccountCircle,
  Email,
  Language,
  Phone,
  Public,
} from '@mui/icons-material';
import React from 'react';

interface InternetIndicatorsProps {
  internetCounters: {
    ips: number;
    emails: number;
    names_usernames: number;
    phones: number;
    vins: number;
    domains: number;
    total: number;
  };
}

// Function to return color based on value
const getColorByValue = (value: number) => {
  if (value <= 0) return 'success';
  return 'error';
};

const InternetIndicators: React.FC<InternetIndicatorsProps> = ({
  internetCounters,
}) => {
  const topCardsData = [
    {
      title: 'Total Compromises',
      value: internetCounters.total,
      icon: <Security fontSize="large" />,
    },
    {
      title: 'Domains',
      value: internetCounters.domains,
      icon: <Language fontSize="large" />,
    },
    {
      title: 'Emails',
      value: internetCounters.emails,
      icon: <Email fontSize="large" />,
    },
    {
      title: 'IPs',
      value: internetCounters.ips,
      icon: <Public fontSize="large" />,
    },
    {
      title: 'Usernames',
      value: internetCounters.names_usernames,
      icon: <AccountCircle fontSize="large" />,
    },
    {
      title: 'Phones',
      value: internetCounters.phones,
      icon: <Phone fontSize="large" />,
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
              {/* Font Icon */}
              <Box display="flex" alignItems="center">
                {React.cloneElement(card.icon, { color })}
              </Box>

              {/* Title and Value in a column */}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
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

export default InternetIndicators;