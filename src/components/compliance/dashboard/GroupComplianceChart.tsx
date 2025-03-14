import MenuIcon from '@mui/icons-material/Menu';
import { Box, Card, CardContent, FormControl, IconButton, InputLabel, Menu, MenuItem as MuiMenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Loader, { LoaderType } from 'src/components/shared/Loader/Loader';
import { useDispatch } from 'src/store/Store';

const GroupComplianceChart: React.FC = () => {
  const dispatch = useDispatch();

  const [selectedProject, setSelectedProject] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    // Simular la carga de datos estáticos
    const exampleProjects = [
      { id: 1, name: 'Project 1' },
      { id: 2, name: 'Project 2' },
      { id: 3, name: 'Project 3' },
      { id: 4, name: 'Project 4' },
    ];
    setProjects(exampleProjects);
    setSelectedProject(exampleProjects[0]?.id);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      // Simular la carga de datos estáticos para grupos
      const exampleGroups = [
        { name: 'Group 1', value: 75 },
        { name: 'Group 2', value: 85 },
        { name: 'Group 3', value: 90 },
        { name: 'Group 4', value: 60 },
      ];
      setGroups(exampleGroups);
    }
  }, [selectedProject]);

  if (loading) {
    return <Loader type={LoaderType.Contained} />;
  }

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

  function chartGraphic() {
    if (!selectedProject) {
      return <></>;
    }
    if (!groups || !selectedProject) {
      return (
        <Box sx={{ height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Loader />
        </Box>
      );
    }
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
      labels: groups.map(group => group.name),
      colors: ['#FF6347', '#FF4500', '#32CD32', '#FFD700', '#20B2AA', '#8A2BE2'],
    };
    const chartData = groups.map(group => group.value) || [];

    const selectedValue = 1;
    const validSelectedValue =
      selectedValue >= 0 && selectedValue < chartData.length
        ? selectedValue
        : 0;
    const averageValue = chartData[selectedValue] || 0;

    return (
      <Box>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
          <Chart
            options={chartOptions}
            series={[chartData[validSelectedValue]]}
            type="radialBar"
            height={350}
          />
        </div>

        <Typography variant="subtitle1" align="center" style={{ marginTop: 16 }}>
          Average: {averageValue}%
        </Typography>
      </Box>
    );
  }

  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControl fullWidth>
            <InputLabel id="project-select-label">Seleccionar Proyecto:</InputLabel>
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
        {chartGraphic()}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}></div>
      </CardContent>
    </Card>
  );
};

export default GroupComplianceChart;