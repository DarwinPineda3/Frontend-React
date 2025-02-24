import { AccountCircle, Email, Hvac, Language, People, Phone, Public, Security, VerifiedUser } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; 

const firstRowData = [
  { title: 'total_compromises', icon: <Security fontSize="large" />, color: '#3498DB', filter: 'total_compromises' },
  { title: 'domains', icon: <Language fontSize="large" />, color: '#4A90E2', filter: 'domains' },
  { title: 'emails', icon: <Email fontSize="large" />, color: '#F4BE34', filter: 'emails' },
  { title: 'ips', icon: <Public fontSize="large" />, color: '#7B8D8E', filter: 'ips' },
  { title: 'usernames', icon: <AccountCircle fontSize="large" />, color: '#7F8C8D', filter: 'usernames' },
  { title: 'phones', icon: <Phone fontSize="large" />, color: '#8E44AD', filter: 'phones' },
];

const secondRowData = [
  { title: 'social_media_total', icon: <People fontSize="large" />, color: '#1E9C8B', filter: 'social_media_total' },
  { title: 'vip_compromised_count', icon: <VerifiedUser fontSize="large" />, color: '#2ECC71', filter: 'vip_compromised_count' },
  { title: 'dark_web_total', icon: <Hvac fontSize="large" />, color: '#E74C3C', filter: 'dark_web_total' },
];

interface TopCardsDarkWebProps {
  values: number[];
}

const TopCardsDarkWeb: React.FC<TopCardsDarkWebProps> = ({ values }) => {
  const { t } = useTranslation();
  const navigate = useNavigate(); 

  const completeValues = values.length >= firstRowData.length + secondRowData.length
    ? values
    : [...values, ...Array(firstRowData.length + secondRowData.length - values.length).fill(0)];

  const distributeRiskLevels = (value: number) => {
    const low = Math.round(value * 0.1);
    const medium = Math.round(value * 0.3);
    const high = Math.round(value * 0.4);
    const critical = value - (low + medium + high);
    return { low, medium, high, critical };
  };

  const handleCardClick = (filter: string) => {
    navigate(`/monitoring/summary-monitoring?filter=${filter}`);
  };

  return (
    <Grid container spacing={3}>
      {firstRowData.map((card, i) => {
        const riskLevels = distributeRiskLevels(completeValues[i]);

        return (
          <Grid item xs={6} sm={4} lg={2} key={i}>
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
                }
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

              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
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
          <Grid item xs={12} sm={6} lg={4} key={i}>
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
                }
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

              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
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
    </Grid>
  );
};

export default TopCardsDarkWeb;
