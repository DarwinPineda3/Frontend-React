import {
  Badge,
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
import DarkWebDetailModal from 'src/components/home/monitoring/cyber-guard/brand-monitoring/brand-monitoring-details/security-leaks/SecurityLeaksModal';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import { DarkWeb } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import { getChipColor } from 'src/utils/severityUtils';

interface DarkWebTableProps {
  dark_web: DarkWeb[];
  category: string;
}

const DarkWebTable: React.FC<DarkWebTableProps> = ({ dark_web, category }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLeak, setSelectedLeak] = useState<DarkWeb | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedDarkWeb = dark_web.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleOpenModal = (dark_web: DarkWeb) => {
    setSelectedLeak(dark_web);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLeak(null);
  };

  const getCategoryData = (dark_web: DarkWeb) => {
    switch (category) {
      case 'Domains':
        return Array.isArray(dark_web.data.domain) && dark_web.data.domain.length > 0
          ? dark_web.data.domain.join(', ')
          : 'NA';
      case 'Emails':
        return Array.isArray(dark_web.data.email) && dark_web.data.email.length > 0
          ? dark_web.data.email.join(', ')
          : 'NA';
      case 'IPs':
        return Array.isArray(dark_web.data.ip_address) && dark_web.data.ip_address.length > 0
          ? dark_web.data.ip_address.join(', ')
          : 'NA';
      case 'Usernames':
        if (Array.isArray(dark_web.data.username) && dark_web.data.username.length > 0) {
          return dark_web.data.username.join(', ');
        }
        return dark_web.data.name || 'NA';
      case 'Phones':
        return Array.isArray(dark_web.data.phone) && dark_web.data.phone.length > 0
          ? dark_web.data.phone.join(', ')
          : 'NA';
      default:
        return 'NA';
    }
  };

  const getDatabaseNames = (leak: DarkWeb) => {
    const dbNames = leak.data.database_name;
    return Array.isArray(dbNames) ? dbNames.join(', ') : dbNames;
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="security dark_web table">
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
            {displayedDarkWeb.map((dark_web, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    onClick={() => handleOpenModal(dark_web)}
                    color="primary"
                    sx={{ cursor: 'pointer' }}
                  >
                    {getCategoryData(dark_web) || 'NA'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={getChipColor(dark_web.risk_level, theme, t).label}
                    sx={{
                      backgroundColor: getChipColor(dark_web.risk_level, theme, t).color,
                      color: 'white',
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <HumanizedDate dateString={dark_web.date} />
                  {dark_web.data_new && (
                    <Badge badgeContent={'New'} color="primary" sx={{ ml: 3 }} />
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    {getDatabaseNames(dark_web) || dark_web.data.domain || 'NA'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={dark_web.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <DarkWebDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        data={selectedLeak ? selectedLeak.data : {}}
      />
    </>
  );
};

export default DarkWebTable;
