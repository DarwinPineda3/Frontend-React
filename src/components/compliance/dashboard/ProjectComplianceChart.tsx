import MenuIcon from '@mui/icons-material/Menu';
import { Box, Card, CardContent, FormControl, IconButton, InputLabel, Menu, MenuItem as MuiMenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Loader, { LoaderType } from 'src/components/shared/Loader/Loader';
import { fetchComplianceByProyect, fetchProjectsComplianceByCompany } from 'src/store/sections/compliance/giottoDashboardSlice';
import { useDispatch, useSelector } from 'src/store/Store';

const ProjectComplianceChart: React.FC = () => {
  const dispatch = useDispatch();
  const { ComplianceByProject: groups, ProjectsComplianceByCompany: projects } = useSelector((state) => state.giottoDashboardSlice);


  const [selectedProject, setSelectedProject] = useState<number>(1);
  const [selectedGroup, setSelectedGroup] = useState<number>(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    dispatch(fetchProjectsComplianceByCompany());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchComplianceByProyect(selectedProject));
  }, [dispatch, selectedProject]);

  if (projects === null) {
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

  function ChartPlot() {
    if (!groups || !projects) {
      return <Box sx={{ height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
      </Box>;
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
      labels: projects.map(project => project.name),
      colors: ['#FF6347', '#FF4500', '#32CD32', '#FFD700', '#20B2AA', '#8A2BE2'],
    };

    const chartData = projects.map(project => project.compliancePercent);

    const selectedValue = selectedGroup ? selectedGroup - 1 : 0;
    const validSelectedValue =
      selectedValue >= 0 && selectedValue < chartData.length
        ? selectedValue
        : 0;
    const averageValue = chartData[validSelectedValue];

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
            <InputLabel id="project-select-label">Seleccionar Proyecto</InputLabel>
            <Select
              labelId="project-select-label"
              value={selectedProject}
              label="Seleccionar Proyecto"
              onChange={(e) => {
                setSelectedProject(Number(e.target.value));
                setSelectedGroup(null);
              }}
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
              {
                groups &&
                groups.map((group) => (
                  <MuiMenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MuiMenuItem>
                ))
              }
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
        {
          ChartPlot()
        }
      </CardContent>
    </Card>
  );
};

export default ProjectComplianceChart;
