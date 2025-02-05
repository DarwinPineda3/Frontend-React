import MenuIcon from '@mui/icons-material/Menu';
import { Box, Card, CardContent, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchExecutionsCountByProject } from 'src/store/sections/compliance/giottoDashboardSlice';
import { useDispatch, useSelector } from 'src/store/Store';

const ExecutionByProject: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [selectedProject, setSelectedProject] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { ExecutionByProject: projects } = useSelector((state) => state.giottoDashboardSlice);

  useEffect(() => {

    dispatch(fetchExecutionsCountByProject());
  }, [dispatch]);

  if (!projects) {
    return <Box sx={{ height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Loader />
    </Box>;
  }
  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 5,
      },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
    ],
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: projects.map((project) => project.projectName),
    },
    yaxis: {
      title: {
        text: 'Qty of Executions',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'Arial, Helvetica, sans-serif',
        },
      },
    },
    legend: {
      position: 'bottom',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
          },
          dataLabels: {
            style: {
              fontSize: '10px',
            },
          },
        },
      },
    ],
  };

  const chartSeries = [
    {
      name: 'Assessment',
      data: projects.map((project) => project.assessmentExecutionsCount),
    },
    {
      name: 'Hardening',
      data: projects.map((project) => project.hardeningExecutionsCount),
    },
    {
      name: 'Rollback',
      data: projects.map((project) => project.rollbackExecutionsCount),
    },
  ];

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

  const average = (projects.reduce((acc, project) => acc + project.assessmentExecutionsCount, 0) / projects.length);

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
              key={selectedProject}
            >
              <MenuItem value={0}>Todos los proyectos</MenuItem>
              {projects.map((project) => (
                <MenuItem key={project.projectName} value={project.projectName}>
                  {project.projectName}
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
            <MenuItem onClick={() => handleDownload('SVG')}>Download SVG</MenuItem>
            <MenuItem onClick={() => handleDownload('PNG')}>Download PNG</MenuItem>
          </Menu>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </div>

        <Typography variant="subtitle1" align="center" style={{ marginTop: 16 }}>
          Average: {average}%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ExecutionByProject;
