import MenuIcon from '@mui/icons-material/Menu';
import { Card, CardContent, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Loader, { LoaderType } from 'src/components/shared/Loader/Loader';
import { useDispatch } from 'src/store/Store';

const ExecutionByProject: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [selectedProject, setSelectedProject] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    // Simular la carga de datos estáticos
    const exampleData = [
      { projectName: 'Project 1', assessmentExecutionsCount: 10, hardeningExecutionsCount: 5, rollbackExecutionsCount: 2 },
      { projectName: 'Project 2', assessmentExecutionsCount: 15, hardeningExecutionsCount: 7, rollbackExecutionsCount: 3 },
      { projectName: 'Project 3', assessmentExecutionsCount: 20, hardeningExecutionsCount: 10, rollbackExecutionsCount: 5 },
      { projectName: 'Project 4', assessmentExecutionsCount: 25, hardeningExecutionsCount: 12, rollbackExecutionsCount: 6 },
    ];
    setProjects(exampleData);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader type={LoaderType.Contained} />;
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