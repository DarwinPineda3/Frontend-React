import MenuIcon from '@mui/icons-material/Menu';
import { Card, CardContent, FormControl, IconButton, InputLabel, Menu, MenuItem, MenuItem as MuiMenuItem, Select, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Loader, { LoaderType } from 'src/components/shared/Loader/Loader';
import { fetchProjectsComplianceByGroup } from 'src/store/sections/compliance/giottoDashboardSlice';
import { fetchProjects } from 'src/store/sections/compliance/giottoProjectsSlice';
import { useDispatch, useSelector } from 'src/store/Store';

const ExecutionByGroup: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { ProjectsComplianceByGroup: groups } = useSelector((state) => state.giottoDashboardSlice);


  const { projects } = useSelector((state: any) => state.giottoProjectsReducer);
  useEffect(() => {
    dispatch(fetchProjects(1, 100));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchProjectsComplianceByGroup(selectedGroup));
  }, [dispatch, selectedGroup]);

  useEffect(() => {
    if (projects.length > 0) setSelectedGroup(projects[0]?.id || 0);
  }, [projects]);

  if (!groups) {
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
        horizontal: true,
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
      categories: ['Assessment', 'Hardening', 'Rollback'],
      title: {
        text: 'Qty. of Executions',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'Arial, Helvetica, sans-serif',
        },
      },
    },
    yaxis: {
      title: {
        text: '',
      },
    },
    legend: {
      show: false,
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
      data: [
        groups.length > 0 ? groups[0].values.assessment || 0 : 0,
      ],
    },
    {
      name: 'Hardening',
      data: [
        groups.length > 0 ? groups[0].values.hardening || 0 : 0,
      ],
    },
    {
      name: 'Rollback',
      data: [
        groups.length > 0 ? groups[0].values.rollback || 0 : 0,
      ],
    },
  ];

  const calculateAverageForGroup = (groupId: number) => {
    const group = groups.find((group) => group.id === groupId);
    if (group) {
      const values = Object.values(group.values);
      return values.reduce((acc, value) => acc + value, 0) / values.length;
    }
    return 0;
  };

  const calculateAverageForAllGroups = () => {
    const totalAssessment = groups.reduce((acc, group) => acc + group.values.assessment, 0);
    const totalHardening = groups.reduce((acc, group) => acc + group.values.hardening, 0);
    const totalRollback = groups.reduce((acc, group) => acc + group.values.rollback, 0);

    const totalGroups = groups.length;

    const averageAssessment = totalAssessment / totalGroups;
    const averageHardening = totalHardening / totalGroups;
    const averageRollback = totalRollback / totalGroups;

    return (averageAssessment + averageHardening + averageRollback) / 3;
  };

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

  const average = selectedGroup === 0
    ? calculateAverageForAllGroups()
    : calculateAverageForGroup(selectedGroup);
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControl fullWidth>
            <InputLabel id="group-select-label">Seleccionar Grupo</InputLabel>
            <Select
              labelId="group-select-label"
              value={selectedGroup}
              label="Seleccionar Grupo"
              onChange={(e) => setSelectedGroup(Number(e.target.value))}
            >
              <MenuItem value={0} key={'all'}>Todos los grupos</MenuItem>
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
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </div>

        <Typography variant="subtitle1" align="center" style={{ marginTop: 16 }}>
          Average: {average.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ExecutionByGroup;
