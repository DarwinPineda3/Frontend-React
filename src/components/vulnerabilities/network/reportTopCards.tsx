import { Computer, Lan, Security, WifiTethering } from '@mui/icons-material'; // Importing Material UI Icons
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ReportDetailChartsProps {
  counters: {
    vulnerabilities_counter: number;
    hosts_counter: number;
    os_scan_counter: number;
    scanned_ports_counter: number;
  };
}

const ReportTopCards: React.FC<ReportDetailChartsProps> = ({ counters }) => {
  const { t } = useTranslation();

  const topCardsData = [
    {
      title: t('vulnerabilities.vulnerabilities'),
      value: counters.vulnerabilities_counter || 0,
      icon: <Security fontSize="large" color="error" />,
      bgcolor: 'error',
    },
    {
      title: t('vulnerabilities.hosts'),
      value: counters.hosts_counter || 0,
      icon: <Computer fontSize="large" color="warning" />,
      bgcolor: 'warning',
    },
    {
      title: t('vulnerabilities.os_scan'),
      value: counters.os_scan_counter || 0,
      icon: <WifiTethering fontSize="large" color="success" />,
      bgcolor: 'success',
    },
    {
      title: t('vulnerabilities.scanned_ports'),
      value: counters.scanned_ports_counter || 0,
      icon: <Lan fontSize="large" color="info" />,
      bgcolor: 'info',
    },
  ];
  return (
    <Grid container spacing={3}>
      {topCardsData.map((card, i) => (
        <Grid item xs={6} sm={6} lg={3} key={i}>
          <Box
            bgcolor={card.bgcolor + '.light'}
            display="flex"
            justifyContent="space-between"
            px={2}
            py={2}
            textAlign="center"
            border={`1px solid ${card.bgcolor}.main`}
            borderRadius="8px"
          >
            <Box display="flex" alignItems="center">
              {card.icon}
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Typography color={card.bgcolor + '.main'} variant="subtitle2" fontWeight={600}>
                {card.title}
              </Typography>
              <Typography color={card.bgcolor + '.main'} variant="h5" fontWeight={600}>
                {card.value}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReportTopCards;
