import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  IconAlertCircle,
  IconAlertOctagon,
  IconAlertTriangle,
  IconCheck,
  IconSearch,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Alert {
  risk: any;
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
    critical: alerts.filter((alert) => alert.risk.toLowerCase().includes('critical')).length,
    high: alerts.filter((alert) => alert.risk.toLowerCase().includes('high')).length,
    medium: alerts.filter((alert) => alert.risk.toLowerCase().includes('medium')).length,
    low: alerts.filter((alert) => alert.risk.toLowerCase().includes('low')).length,
  };

  const theme = useTheme();
  const { high, medium, low, critical } = theme.palette.level;

  const cardConfig: Record<string, { bgcolor: string; txtcolor: string; }> = {
    critical: { bgcolor: critical, txtcolor: '#ffffff' },
    high: { bgcolor: high, txtcolor: '#ffffff' },
    medium: { bgcolor: medium, txtcolor: '#ffffff' },
    low: { bgcolor: low, txtcolor: '#ffffff' },
  };

  const handleRiskFilter = (riskLevel: string) => {
    setSelectedRiskLevel((prev) => (prev === riskLevel ? null : riskLevel));
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRiskLevel = selectedRiskLevel
      ? alert.riskLevel.toLowerCase().includes(selectedRiskLevel.toLowerCase())
      : true;
    return matchesSearch && matchesRiskLevel;
  });

  const toggleSelectAlert = (alertId: number) => {
    setSelectedAlerts((prev) =>
      prev.includes(alertId) ? prev.filter((id) => id !== alertId) : [...prev, alertId],
    );
  };

  const handleDelete = () => setOpenDeleteDialog(true);
  const handleConfirmDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedAlerts([]);
  };
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const paginatedItems = (filteredAlerts || []).slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );


  return (
    <Box>
      {/* cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor={cardConfig.critical.bgcolor}
            p={3}
            onClick={() => handleRiskFilter('Critical')}
            sx={{ cursor: 'pointer' }}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor={cardConfig.critical.bgcolor}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color={cardConfig.critical.txtcolor}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
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
          <Box
            bgcolor={cardConfig.high.bgcolor}
            p={3}
            onClick={() => handleRiskFilter('High')}
            sx={{ cursor: 'pointer' }}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor={cardConfig.high.bgcolor}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color={cardConfig.high.txtcolor}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
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
          <Box
            bgcolor={cardConfig.medium.bgcolor}
            p={3}
            onClick={() => handleRiskFilter('Medium')}
            sx={{ cursor: 'pointer' }}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor={cardConfig.medium.bgcolor}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color={cardConfig.medium.txtcolor}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconAlertOctagon width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography color={cardConfig.medium.txtcolor}>
                  {t('vulnerabilities.medium')}
                </Typography>
                <Typography fontWeight={500} color={cardConfig.medium.txtcolor}>
                  {counts.medium} {t('vulnerabilities.alerts')}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor={cardConfig.low.bgcolor}
            p={3}
            onClick={() => handleRiskFilter('Low')}
            sx={{ cursor: 'pointer' }}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor={cardConfig.low.bgcolor}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color={cardConfig.low.txtcolor}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconCheck width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography color={cardConfig.low.txtcolor}>{t('vulnerabilities.low')}</Typography>
                <Typography fontWeight={500} color={cardConfig.low.txtcolor}>
                  {counts.low} {t('vulnerabilities.alerts')}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* search */}
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
            <TableCell>{t('vulnerabilities.name')}</TableCell>
            <TableCell>{t('vulnerabilities.risk_level')}</TableCell>
            <TableCell>{t('vulnerabilities.instances')}</TableCell>
            {/* <TableCell>{t('vulnerabilities.actions')}</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedItems.map((alert) => {
            const cleanRiskLevel = alert.riskLevel.split('(')[0].trim();

            return (
              <TableRow key={alert.id}>
                <TableCell>
                  <Typography
                    color="primary"
                    fontWeight={500}
                    onClick={() => onAlertClick(alert.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {alert.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={alert.risk}
                    style={{
                      backgroundColor: cardConfig[cleanRiskLevel.toLowerCase()]?.bgcolor,
                      color: cardConfig[cleanRiskLevel.toLowerCase()]?.txtcolor,
                    }}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography>{alert.instances}</Typography>
                </TableCell>
                {/* <TableCell>
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
        </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={(filteredAlerts || []).length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

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
