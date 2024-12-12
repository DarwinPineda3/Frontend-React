import { AccountCircle, Email, Hvac, Language, People, Phone, Public, Security, VerifiedUser } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

// Data for the first row of top cards
const firstRowData = [
  { title: 'total_compromises', icon: <Security fontSize="large" /> },
  { title: 'domains', icon: <Language fontSize="large" /> },
  { title: 'emails', icon: <Email fontSize="large" /> },
  { title: 'ips', icon: <Public fontSize="large" /> },
  { title: 'usernames', icon: <AccountCircle fontSize="large" /> },
  { title: 'phones', icon: <Phone fontSize="large" /> },
];

// Data for the second row of top cards
const secondRowData = [
  { title: 'social_media_total', icon: <People fontSize="large" /> },
  { title: 'vip_compromised_count', icon: <VerifiedUser fontSize="large" /> },
  { title: 'dark_web_total', icon: <Hvac fontSize="large" /> },
];

// Function to return color based on value
const getColorByValue = (value: number) => {
  if (value < 1) return 'success';
  return 'error';
};

interface TopCardsDarkWebProps {
  values: number[];
}

const TopCardsDarkWeb: React.FC<TopCardsDarkWebProps> = ({ values }) => {
  const { t } = useTranslation();

  // Ensure values array has at least the expected length, fill missing values with 0
  const completeValues = values.length >= firstRowData.length + secondRowData.length
    ? values
    : [...values, ...Array(firstRowData.length + secondRowData.length - values.length).fill(0)];

  return (
    <Grid container spacing={3}>
      {/* First row with wider cards */}
      {firstRowData.map((card, i) => {
        const color = getColorByValue(completeValues[i]);
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
                  {completeValues[i]}
                </Typography>
              </Box>
            </Box>
          </Grid>
        );
      })}

      {/* Second row with narrower cards */}
      {secondRowData.map((card, i) => {
        const color = getColorByValue(completeValues[firstRowData.length + i]);
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
                  {completeValues[firstRowData.length + i]}
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
