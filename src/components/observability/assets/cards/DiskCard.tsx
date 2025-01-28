import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconGridDots } from '@tabler/icons-react';
import React from 'react';
import Chart, { Props } from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';

interface DiskProps {
  storage_charts: {
    chart: {
      free_space: number;
      used_space: number;
    };
    drive: string;
    volume_name: string;
    size: number;
    free_space: number;
    used_space: number;
    file_system: string;
  }[];
}

const DiskCard: React.FC<DiskProps> = ({ storage_charts }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const primarylight = theme.palette.primary.light;
  const textColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : '#2A3547';

  if (!storage_charts) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Loader />
      </Box>
    );
  }

  if (storage_charts.length === 0) {
    return (
      <DashboardCard title={t('observability.cpu_usage')!}>
        <Box>
          <Typography variant="h6" color="textSecondary">
            {t('observability.no_data_available_for_chart')}
          </Typography>
        </Box>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard
      title={t('observability.disk_usage_overview')!}
      subtitle={t('observability.current_status')!}
    >
      <React.Fragment>
        {storage_charts.map((disk, index) => {
          const { drive, volume_name, chart, free_space, used_space, size } = disk;

          const optionscolumnchart: Props = {
            chart: {
              type: 'donut',
              fontFamily: "'Plus Jakarta Sans', sans-serif;",
              toolbar: {
                show: false,
              },
              height: 275,
            },
            labels: [t('observability.used_space'), t('observability.free_space')],
            colors: [primary, primarylight],
            plotOptions: {
              pie: {
                donut: {
                  size: '89%',
                  background: 'transparent',
                  labels: {
                    show: true,
                    name: {
                      show: true,
                      offsetY: 7,
                    },
                    value: {
                      show: false,
                    },
                    total: {
                      show: true,
                      color: textColor,
                      fontSize: '20px',
                      fontWeight: '600',
                      label: `${size.toFixed(2)} GB`,
                    },
                  },
                },
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              show: false,
            },
            legend: {
              show: false,
            },
            tooltip: {
              theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
              fillSeriesColor: false,
            },
          };

          const seriescolumnchart = [chart.used_space, chart.free_space];

          return (
            <Accordion key={index} defaultExpanded={false}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6" fontWeight="600" color="textPrimary">
                  {drive} ({volume_name}) - {t('observability.file_system')}: {disk.file_system}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Chart
                  options={optionscolumnchart}
                  series={seriescolumnchart}
                  type="donut"
                  height="275px"
                />
                <Stack direction="row" spacing={2} justifyContent="space-between" mt={4}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      width={38}
                      height={38}
                      bgcolor="primary.light"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography
                        color="primary.main"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <IconGridDots width={22} />
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight="600">
                        {used_space.toFixed(2)} GB
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {t('observability.used_space')}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      width={38}
                      height={38}
                      bgcolor="secondary.light"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography
                        color="secondary.main"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <IconGridDots width={22} />
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight="600">
                        {free_space.toFixed(2)} GB
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {t('observability.free_space')}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </React.Fragment>
    </DashboardCard>
  );
};

export default DiskCard;
