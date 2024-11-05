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
import { useTranslation } from 'react-i18next';

interface DarkWebIndicatorsProps {
  darkWebCounters: {
    dw_ips: number;
    dw_emails: number;
    dw_names_usernames: number;
    dw_phones: number;
    dw_vins: number;
    dw_domains: number;
    dark_web_total: number;
  };
}

// Function to return color based on value
const getColorByValue = (value: number) => {
  if (value <= 0) return 'success';
  return 'error';
};

const DarkWebIndicators: React.FC<DarkWebIndicatorsProps> = ({ darkWebCounters }) => {
  const { t } = useTranslation();

  const topCardsData = [
    {
      title: t('monitoring.total_results'),
      value: darkWebCounters.dark_web_total,
      icon: <Security fontSize="large" />,
    },
    {
      title: t('monitoring.domains'),
      value: darkWebCounters.dw_domains,
      icon: <Language fontSize="large" />,
    },
    {
      title: t('monitoring.emails'),
      value: darkWebCounters.dw_emails,
      icon: <Email fontSize="large" />,
    },
    {
      title: 'IPs',
      value: darkWebCounters.dw_ips,
      icon: <Public fontSize="large" />,
    },
    {
      title: t('monitoring.usernames'),
      value: darkWebCounters.dw_names_usernames,
      icon: <AccountCircle fontSize="large" />,
    },
    {
      title: t('monitoring.phones'),
      value: darkWebCounters.dw_phones,
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
              {/* Social Icon */}
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

export default DarkWebIndicators;