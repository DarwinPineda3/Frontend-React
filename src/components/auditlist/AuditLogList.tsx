import React, { useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Box,
  Pagination,
  IconButton,
  Dialog,
  DialogContent,
} from '@mui/material';

import DashboardCard from '../shared/DashboardCard';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';

interface LogEntry {
  date: string;
  route: string;
  ip: string;
  actionType: string;
  user: string;
  module: string;
}

const AuditLogList: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      date: '9 de julio de 2024 a las 13:26',
      route: '/assets-information/',
      ip: '189.147.142.199',
      actionType: 'LIST',
      user: 'pepito.perez@2secure.co',
      module: 'AGENT',
    },
    {
      date: '10 de julio de 2024 a las 14:15',
      route: '/user-login/',
      ip: '189.147.142.200',
      actionType: 'LOGIN',
      user: 'maria.perez@2secure.co',
      module: 'USER',
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
  const [openDialog, setOpenDialog] = useState(false);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const showSnackbar = (message: string, severity: 'success' | 'info' | 'warning' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleAddLog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  return (
    <DashboardCard
      title="List of Audit Logs"
      subtitle="Audit log details and actions"
      
      
    >
      <Box>
        <TableContainer>
          <Table aria-label="audit log table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Fecha de ejecución
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Ruta
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    IP
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Tipo acción
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Usuarios
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Módulo
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="subtitle2">{log.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2">{log.route}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2">{log.ip}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{log.actionType}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{log.user}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{log.module}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box my={3} display="flex" justifyContent={'center'}>
          <Pagination
            count={Math.ceil(logs.length / logsPerPage)}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>

        {/* Snackbar */}
        {snackbarOpen && (
          <SnackBarInfo
            color={snackbarSeverity}
            title="Operación"
            message={snackbarMessage}
          />
        )}
      </Box>
    </DashboardCard>
  );
};

export default AuditLogList;
