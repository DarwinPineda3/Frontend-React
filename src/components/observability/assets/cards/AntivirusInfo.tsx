import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Box } from '@mui/material';
import { Dashboard } from '@mui/icons-material';
import DashboardCard from 'src/components/shared/DashboardCard';

const AntivirusTable = () => {
  const antivirusData = [
    {
      name: 'Sophos Intercept X',
      guide: '4473250D-283A-D88E-89A5-EEB3104F258F',
      productPath: 'C:\\Program Files\\Sophos\\Endpoint Defense\\SEDcli.exe',
      reportPath: 'C:\\Program Files\\Sophos\\Endpoint Defense\\SEDService.exe',
      status: '266240',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Sophos_logo.png',
    },
    {
      name: 'Sophos Intercept X',
      guide: '0E83324C-6B63-2B0B-AB0A-8AD0D3F6C09E',
      productPath: 'C:\\Program Files\\Sophos\\Endpoint Defense\\SEDcli.exe',
      reportPath: 'C:\\Program Files\\Sophos\\Endpoint Defense\\SEDService.exe',
      status: '266240',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Sophos_logo.png',
    },
    {
      name: 'Sophos Intercept X',
      guide: '7D604651-DE03-26C6-A29F-73C4A1CB45DB',
      productPath: 'C:\\Program Files\\Sophos\\Endpoint Defense\\SEDcli.exe',
      reportPath: 'C:\\Program Files\\Sophos\\Endpoint Defense\\SEDService.exe',
      status: '266240',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Sophos_logo.png',
    },
  ];

  return (
    <DashboardCard title='Antivirus Info'>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Logo</TableCell>
            <TableCell>Antivirus Instalados</TableCell>
            <TableCell>Guía de Instancia</TableCell>
            <TableCell>Ruta al Archivo Ejecutable del Producto Firmado</TableCell>
            <TableCell>Ruta al Archivo Ejecutable de Informes Firmado</TableCell>
            <TableCell>Estado del Producto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {antivirusData.map((antivirus, index) => (
            <TableRow key={index}>
              <TableCell>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <img src={antivirus.logoUrl} alt={`${antivirus.name} Logo`} width={50} height={50} />
                </Box>
              </TableCell>
              <TableCell>{antivirus.name}</TableCell>
              <TableCell>{antivirus.guide}</TableCell>
              <TableCell>{antivirus.productPath}</TableCell>
              <TableCell>{antivirus.reportPath}</TableCell>
              <TableCell>{antivirus.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </DashboardCard>
  );
};

export default AntivirusTable;
