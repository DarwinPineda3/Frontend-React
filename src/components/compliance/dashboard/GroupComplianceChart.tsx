import MenuIcon from '@mui/icons-material/Menu';
import { Box, Card, CardContent, FormControl, IconButton, InputLabel, Menu, MenuItem as MuiMenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchGroupCompliance } from 'src/store/sections/compliance/giottoDashboardSlice';
import { fetchProjects } from 'src/store/sections/compliance/giottoProjectsSlice';
import { useDispatch, useSelector } from 'src/store/Store';

const GroupComplianceChart: React.FC = () => {
  const dispatch = useDispatch();

  const { GroupCompliance: groups } = useSelector((state) => state.giottoDashboardSlice);
  const { projects } = useSelector((state: any) => state.giottoProjectsReducer);

  // Datos quemados
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  useEffect(() => {
    dispatch(fetchProjects(1, 100));
  }, [dispatch]);


  useEffect(() => {
    if (selectedProject) {
      dispatch(fetchGroupCompliance(selectedProject));
    }
  }, [dispatch, selectedProject]);

  useEffect(() => {
    setSelectedProject(projects[0]?.id);
  }, [projects]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (!projects) {
    return <Loader />;
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
      return <></>
    }
    if (!groups || !selectedProject) {
      return <Loader />
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

    return <Box>
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
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>

        </div>
      </CardContent>
    </Card>
  );
};

export default GroupComplianceChart;
