import { Box, Grid, Typography } from '@mui/material';
import {
  Security,
  Language,
  Email,
  Public,
  AccountCircle,
  Phone,
} from '@mui/icons-material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface SecurityLeaksIndicatorsProps {
  securityLeakCounters: {
    security_leaks_total: number;
    sl_domains: number;
    sl_emails: number;
    sl_ips: number;
    sl_names_usernames: number;
    sl_phones: number;
  };
}

// Function to return color based on value
const getColorByValue = (value: number) => {
  if (value <= 0) return 'success';
  return 'error';
};

const SecurityLeaksIndicators: React.FC<SecurityLeaksIndicatorsProps> = ({
  securityLeakCounters,
}) => {
  const { t } = useTranslation();

  const topCardsData = [
    {
      title: t('monitoring.total_compromises'),
      value: securityLeakCounters.security_leaks_total,
      icon: <Security fontSize="large" />,
    },
    {
      title: t('monitoring.domains'),
      value: securityLeakCounters.sl_domains,
      icon: <Language fontSize="large" />,
    },
    {
      title: t('monitoring.emails'),
      value: securityLeakCounters.sl_emails,
      icon: <Email fontSize="large" />,
    },
    {
      title: 'IPs',
      value: securityLeakCounters.sl_ips,
      icon: <Public fontSize="large" />,
    },
    {
      title: t('monitoring.usernames'),
      value: securityLeakCounters.sl_names_usernames,
      icon: <AccountCircle fontSize="large" />,
    },
    {
      title: t('monitoring.phones'),
      value: securityLeakCounters.sl_phones,
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

export default SecurityLeaksIndicators;