import React from 'react';
import { Box, CardContent, Chip, Stack, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ec2Img from '../../../assets/images/backgrounds/ec2.png';
import iamImg from '../../../assets/images/backgrounds/iam.png';
import lambdaImg from '../../../assets/images/backgrounds/lambda.png';

interface ResourceTypeTotals {
  [key: string]: number;
}

interface ServiceData {
  service: string;
  total: number;
  resource_type_totals: ResourceTypeTotals;
}

const servicesData: ServiceData[] = [
  {
    service: 'ec2',
    total: 2,
    resource_type_totals: {
      instance: 2,
    },
  },
  {
    service: 'iam',
    total: 7,
    resource_type_totals: {
      policy: 1,
      role: 2,
      user: 4,
    },
  },
  {
    service: 'lambda',
    total: 1,
    resource_type_totals: {
      function: 1,
    },
  },
];

const CloudScansDetailObs = () => {
  const theme = useTheme();
  const secondarylight = theme.palette.secondary.light;
  const primarylight = theme.palette.primary.light;
  const borderColor = theme.palette.divider;

  return (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="start">
      {servicesData.map((service, i) => (
        <Paper
          key={service.service}
          sx={{
            bgcolor: 'primary.main',
            border: `1px solid ${borderColor}`,
            minHeight: '150px',
            width: '250px',
            display: 'flex',
            flexDirection: 'column',
          }}
          variant="outlined"
        >
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" color="white" gutterBottom>
              {service.service.toUpperCase()}
            </Typography>
            <Typography variant="subtitle1" color="white" mb={2}>
              Total: {service.total}
            </Typography>

            <Box textAlign="center" mt={2} mb="-30px">
              <img
                src={
                  service.service === 'ec2'
                    ? ec2Img
                    : service.service === 'iam'
                    ? iamImg
                    : lambdaImg
                }
                alt={service.service}
                width="120"
                style={{ margin: '0px' }}
              />
            </Box>
          </CardContent>

          <Paper
            sx={{
              overflow: 'hidden',
              position: 'relative',
              margin: '10px',
              bgcolor: 'background.paper',
              p: 2,
              flex: 1, // Allow this section to take up remaining space
            }}
          >
            <Stack spacing={2}>
              {Object.entries(service.resource_type_totals).map(([type, count], index) => (
                <Stack
                  key={type}
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" color="textSecondary">
                    {type}
                  </Typography>
                  <Chip
                    label={count}
                    size="small"
                    sx={{
                      bgcolor: i % 2 === 0 ? primarylight : secondarylight,
                    }}
                  />
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Paper>
      ))}
    </Box>
  );
};

export default CloudScansDetailObs;
