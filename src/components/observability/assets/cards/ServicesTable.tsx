import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  IconButton,
} from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import DashboardCard from 'src/components/shared/DashboardCard';

// Sample data for services
const serviceData = [
  { name: 'Servicio de usuario de Udk_1eb04700', status: 'running', type: 'Manual' },
  { name: 'PrintWorkflow_1eb04700', status: 'running', type: 'Manual' },
  { name: 'NPSMvc_1eb04700', status: 'running', type: 'Manual' },
  { name: 'DevicesFlow_1eb04700', status: 'running', type: 'Manual' },
  { name: 'Adaptador de rendimiento de WMI', status: 'running', type: 'Manual' },
  { name: 'Servicio de detección automática de proxy web WinHTTP', status: 'running', type: 'Manual' },
  { name: 'Servicio de defensa contra amenazas web', status: 'running', type: 'Manual' },
  { name: 'Cliente web', status: 'running', type: 'Manual' },
  { name: 'Host de sistema de diagnóstico', status: 'running', type: 'Manual' },
  { name: 'Host del servicio de diagnóstico', status: 'running', type: 'Manual' },
  { name: 'Servicio de proceso de host de Hyper-V', status: 'running', type: 'Manual' },
  { name: 'Administrador de credenciales', status: 'running', type: 'Manual' },
  { name: 'Administrador de cuentas web', status: 'running', type: 'Manual' },
  { name: 'Agente de eventos de tiempo', status: 'running', type: 'Manual' },
  { name: 'Servicio de protocolo de túnel de sockets seguros', status: 'running', type: 'Manual' },
  { name: 'Detección SSDP', status: 'running', type: 'Manual' },
];

const ServiceTable = () => {
  return (
    <DashboardCard title='Services'>
      <TableContainer >
        <Table aria-label="service table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Nombre del Servicio
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Estado
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tipo de Inicio
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceData.map((service, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="body2">{service.name}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton>
                    {service.status === 'running' ? (
                      <LocalFireDepartmentIcon style={{ color: 'green' }} />
                    ) : (
                      <LocalFireDepartmentIcon style={{ color: 'grey' }} />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{service.type}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default ServiceTable;
