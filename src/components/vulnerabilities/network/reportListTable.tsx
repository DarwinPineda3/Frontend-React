import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Grid,
  Chip,
} from '@mui/material';
import { IconSearch, IconDownload, IconTrash } from '@tabler/icons-react';
import DashboardCard from 'src/components/shared/DashboardCard';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import { useTranslation } from 'react-i18next';

interface ScanAlertTableProps {
  onAlertClick: (alertId: string) => void;
}


const ReportListTable: React.FC<ScanAlertTableProps> = ({ onAlertClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { t } = useTranslation();

  // Mock Data
  const alertData = [
    {
      id: 'OXWhSJiB_ou-DSKspxOR',
      reportDate: '1 de octubre de 2024 a las 09:08',
      severity: 5.0,
      status: 'Done',
    },
    {
      id: 'NnEluZEB_ou-DSKsxzcL',
      reportDate: '3 de septiembre de 2024 a las 12:27',
      severity: 5.0,
      status: 'Done',
    },
    {
      id: 'oXGuvpEB_ou-DSKsGVYh',
      reportDate: '4 de septiembre de 2024 a las 13:57',
      severity: 5.0,
      status: 'Done',
    },
  ];

  // Fulltext Search Filter
  const filteredAlerts = alertData.filter(
    (alert) =>
      alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.reportDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.severity.toString().includes(searchTerm.toLowerCase()) ||
      alert.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid container>
      <Breadcrumb title={t("vulnerabilities.test_scan_data")}>
        <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
          <Chip label={`${t("vulnerabilities.settings")}: Full and fast`} color="primary" variant="outlined" />
          <Chip label={`${t("vulnerabilities.type")}: 2`} color="secondary" variant="outlined" />
          <Chip label={`${t("vulnerabilities.objective")}: 107.173.154.73`} color="info" variant="outlined" />
        </Box>
      </Breadcrumb>

      <DashboardCard>
        <Box>
          {/* Search Bar */}
          <Box mb={3} my={3}>
            <TextField
              placeholder={t("vulnerabilities.search_alerts")!}
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconSearch size={18} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Alerts Table */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("vulnerabilities.id")}</TableCell>
                <TableCell>{t("vulnerabilities.report_date")}</TableCell>
                <TableCell>{t("vulnerabilities.severity")}</TableCell>
                <TableCell>{t("vulnerabilities.status")}</TableCell>
                <TableCell>{t("vulnerabilities.actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <Typography
                      color="primary"
                      fontWeight={500}
                      onClick={() => onAlertClick(alert.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {alert.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{alert.reportDate}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{alert.severity}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{alert.status}</Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={t("vulnerabilities.download_report")}>
                      <IconButton color="primary">
                        <IconDownload />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t("vulnerabilities.delete_report")}>
                      <IconButton color="error">
                        <IconTrash />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DashboardCard>
    </Grid>
  );
};

export default ReportListTable;
