import { Box, Grid, Typography } from '@mui/material';
import { Computer, Security, WifiTethering, Lan, AccountCircle, Email, Language, Phone, Public } from '@mui/icons-material'; // Importing Material UI Icons
import React from 'react';

// Data for the top cards with font icons
const topCardsData = [
    { title: 'Total Compromises', value: 2, icon: <Security fontSize="large" />, }, // Security for compromises
    { title: 'Domains', value: 2, icon: <Language fontSize="large" />, }, // Language icon for domains
    { title: 'Emails', value: 1, icon: <Email fontSize="large" />, }, // Email icon for emails
    { title: 'IPs', value: 30, icon: <Public fontSize="large" />, }, // Public icon for IPs
    { title: 'Usernames', value: 30, icon: <AccountCircle fontSize="large" />, }, // AccountCircle for usernames
    { title: 'Phones', value: 30, icon: <Phone fontSize="large" />, }, // Phone icon for phones
  ];
  
// Function to return color based on value
const getColorByValue = (value: number) => {
  if (value <= 1) return 'success';
  if (value <= 5) return 'info';
  if (value <= 9) return 'warning';
  return 'error';
};

const TopCardsDarkWeb = () => {
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

export default TopCardsDarkWeb;
