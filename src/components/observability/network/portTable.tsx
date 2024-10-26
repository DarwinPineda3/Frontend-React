import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, TableContainer, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

const portData = [
  { port: 80, protocol: 'tcp', service: 'http', status: 'open' },
  { port: 443, protocol: 'tcp', service: 'https', status: 'open' },
];

const PortTable = () => {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table aria-label="port table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('observability.port')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('observability.protocol')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('observability.service')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('observability.status')}
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
