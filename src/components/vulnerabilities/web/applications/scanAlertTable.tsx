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
  Grid,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { IconSearch, IconEye, IconEdit, IconTrash, IconAlertCircle, IconAlertTriangle, IconAlertOctagon, IconCheck } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface Alert {
  id: number;
  name: string;
  riskLevel: string;
  instances: number;
  riskColor: string;
}

interface ScanAlertTableProps {
  alerts: Alert[];
  onAlertClick: (alertId: number) => void;
}

const ScanAlertTable: React.FC<ScanAlertTableProps> = ({ alerts, onAlertClick }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string | null>(null);
  const [selectedAlerts, setSelectedAlerts] = useState<number[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const counts = {
    critical: alerts.filter((alert) => alert.riskLevel.toLowerCase().includes('critical')).length,
    high: alerts.filter((alert) => alert.riskLevel.toLowerCase().includes('high')).length,
    medium: alerts.filter((alert) => alert.riskLevel.toLowerCase().includes('medium')).length,
    low: alerts.filter((alert) => alert.riskLevel.toLowerCase().includes('low')).length,
  };

  const handleRiskFilter = (riskLevel: string) => {
    setSelectedRiskLevel((prev) => (prev === riskLevel ? null : riskLevel));
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRiskLevel = selectedRiskLevel ? alert.riskLevel.toLowerCase().includes(selectedRiskLevel.toLowerCase()) : true;
    return matchesSearch && matchesRiskLevel;
  });

  const toggleSelectAlert = (alertId: number) => {
    setSelectedAlerts((prev) =>
      prev.includes(alertId) ? prev.filter((id) => id !== alertId) : [...prev, alertId]
    );
  };

  const handleDelete = () => setOpenDeleteDialog(true);
  const handleConfirmDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedAlerts([]);
  };
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <Box bgcolor="primary.light" p={3} onClick={() => handleRiskFilter('Critical')} sx={{ cursor: 'pointer' }}>
            <Stack direction="row" gap={2} alignItems="center">
              <Box width={38} height={38} bgcolor="primary.main" display="flex" alignItems="center" justifyContent="center">
                <Typography color="primary.contrastText" display="flex" alignItems="center" justifyContent="center">
                  <IconAlertCircle width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography color="background.default">{t('vulnerabilities.critical')}</Typography>
                <Typography fontWeight={500} color="background.default">
                  {counts.critical} {t('vulnerabilities.alerts')}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box bgcolor="secondary.light" p={3} onClick={() => handleRiskFilter('High')} sx={{ cursor: 'pointer' }}>
            <Stack direction="row" gap={2} alignItems="center">
              <Box width={38} height={38} bgcolor="secondary.main" display="flex" alignItems="center" justifyContent="center">
                <Typography color="background.default" display="flex" alignItems="center" justifyContent="center">
                  <IconAlertTriangle width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography color="background.default">{t('vulnerabilities.high')}</Typography>
                <Typography fontWeight={500} color="background.default">
                  {counts.high} {t('vulnerabilities.alerts')}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box bgcolor="error.light" p={3} onClick={() => handleRiskFilter('Medium')} sx={{ cursor: 'pointer' }}>
            <Stack direction="row" gap={2} alignItems="center">
              <Box width={38} height={38} bgcolor="error.main" display="flex" alignItems="center" justifyContent="center">
                <Typography color="primary.contrastText" display="flex" alignItems="center" justifyContent="center">
                  <IconAlertOctagon width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography color="error.main">{t('vulnerabilities.medium')}</Typography>
                <Typography fontWeight={500} color="error.main">
                  {counts.medium} {t('vulnerabilities.alerts')}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box bgcolor="warning.light" p={3} onClick={() => handleRiskFilter('Low')} sx={{ cursor: 'pointer' }}>
            <Stack direction="row" gap={2} alignItems="center">
              <Box width={38} height={38} bgcolor="warning.main" display="flex" alignItems="center" justifyContent="center">
                <Typography color="primary.contrastText" display="flex" alignItems="center" justifyContent="center">
                  <IconCheck width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography color="warning.main">{t('vulnerabilities.low')}</Typography>
                <Typography fontWeight={500} color="warning.main">
                  {counts.low} {t('vulnerabilities.alerts')}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <Box mb={3} my={3}>
        <TextField
          placeholder={t('vulnerabilities.search_alerts')!}
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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('vulnerabilities.select')}</TableCell>
            <TableCell>{t('vulnerabilities.name')}</TableCell>
            <TableCell>{t('vulnerabilities.risk_level')}</TableCell>
            <TableCell>{t('vulnerabilities.instances')}</TableCell>
            <TableCell>{t('vulnerabilities.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAlerts.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell padding="checkbox">
                <input type="checkbox" checked={selectedAlerts.includes(alert.id)} onChange={() => toggleSelectAlert(alert.id)} />
              </TableCell>
              <TableCell>
                <Typography color="primary" fontWeight={500} onClick={() => onAlertClick(alert.id)} style={{ cursor: 'pointer' }}>
                  {alert.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip label={alert.riskLevel} color={alert.riskColor} size="small" />
              </TableCell>
              <TableCell>
                <Typography>{alert.instances}</Typography>
              </TableCell>
              <TableCell>
                <Tooltip title={t('vulnerabilities.view_alert')}>
                  <IconButton onClick={() => onAlertClick(alert.id)} color="success">
                    <IconEye />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('vulnerabilities.edit_alert')}>
                  <IconButton color="warning">
                    <IconEdit />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('vulnerabilities.delete_alert')}>
                  <IconButton color="error" onClick={() => handleDelete()}>
                    <IconTrash />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{t('vulnerabilities.confirm_delete')}</DialogTitle>
        <DialogContent>{t('vulnerabilities.delete_confirmation_message')}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>{t('vulnerabilities.cancel')}</Button>
          <Button color="error" onClick={handleConfirmDelete}>
            {t('vulnerabilities.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ScanAlertTable;
