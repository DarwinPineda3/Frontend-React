import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, Typography, FormControl, InputLabel, MenuItem, Select, IconButton, Menu, MenuItem as MuiMenuItem } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const ExecutionByGroup: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Datos quemados
  const groups = [
    { id: 1, name: 'prueba de edición 2.2', values: { assessment: 12, hardening: 7, rollback: 1 } },
    { id: 2, name: 'Grupo Test', values: { assessment: 10, hardening: 5, rollback: 3 } },
    { id: 3, name: 'Grupo Demo', values: { assessment: 8, hardening: 6, rollback: 2 } },
  ];

  // useEffect(() => {
  //   const fetchGroupsData = async () => {
  //     try {
  //       const response = await fetch('http://201.149.34.143:8443/api/Charting/GetGroupsExecutionsByProject/1');
  //       const data = await response.json();
  //       const transformedData = data.map((group: any) => ({
  //         id: group.groupId,
  //         name: group.groupName,
  //         values: {
  //           assessment: group.assessmentExecutionsCount,
  //           hardening: group.hardeningExecutionsCount,
  //           rollback: group.rollbackExecutionsCount,
  //         },
  //       }));
  //       setGroups(transformedData); 
  //     } catch (error) {
  //       console.error('Error fetching group data:', error);
  //     }
  //   };

  //   fetchGroupsData();
  // }, []);

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
        groups.find((group) => group.id === selectedGroup)?.values.assessment || 0,
      ],
    },
    {
      name: 'Hardening',
      data: [
        groups.find((group) => group.id === selectedGroup)?.values.hardening || 0,
      ],
    },
    {
      name: 'Rollback',
      data: [
        groups.find((group) => group.id === selectedGroup)?.values.rollback || 0,
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
              <MenuItem value={0}>Todos los grupos</MenuItem>
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
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
