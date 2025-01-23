import MenuIcon from '@mui/icons-material/Menu';
import { Box, Card, CardContent, FormControl, IconButton, InputLabel, Menu, MenuItem, MenuItem as MuiMenuItem, Select, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchProjectsComplianceByCompany } from 'src/store/sections/compliance/giottoDashboardSlice';
import { useDispatch, useSelector } from 'src/store/Store';

const ComplianceChart: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const { ProjectsComplianceByCompany: projects } = useSelector((state) => state.giottoDashboardSlice);


  const theme = useTheme();


  useEffect(() => {
    setLoading(false);
    dispatch(fetchProjectsComplianceByCompany());
  }, [dispatch]);

  if (!projects) {
    return <Box sx={{ height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Loader />
    </Box>;
  }

  const chartOptions: ApexOptions = {
    chart: {
      type: 'radialBar',
      height: 350,
      width: '100%',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        track: {
          background: '#F2F2F2',
          strokeWidth: '80%',
        },
        dataLabels: {
          show: true,
          name: {
            fontSize: '22px',
            fontWeight: 'regular',
          },
          value: {
            fontSize: '16px',
            fontWeight: 'regular',
          },
        },
      },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.error.main,
    ],
    labels: projects.map(project => project.name),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          dataLabels: {
            name: {
              fontSize: '16px',
            },
            value: {
              fontSize: '12px',
            },
          },
        },
      },
    ],
  };

  const chartSeries = projects.map(project => project.compliancePercent);

  const calculateAverage = () => {
    if (selectedProject === 0) {
      const total = chartSeries.reduce((acc, value) => acc + value, 0);
      return total / chartSeries.length;
    } else {
      const selectedValue = chartSeries[selectedProject - 1];
      return selectedValue;
    }
  };

  const averageValue = calculateAverage();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = (type: string) => {
    console.log(`Descargando como ${type}`);
    setAnchorEl(null);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControl fullWidth>
            <InputLabel id="project-select-label">Seleccionar Proyecto</InputLabel>
            <Select
              labelId="project-select-label"
              value={selectedProject}
              label="Seleccionar Proyecto"
              onChange={(e) => setSelectedProject(Number(e.target.value))}
              disabled={loading}
            >
              <MenuItem value={0}>Todos los proyectos</MenuItem>
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                width: '160px',
              },
            }}
          >
            <MuiMenuItem onClick={() => handleDownload('SVG')}>Download SVG</MuiMenuItem>
            <MuiMenuItem onClick={() => handleDownload('PNG')}>Download PNG</MuiMenuItem>
          </Menu>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
          {loading ? (
            <Typography variant="h6" align="center">Cargando datos...</Typography>
          ) : (
            <Chart
              options={chartOptions}
              series={selectedProject === 0 ? chartSeries : [chartSeries[selectedProject - 1]]}
              type="radialBar"
              height={350}
            />
          )}
        </div>

        <Typography variant="subtitle1" align="center" style={{ marginTop: 16 }}>
          Average: {averageValue}%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ComplianceChart;
