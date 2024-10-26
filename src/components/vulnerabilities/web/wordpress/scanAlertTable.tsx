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

interface Alert {
  id: string;
  name: string;
  riskLevel: string;
  instances: number;
  riskColor: string;
}

interface ScanAlertTableProps {
  alerts: Alert[];
  onAlertClick: (alertId: string) => void;
}

const ScanAlertTable: React.FC<ScanAlertTableProps> = ({ alerts, onAlertClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string | null>(null);
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Count alerts by risk level
  const counts = {
    critical: alerts.filter((alert) => alert.riskLevel.toLowerCase().includes('critical')).length,
    high: alerts.filter((alert) => alert.riskLevel.toLowerCase().includes('high')).length,
    medium: alerts.filter((alert) => alert.riskLevel.toLowerCase().includes('medium')).length,
    low: alerts.filter((alert) => alert.riskLevel.toLowerCase().includes('low')).length,
  };

  // Handle filtering by risk level
  const handleRiskFilter = (riskLevel: string) => {
    if (selectedRiskLevel === riskLevel) {
      setSelectedRiskLevel(null); // If the same card is tapped, show all alerts
    } else {
      setSelectedRiskLevel(riskLevel); // Set the filter to the selected risk level
    }
  };

  // Filter alerts based on search term and selected risk level
  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRiskLevel = selectedRiskLevel
      ? alert.riskLevel.toLowerCase().includes(selectedRiskLevel.toLowerCase())
      : true;
    return matchesSearch && matchesRiskLevel;
  });

  // Toggle individual alert selection
  const toggleSelectAlert = (alertId: string) => {
    setSelectedAlerts((prev) =>
      prev.includes(alertId) ? prev.filter((id) => id !== alertId) : [...prev, alertId]
    );
  };

  // Handle delete confirmation
  const handleDelete = () => setOpenDeleteDialog(true);
  const handleConfirmDelete = () => {
    // Logic for deleting alerts
    setOpenDeleteDialog(false);
    setSelectedAlerts([]);
  };
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  return (
    <Box>
      {/* Top Cards for filtering by risk level */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor="primary.light"
            p={3}
            onClick={() => handleRiskFilter('Critical')}
            sx={{ cursor: 'pointer' }}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor="primary.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color="primary.contrastText"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconAlertCircle width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography color="background.default">Critical</Typography>
                <Typography fontWeight={500} color="background.default">
                  {counts.critical} Alerts
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor="secondary.light"
            p={3}
            onClick={() => handleRiskFilter('High')}
            sx={{ cursor: 'pointer' }}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor="secondary.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color="background.default"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconAlertTriangle width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography color="background.default">High</Typography>
                <Typography fontWeight={500} color="background.default">
                  {counts.high} Alerts
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor="error.light"
            p={3}
            onClick={() => handleRiskFilter('Medium')}
            sx={{ cursor: 'pointer' }}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor="error.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color="primary.contrastText"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconAlertOctagon width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography color="error.main">Medium</Typography>
                <Typography fontWeight={500} color="error.main">
                  {counts.medium} Alerts
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor="warning.light"
            p={3}
            onClick={() => handleRiskFilter('Low')}
            sx={{ cursor: 'pointer' }}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor="warning.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color="primary.contrastText"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconCheck width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography color="warning.main">Low</Typography>
                <Typography fontWeight={500} color="warning.main">
                  {counts.low} Alerts
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* Search Bar */}
      <Box mb={3} my={3}>
        <TextField
          placeholder="Search Alerts"
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
            <TableCell>Select</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Risk Level1111</TableCell>
            <TableCell>Instances</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAlerts.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell padding="checkbox">
                <input
                  type="checkbox"
                  checked={selectedAlerts.includes(alert.id)}
                  onChange={() => toggleSelectAlert(alert.id)}
                />
              </TableCell>
              <TableCell >
                <Typography color="primary" fontWeight={500} onClick={()=>onAlertClick(alert.id)} style={{ cursor: 'pointer' }}>
                  {alert.name}
                </Typography>
              </TableCell>
              <TableCell>
                {/**@ts-ignore*/}
                <Chip label={alert.riskLevel} color={alert.riskColor} size="small" />
              </TableCell>
              <TableCell>
                <Typography>{alert.instances}</Typography>
              </TableCell>
              <TableCell>
                <Tooltip title="View Alert">
                  <IconButton onClick={() => onAlertClick(alert.id)} color="success">
                    <IconEye />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Alert">
                  <IconButton 
                        color="warning">
                    <IconEdit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Alert">
                  <IconButton color="error" onClick={() => handleDelete()}>
                    <IconTrash />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete the selected alerts?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ScanAlertTable;
