import { Box, Grid, Typography } from '@mui/material';
import { Security, Language, Email, Public, AccountCircle, Phone, BugReport, VerifiedUser, Apps } from '@mui/icons-material';
import React from 'react';
import { useTranslation } from 'react-i18next';

// Data for the first row of top cards
const firstRowData = [
    { title: 'total_compromises', value: 2, icon: <Security fontSize="large" /> }, 
    { title: 'domains', value: 2, icon: <Language fontSize="large" /> },
    { title: 'emails', value: 1, icon: <Email fontSize="large" /> },
    { title: 'ips', value: 30, icon: <Public fontSize="large" /> },
    { title: 'usernames', value: 30, icon: <AccountCircle fontSize="large" /> },
    { title: 'phones', value: 30, icon: <Phone fontSize="large" /> },
];

// Data for the second row of top cards
const secondRowData = [
    { title: 'malware_count', value: 5, icon: <BugReport fontSize="large" /> },
    { title: 'vip_compromised_count', value: 3, icon: <VerifiedUser fontSize="large" /> },
    { title: 'fake_app_count', value: 7, icon: <Apps fontSize="large" /> },
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
      {/* First row with wider cards */}
      {firstRowData.map((card, i) => {
        const color = getColorByValue(card.value);
        return (
          <Grid item xs={6} sm={4} lg={2} key={i}>
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

      {/* Second row with narrower cards */}
      {secondRowData.map((card, i) => {
        const color = getColorByValue(card.value);
        return (
          <Grid item xs={12} sm={6} lg={4} key={i}>
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
