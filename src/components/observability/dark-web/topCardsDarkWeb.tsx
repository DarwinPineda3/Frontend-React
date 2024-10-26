import { Box, Grid, Typography } from '@mui/material';
import { Security, Language, Email, Public, AccountCircle, Phone } from '@mui/icons-material';
import React from 'react';
import { useTranslation } from 'react-i18next';

// Data for the top cards with font icons
const topCardsData = [
    { title: 'total_compromises', value: 2, icon: <Security fontSize="large" /> }, 
    { title: 'domains', value: 2, icon: <Language fontSize="large" /> },
    { title: 'emails', value: 1, icon: <Email fontSize="large" /> },
    { title: 'ips', value: 30, icon: <Public fontSize="large" /> },
    { title: 'usernames', value: 30, icon: <AccountCircle fontSize="large" /> },
    { title: 'phones', value: 30, icon: <Phone fontSize="large" /> },
];

// Function to return color based on value
const getColorByValue = (value: number) => {
  if (value <= 1) return 'success';
  if (value <= 5) return 'info';
  if (value <= 9) return 'warning';
  return 'error';
};

const TopCardsDarkWeb = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3}>
      {topCardsData.map((card, i) => {
        const color = getColorByValue(card.value);

        return (
          <Grid item xs={4} sm={4} lg={2} key={i}>
            <Box
              bgcolor={`${color}.light`}
              display="flex"
              justifyContent="space-between"
              px={2}
              py={2}
              textAlign="center"
              border={`1px solid ${color}.main`}
              borderRadius="8px"
            >
              {/* Font Icon */}
              <Box display="flex" alignItems="center">
                {React.cloneElement(card.icon, { color })}
              </Box>

              {/* Title and Value in a row */}
              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography color={`${color}.main`} variant="subtitle2" fontWeight={600}>
                  {t(`observability.${card.title}`)}
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

export default TopCardsDarkWeb;
