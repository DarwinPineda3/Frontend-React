// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, CardContent, Chip, Stack, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SavingsImg from '../../../assets/images/backgrounds/piggy.png';

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
  const secondary = theme.palette.secondary.main;
  const primary = theme.palette.primary.main;
  const borderColor = theme.palette.divider;

  return (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="start">
      {servicesData.map((service, i) => (
        <Paper sx={{ bgcolor: 'primary.main', border: `1px solid ${borderColor}` }} variant="outlined">
          <CardContent >
            <Typography variant="h5" color="white" gutterBottom>
              {service.service.toUpperCase()}
            </Typography>
            <Typography variant="subtitle1" color="white" mb={2}>
              Total: {service.total}
            </Typography>

            <Box textAlign="center" mt={2} mb="-90px">
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
                style={{ margin: '40px' }}
              />
            </Box>
            <Paper sx={{ overflow: 'hidden', zIndex: '1', position: 'relative', margin: '10px', height: '50%' }}>
              <Box p={3}>
                <Stack spacing={3}>
                  {Object.entries(service.resource_type_totals).map(([type, count], index) => (
                     <Stack
                     direction="row"
                     spacing={2}
                     mb={1}
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
                          bgcolor: i % 2 === 0 ? primarylight : secondarylight
                        }}
                      />
                    </Stack>
                  ))}
                </Stack>
              </Box>

            </Paper>

          </CardContent>
        </Paper>
      ))}
    </Box>
  );
};

export default CloudScansDetailObs;
