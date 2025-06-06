import {
  AccountCircle,
  Code,
  Email,
  Folder,
  Hvac,
  Language,
  Launch,
  Link,
  People,
  Phone,
  Public,
  Security,
  VerifiedUser,
} from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { clearListSummary } from 'src/store/sections/cyber-guard/SummaryMonitoringSlice';
import { useDispatch } from 'src/store/Store';

const firstRowData = [
  {
    title: 'total_compromises',
    icon: <Security fontSize="large" />,
    color: '#3498DB',
    filter: 'all',
  },
  { title: 'domains', icon: <Language fontSize="large" />, color: '#4A90E2', filter: 'domains' },
  { title: 'emails', icon: <Email fontSize="large" />, color: '#F4BE34', filter: 'emails' },
  { title: 'ips', icon: <Public fontSize="large" />, color: '#7B8D8E', filter: 'ips' },
  {
    title: 'usernames',
    icon: <AccountCircle fontSize="large" />,
    color: '#7F8C8D',
    filter: 'usernames',
  },
];

const secondRowData = [
  { title: 'phones', icon: <Phone fontSize="large" />, color: '#8E44AD', filter: 'phones' },
  {
    title: 'social_media_total',
    icon: <People fontSize="large" />,
    color: '#1E9C8B',
    filter: 'summary',
  },
  {
    title: 'vip_compromised_count',
    icon: <VerifiedUser fontSize="large" />,
    color: '#2ECC71',
    filter: 'summary',
  },
  {
    title: 'dark_web_total',
    icon: <Hvac fontSize="large" />,
    color: '#E74C3C',
    filter: 'darkweb',
  },
];

const thirdRowData = [
  {
    title: 'link_url_internal',
    icon: <Link fontSize="large" />,
    color: '#E67E22',
    filter: 'linked_url_internal',
  },
  {
    title: 'link_url_external',
    icon: <Launch fontSize="large" />,
    color: '#F39C12',
    filter: 'linked_url_external',
  },
  {
    title: 'interesting_files',
    icon: <Folder fontSize="large" />,
    color: '#C0392B',
    filter: 'interesting_files',
  },
  {
    title: 'public_code_repo',
    icon: <Code fontSize="large" />,
    color: '#8E44AD',
    filter: 'public_code_repo',
  },
];

interface TopCardsDarkWebProps {
  values: number[];
}

const TopCardsDarkWeb: React.FC<TopCardsDarkWebProps> = ({ values }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [exampleValues, setExampleValues] = useState<number[]>([]);

  useEffect(() => {
    // Simular la carga de datos estáticos
    const exampleData = [
      100, // total_compromises
      50,  // domains
      75,  // emails
      30,  // ips
      60,  // usernames
      40,  // phones
      20,  // social_media_total
      10,  // vip_compromised_count
      90,  // dark_web_total
      25,  // link_url_internal
      35,  // link_url_external
      45,  // interesting_files
      55,  // public_code_repo
    ];
    setExampleValues(exampleData);
  }, []);

  const completeValues =
    exampleValues.length >= firstRowData.length + secondRowData.length + thirdRowData.length
      ? exampleValues
      : [
          ...exampleValues,
          ...Array(
            firstRowData.length + secondRowData.length + thirdRowData.length - exampleValues.length,
          ).fill(0),
        ];

  const distributeRiskLevels = (value: number) => {
    const low = Math.round(value * 0.1);
    const medium = Math.round(value * 0.3);
    const high = Math.round(value * 0.4);
    const critical = value - (low + medium + high);
    return { low, medium, high, critical };
  };

  const handleCardClick = (filter: string) => {
    dispatch(clearListSummary());
    if (filter === 'summary') {
      navigate('/monitoring/cyber-guard/monitoring');
    } else {
      navigate(`/monitoring/summary-monitoring?filter=${filter}`);
    }
  };

  return (
    <Grid container spacing={3}>
      {firstRowData.map((card, i) => {
        const riskLevels = distributeRiskLevels(completeValues[i]);

        return (
          <Grid item xs={6} sm={3} lg={2.4} key={i}>
            <Box
              sx={{
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                boxShadow: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 2,
                  cursor: 'pointer',
                },
              }}
              display="flex"
              justifyContent="space-between"
              px={2}
              py={2}
              textAlign="center"
              border="#ffffff"
              borderRadius="8px"
              onClick={() => handleCardClick(card.filter)}
            >
              <Box display="flex" alignItems="center">
                {React.cloneElement(card.icon, { sx: { color: card.color } })}
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  {t(`observability.${card.title}`)}
                </Typography>
                <Typography variant="h5" fontWeight={600}>
                  {completeValues[i]}
                </Typography>
              </Box>
            </Box>
          </Grid>
        );
      })}

      {secondRowData.map((card, i) => {
        const riskLevels = distributeRiskLevels(completeValues[firstRowData.length + i]);

        return (
          <Grid item xs={6} sm={3} lg={3} key={i}>
            <Box
              sx={{
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                boxShadow: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 2,
                  cursor: 'pointer',
                },
              }}
              display="flex"
              justifyContent="space-between"
              px={2}
              py={2}
              textAlign="center"
              border="#ffffff"
              borderRadius="8px"
              onClick={() => handleCardClick(card.filter)}
            >
              <Box display="flex" alignItems="center">
                {React.cloneElement(card.icon, { sx: { color: card.color } })}
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  {t(`observability.${card.title}`)}
                </Typography>
                <Typography variant="h5" fontWeight={600}>
                  {completeValues[firstRowData.length + i]}
                </Typography>
              </Box>
            </Box>
          </Grid>
        );
      })}

      {thirdRowData.map((card, i) => {
        const riskLevels = distributeRiskLevels(
          completeValues[firstRowData.length + secondRowData.length + i],
        );

        return (
          <Grid item xs={6} sm={3} lg={3} key={i}>
            <Box
              sx={{
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                boxShadow: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 2,
                  cursor: 'pointer',
                },
              }}
              display="flex"
              justifyContent="space-between"
              px={2}
              py={2}
              textAlign="center"
              border="#ffffff"
              borderRadius="8px"
              onClick={() => handleCardClick(card.filter)}
            >
              <Box display="flex" alignItems="center">
                {React.cloneElement(card.icon, { sx: { color: card.color } })}
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  {t(`monitoring.${card.title}`)}
                </Typography>
                <Typography variant="h5" fontWeight={600}>
                  {completeValues[firstRowData.length + secondRowData.length + i]}
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