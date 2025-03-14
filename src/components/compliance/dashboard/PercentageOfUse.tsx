import MenuIcon from '@mui/icons-material/Menu';
import { Box, Card, CardContent, FormControl, IconButton, InputLabel, Menu, MenuItem, MenuItem as MuiMenuItem, Select, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Loader from 'src/components/shared/Loader/Loader';
import { useDispatch } from 'src/store/Store';

const PercentageOfUse: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [templates, setTemplates] = useState<any[]>([]);

  const theme = useTheme();

  useEffect(() => {
    // Simular la carga de datos estáticos
    const exampleTemplates = [
      { id: 1, name: 'Template 1', usagePercent: 75 },
      { id: 2, name: 'Template 2', usagePercent: 85 },
      { id: 3, name: 'Template 3', usagePercent: 90 },
      { id: 4, name: 'Template 4', usagePercent: 60 },
    ];
    setTemplates(exampleTemplates);
    setLoading(false);
  }, []);

  if (loading || !templates) {
    return (
      <Box sx={{ height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
      </Box>
    );
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
      theme.palette.error.main,
    ],
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: ['Enabled Controls', 'Disabled Controls'],
    },
    yaxis: {
      title: {
        text: 'Percentage',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'Arial, Helvetica, sans-serif',
        },
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
    },
  };

  const chartSeries = [
    {
      name: 'Enabled Controls',
      data: [
        templates.find((template) => template.id === selectedTemplate)?.usagePercent || 0,
      ],
    },
    {
      name: 'Disabled Controls',
      data: [
        100 - (templates.find((template) => template.id === selectedTemplate)?.usagePercent || 0),
      ],
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

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControl fullWidth>
            <InputLabel id="template-select-label">Seleccionar Plantilla</InputLabel>
            <Select
              labelId="template-select-label"
              value={selectedTemplate}
              label="Seleccionar Plantilla"
              onChange={(e) => setSelectedTemplate(Number(e.target.value))}
              disabled={loading}
            >
              <MenuItem value={0}>Todas las plantillas</MenuItem>
              {templates.map((template) => (
                <MenuItem key={template.id} value={template.id}>
                  {template.name}
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
      </CardContent>
    </Card>
  );
};

export default PercentageOfUse;