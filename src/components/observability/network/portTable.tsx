import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, TableContainer, Paper } from '@mui/material';

const portData = [
  { port: 80, protocol: 'tcp', service: 'http', status: 'open' },
  { port: 443, protocol: 'tcp', service: 'https', status: 'open' },
];

const PortTable = () => {
  return (
    <TableContainer>
      <Table aria-label="port table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Puerto
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Protocolo
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Servicio
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Estado
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body2">{row.port}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.protocol}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.service}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.status}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PortTable;
