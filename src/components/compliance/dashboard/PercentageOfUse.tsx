import MenuIcon from '@mui/icons-material/Menu';
import { Card, CardContent, FormControl, IconButton, InputLabel, Menu, MenuItem, MenuItem as MuiMenuItem, Select, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchTemplatesUsage } from 'src/store/sections/compliance/giottoDashboardSlice';
import { useDispatch, useSelector } from 'src/store/Store';

const PercentageOfUse: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { TemplatesUsage: templates } = useSelector((state) => state.giottoDashboardSlice);

  const theme = useTheme();

  /*
  const fetchTemplatesData = async () => {
    try {
      const response = await fetch('http://201.149.34.143:8443/api/Charting/GetTemplatesUsage');
      const data = await response.json();
      const templatesWithIds = data.map((template, index) => ({
        id: index + 1,  
        name: template.templateName,
        usagePercent: template.usagePercent,
      }));
      setTemplates(templatesWithIds);
      setLoading(false); 
    } catch (error) {
      console.error('Error al obtener los datos de los templates:', error);
      setLoading(false);  
    }
  };
  */

  useEffect(() => {
    dispatch(fetchTemplatesUsage());
    setLoading(false);
    // fetchTemplatesData();
  }, [dispatch]);

  if (loading || !templates) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Loader />
        </CardContent>
      </Card>
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
          {loading ? (
            <Typography variant="h6" align="center">Cargando datos...</Typography>
          ) : (
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={350}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PercentageOfUse;
