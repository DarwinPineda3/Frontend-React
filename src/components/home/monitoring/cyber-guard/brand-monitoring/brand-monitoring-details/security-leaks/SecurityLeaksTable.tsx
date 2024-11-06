import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SecurityLeakDetailModal from 'src/components/home/monitoring/cyber-guard/brand-monitoring/brand-monitoring-details/security-leaks/SecurityLeaksModal';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import { SecurityLeak } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';

interface SecurityLeakTableProps {
  leaks: SecurityLeak[];
  category: string;
}

const SecurityLeakTable: React.FC<SecurityLeakTableProps> = ({ leaks, category }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLeak, setSelectedLeak] = useState<SecurityLeak | null>(null);
  const criticalColor = theme.palette.level.critical;
  const highColor = theme.palette.level.high;
  const mediumColor = theme.palette.level.medium;
  const lowColor = theme.palette.level.low;
  const noneColor = theme.palette.level.none;

  const getChipColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
        return { color: criticalColor, label: t('monitoring.critical') };
      case 'high':
        return { color: highColor, label: t('monitoring.high') };
      case 'medium':
        return { color: mediumColor, label: t('monitoring.medium') };
      case 'low':
        return { color: lowColor, label: t('monitoring.low') };
      default:
        return { color: noneColor, label: 'N/A' };
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedLeaks = leaks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleOpenModal = (leak: SecurityLeak) => {
    setSelectedLeak(leak);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLeak(null);
  };

  const getCategoryData = (leak: SecurityLeak) => {
    switch (category) {
      case 'Domains':
        return Array.isArray(leak.data.domain) && leak.data.domain.length > 0
          ? leak.data.domain.join(', ')
          : 'NA';
      case 'Emails':
        return Array.isArray(leak.data.email) && leak.data.email.length > 0
          ? leak.data.email.join(', ')
          : 'NA';
      case 'IPs':
        return Array.isArray(leak.data.ip_address) && leak.data.ip_address.length > 0
          ? leak.data.ip_address.join(', ')
          : 'NA';
      case 'Usernames':
        if (Array.isArray(leak.data.username) && leak.data.username.length > 0) {
          return leak.data.username.join(', ');
        }
        return leak.data.name || 'NA';
      case 'Phones':
        return Array.isArray(leak.data.phone) && leak.data.phone.length > 0
          ? leak.data.phone.join(', ')
          : 'NA';
      default:
        return 'NA';
    }
  };

  const getDatabaseNames = (leak: SecurityLeak) => {
    const dbNames = leak.data.database_name;
    return Array.isArray(dbNames) ? dbNames.join(', ') : dbNames;
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="security leak table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('monitoring.data')}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('monitoring.risk_level')}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('monitoring.date')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('monitoring.source')}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedLeaks.map((leak, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    onClick={() => handleOpenModal(leak)}
                    color="primary"
                    sx={{ cursor: 'pointer' }}
                  >
                    {getCategoryData(leak) || 'NA'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={getChipColor(leak.risk_level).label}
                    sx={{
                      backgroundColor: getChipColor(leak.risk_level).color,
                      color: 'white',
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <HumanizedDate dateString={leak.date} />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{getDatabaseNames(leak) || 'N/A'}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={leaks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <SecurityLeakDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        data={selectedLeak ? selectedLeak.data : {}}
      />
    </>
  );
};

export default SecurityLeakTable;