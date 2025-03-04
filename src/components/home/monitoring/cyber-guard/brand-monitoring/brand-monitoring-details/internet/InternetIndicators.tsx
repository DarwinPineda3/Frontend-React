import { AccountCircle, Email, Language, Phone, Public, Security } from '@mui/icons-material';
import DataObjectIcon from '@mui/icons-material/DataObject';

import CodeIcon from '@mui/icons-material/Code';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LinkIcon from '@mui/icons-material/Link';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface InternetIndicatorsProps {
  internetCounters: {
    ips: number;
    emails: number;
    names_usernames: number;
    phones: number;
    vins: number;
    domains: number;
    total: number;
    linked_url_internal: number;
    linked_url_external: number;
    interesting_files: number;
    public_code_repo: number;
    raw_file_meta_data: number;
  };
}

// Function to return color based on value
const getColorByValue = (value: number) => {
  if (value <= 0) return 'success';
  return 'error';
};

const InternetIndicators: React.FC<InternetIndicatorsProps> = ({ internetCounters }) => {
  const { t } = useTranslation();

  const topCardsData = [
    {
      title: t('monitoring.total_results'),
      value: internetCounters.total,
      icon: <Security fontSize="large" />,
    },
    {
      title: t('monitoring.domains'),
      value: internetCounters.domains,
      icon: <Language fontSize="large" />,
    },
    {
      title: t('monitoring.emails'),
      value: internetCounters.emails,
      icon: <Email fontSize="large" />,
    },
    {
      title: 'IPs',
      value: internetCounters.ips,
      icon: <Public fontSize="large" />,
    },
    {
      title: t('monitoring.usernames'),
      value: internetCounters.names_usernames,
      icon: <AccountCircle fontSize="large" />,
    },
    {
      title: t('monitoring.phones'),
      value: internetCounters.phones,
      icon: <Phone fontSize="large" />,
    },
    {
      title: t('monitoring.link_url_internal'),
      value: internetCounters.linked_url_internal,
      icon: <LinkIcon fontSize="large" />,
    },
    {
      title: t('monitoring.link_url_external'),
      value: internetCounters.linked_url_external,
      icon: <LinkIcon fontSize="large" />,
    },
    {
      title: t('monitoring.interesting_files'),
      value: internetCounters.interesting_files,
      icon: <InsertDriveFileIcon fontSize="large" />,
    },
    {
      title: t('monitoring.public_code_repo'),
      value: internetCounters.public_code_repo,
      icon: <CodeIcon fontSize="large" />,
    },
    {
      title: t('monitoring.raw_file_meta_data'),
      value: internetCounters.raw_file_meta_data,
      icon: <DataObjectIcon fontSize="large" />,
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
