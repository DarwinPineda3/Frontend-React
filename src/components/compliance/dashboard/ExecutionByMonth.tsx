import MenuIcon from '@mui/icons-material/Menu';
import { Card, CardContent, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Loader, { LoaderType } from 'src/components/shared/Loader/Loader';

const ExecutionByMonth: React.FC = () => {
  const theme = useTheme();
  const [selectedProject, setSelectedProject] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dataByMonth, setDataByMonth] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simular la carga de datos estáticos
    const fetchData = () => {
      setLoading(true);
      try {
        const exampleData = [
          { month: 'Jan', assessmentExecutionsCount: 10, hardeningExecutionsCount: 5, rollbackExecutionsCount: 2 },
          { month: 'Feb', assessmentExecutionsCount: 15, hardeningExecutionsCount: 10, rollbackExecutionsCount: 5 },
          { month: 'Mar', assessmentExecutionsCount: 20, hardeningExecutionsCount: 15, rollbackExecutionsCount: 10 },
          { month: 'Apr', assessmentExecutionsCount: 25, hardeningExecutionsCount: 20, rollbackExecutionsCount: 15 },
          { month: 'May', assessmentExecutionsCount: 30, hardeningExecutionsCount: 25, rollbackExecutionsCount: 20 },
          { month: 'Jun', assessmentExecutionsCount: 35, hardeningExecutionsCount: 30, rollbackExecutionsCount: 25 },
          { month: 'Jul', assessmentExecutionsCount: 40, hardeningExecutionsCount: 35, rollbackExecutionsCount: 30 },
          { month: 'Aug', assessmentExecutionsCount: 45, hardeningExecutionsCount: 40, rollbackExecutionsCount: 35 },
          { month: 'Sep', assessmentExecutionsCount: 50, hardeningExecutionsCount: 45, rollbackExecutionsCount: 40 },
          { month: 'Oct', assessmentExecutionsCount: 55, hardeningExecutionsCount: 50, rollbackExecutionsCount: 45 },
          { month: 'Nov', assessmentExecutionsCount: 60, hardeningExecutionsCount: 55, rollbackExecutionsCount: 50 },
          { month: 'Dec', assessmentExecutionsCount: 65, hardeningExecutionsCount: 60, rollbackExecutionsCount: 55 },
        ];
        setDataByMonth(exampleData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader type={LoaderType.Contained} />;
  }

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: false },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
    ],
    xaxis: {
      categories: dataByMonth.map((data) => data.month),
    },
    yaxis: {
      min: 0,
      max: Math.max(
        ...dataByMonth.map((data) => Math.max(data.assessmentExecutionsCount, data.hardeningExecutionsCount, data.rollbackExecutionsCount))
      ),
      tickAmount: 6,
      labels: {
        formatter: function (val) {
          return `${val.toFixed(1)}`;
        }
      },
      title: {
        text: 'Cantidad de Ejecuciones',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'Arial, Helvetica, sans-serif',
        },
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const chartSeries = [
    {
      name: 'Assessment',
      data: dataByMonth.map((data) => data.assessmentExecutionsCount),
    },
    {
      name: 'Hardening',
      data: dataByMonth.map((data) => data.hardeningExecutionsCount),
    },
    {
      name: 'Rollback',
      data: dataByMonth.map((data) => data.rollbackExecutionsCount),
    },
  ];

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
              <MenuItem value={1}>Assessment</MenuItem>
              <MenuItem value={2}>Hardening</MenuItem>
              <MenuItem value={3}>Rollback</MenuItem>
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

        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
          {loading ? (
            <Typography variant="h6" align="center">Cargando datos...</Typography>
          ) : (
            <Chart
              options={chartOptions}
              series={selectedProject === 0 ? chartSeries : [chartSeries[selectedProject - 1]]}
              type="line"
              height={350}
            />
          )}
        </div>

        <Typography variant="subtitle1" align="center" style={{ marginTop: 16 }}>
          {selectedProject === 0
            ? ((dataByMonth.reduce((acc, data) => acc + data.assessmentExecutionsCount + data.hardeningExecutionsCount + data.rollbackExecutionsCount, 0) / (dataByMonth.length * 3)).toFixed(2))
            : (dataByMonth[selectedProject - 1]?.assessmentExecutionsCount || 0).toFixed(3)}%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ExecutionByMonth;