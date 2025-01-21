import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, Typography, FormControl, InputLabel, MenuItem, Select, IconButton, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '@mui/material/styles';

const ExecutionByProject: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]); 
  const [selectedProject, setSelectedProject] = useState<number>(0); 
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Datos quemados
  const mockProjects = [
    {
      projectName: "Proyecto Demo Giotto",
      assessmentExecutionsCount: 12,
      hardeningExecutionsCount: 7,
      rollbackExecutionsCount: 1,
    },
    {
      projectName: "Grupo Demo Giotto 2",
      assessmentExecutionsCount: 12,
      hardeningExecutionsCount: 7,
      rollbackExecutionsCount: 1,
    },
    {
      projectName: "Prueba akila",
      assessmentExecutionsCount: 12,
      hardeningExecutionsCount: 7,
      rollbackExecutionsCount: 1,
    },
    {
      projectName: "Prueba akila 2 editado",
      assessmentExecutionsCount: 12,
      hardeningExecutionsCount: 7,
      rollbackExecutionsCount: 1,
    }
  ];

  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://201.149.34.143:8443/api/Charting/GetProjectsExecutionsByCompany/1');
        const data = await response.json();
        setProjects(data); 
      } catch (error) {
        console.error('Error fetching projects data:', error);
      }
    };

    fetchData();
  }, []);
  */
  
  useEffect(() => {
    setProjects(mockProjects);
  }, []);

  const theme = useTheme();

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
