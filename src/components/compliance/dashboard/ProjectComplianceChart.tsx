import React, { useState } from 'react';
import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem as MuiMenuItem, IconButton, Menu } from '@mui/material';
import Chart from 'react-apexcharts';
import MenuIcon from '@mui/icons-material/Menu';

const ProjectComplianceChart: React.FC = () => {
  const projects = [
    { id: 1, name: 'Proyecto Demo Giotto', value: 74.58 },
    { id: 2, name: 'Grupo Demo Giotto 2', value: 80 },
    { id: 3, name: 'Prueba akila', value: 65 },
    { id: 4, name: 'Prueba akila 2 editado', value: 50 },
    { id: 5, name: 'Akila Prueba', value: 90 },
    { id: 6, name: 'Prueba desde Akila 2025', value: 60 },
  ];

  const groups = [
    { id: 1, name: 'prueba de edición 2.2' }, 
  ];

  const [selectedProject, setSelectedProject] = useState<number>(1);
  const [selectedGroup, setSelectedGroup] = useState<number>(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const chartOptions = {
    chart: {
      type: 'radialBar' as const,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
            fontWeight: 'regular',
            fill: '#373d3f',
          },
          value: {
            fontSize: '16px',
            fontWeight: 'regular',
            fill: '#373d3f',
          },
        },
        track: {
          background: '#e6e6e6',
        },
      },
    },
    labels: projects.map(project => project.name),
    colors: ['#FF6347', '#FF4500', '#32CD32', '#FFD700', '#20B2AA', '#8A2BE2'],
  };

  const chartData = projects.map(project => project.value);

  const selectedValue = selectedProject - 1;
  const averageValue = chartData[selectedValue];

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = (format: string) => {
    console.log(`Descargando gráfico en formato ${format}`);
    setAnchorEl(null);
  };

  /*
  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch(`http://201.149.34.143:8443/api/Groups/GetListByProjectId/${selectedProject}`);
      const data = await response.json();
      setGroups(data);
    };

    fetchGroups();
  }, [selectedProject]);
  */

  return (
    <Card>
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
              {projects.map((project) => (
                <MuiMenuItem key={project.id} value={project.id}>
                  {project.name}
                </MuiMenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="group-select-label">Seleccionar Grupo</InputLabel>
            <Select
              labelId="group-select-label"
              value={selectedGroup}
              label="Seleccionar Grupo"
              onChange={(e) => setSelectedGroup(Number(e.target.value))}
            >
              {groups.map((group) => (
                <MuiMenuItem key={group.id} value={group.id}>
                  {group.name}
                </MuiMenuItem>
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
          <Chart
            options={chartOptions}
            series={[chartData[selectedValue]]}
            type="radialBar"
            height={350}
          />
        </div>

        <Typography variant="subtitle1" align="center" style={{ marginTop: 16 }}>
          Average: {averageValue}%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectComplianceChart;
