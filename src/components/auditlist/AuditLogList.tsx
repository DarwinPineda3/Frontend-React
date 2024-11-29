import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import DashboardCard from '../shared/DashboardCard';

interface LogEntry {
  date: string;
  route: string;
  ip: string;
  actionType: string;
  user: string;
  module: string;
}

const AuditLogList: React.FC = () => {
  const { t } = useTranslation();
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
  const [logsPerPage] = useState(25);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');

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

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  return (
    <DashboardCard
      title={t("audit.list_of_audit_logs") as string}
      subtitle={t("audit.audit_log_details_and_actions") as string}
    >
      <Box>
        <TableContainer>
          <Table aria-label="audit log table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("audit.execution_date")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("audit.route")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("audit.ip")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("audit.action_type")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("audit.user")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("audit.module")}
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

        {snackbarOpen && (
          <SnackBarInfo
            color={snackbarSeverity}
            title={t("audit.operation")}
            message={snackbarMessage}
          />
        )}
      </Box>
    </DashboardCard>
  );
};

export default AuditLogList;
