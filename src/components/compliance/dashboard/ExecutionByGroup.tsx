import MenuIcon from '@mui/icons-material/Menu';
import { Card, CardContent, FormControl, IconButton, InputLabel, Menu, MenuItem, MenuItem as MuiMenuItem, Select, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Loader, { LoaderType } from 'src/components/shared/Loader/Loader';

const ExecutionByGroup: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const [groups, setGroups] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simular la carga de datos estáticos
    const fetchData = () => {
      setLoading(true);
      try {
        const exampleProjects = [
          { id: 1, name: 'Project 1' },
          { id: 2, name: 'Project 2' },
          { id: 3, name: 'Project 3' },
        ];

        const exampleGroups = [
          { id: 1, values: { assessment: 10, hardening: 5, rollback: 2 } },
          { id: 2, values: { assessment: 15, hardening: 10, rollback: 5 } },
          { id: 3, values: { assessment: 20, hardening: 15, rollback: 10 } },
        ];

        setProjects(exampleProjects);
        setGroups(exampleGroups);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (projects.length > 0) setSelectedGroup(projects[0]?.id || 0);
  }, [projects]);

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