import React, { useState } from 'react';
import {
  Typography,
  Box,
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useTranslation } from 'react-i18next';

// Mock Data
const scanData = [
  {
    id: 1,
    name: '107.173.154.73',
    status: 'Done',
    reports: 3,
    lastReport: '1 de octubre de 2024 a las 09:08',
    type: 'Full and fast',
    scanConfig: 'Configuration 1',
    targetHosts: '172.16.0.1',
  },
  {
    id: 2,
    name: 'Escaneo servidor 33',
    status: 'Done',
    reports: 2,
    lastReport: '4 de septiembre de 2024 a las 13:55',
    type: 'Standard',
    scanConfig: 'Configuration 2',
    targetHosts: '172.17.7.33',
  }
];

// Collapsible row
const Row: React.FC<{ row: any, onScanClick: (scanId: number) => void; }> = ({ row, onScanClick }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row.status}</Typography>
        </TableCell>
        <TableCell>
          <Chip
            label={row.reports}
            onClick={() => onScanClick(row.id)}
            style={{ cursor: 'pointer', color: 'blue' }}
            clickable
          />
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row.lastReport}</Typography>
        </TableCell>
        <TableCell>
          <IconButton color="primary">
            <PlayCircleOutlineIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="h6">{t("vulnerabilities.detailed_information")}:</Typography>
              <Typography variant="body2">
                <strong>{t("vulnerabilities.type")}:</strong> {row.type}
              </Typography>
              <Typography variant="body2">
                <strong>{t("vulnerabilities.scan_configuration")}:</strong> {row.scanConfig}
              </Typography>
              <Typography variant="body2">
                <strong>{t("vulnerabilities.target_hosts")}:</strong> {row.targetHosts}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

interface NetworkScanTableProps {
  onScanClick: (scanId: number) => void;
}

const NetworkScanTable: React.FC<NetworkScanTableProps> = ({ onScanClick }) => {
  const { t } = useTranslation();

  return (
    <DashboardCard title={t("vulnerabilities.scans")!} subtitle={t("vulnerabilities.list_of_all_scans")!}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t("vulnerabilities.name")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t("vulnerabilities.status")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t("vulnerabilities.reports")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t("vulnerabilities.last_report")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t("vulnerabilities.actions")}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scanData.map((row) => (
              <Row key={row.id} row={row} onScanClick={onScanClick} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default NetworkScanTable;
