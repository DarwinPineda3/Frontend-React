import { Cancel, CheckCircle } from '@mui/icons-material';
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
import SecurityinternetDetailModal from 'src/components/home/monitoring/cyber-guard/brand-monitoring/brand-monitoring-details/security-leaks/SecurityLeaksModal';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import { Internet } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';

interface InternetTableProps {
  internet: Internet[];
}

const InternetTable: React.FC<InternetTableProps> = ({ internet }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInternet, setSelectedInternet] = useState<Internet | null>(null);
  const highColor = theme.palette.level.high;
  const mediumColor = theme.palette.level.medium;
  const lowColor = theme.palette.level.low;
  const noneColor = theme.palette.level.none;
  const infoColor = theme.palette.level.unknown;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedInternet = internet.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleOpenModal = (internet: Internet) => {
    setSelectedInternet(internet);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedInternet(null);
  };

  const getChipColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'INFO':
        return { color: infoColor, label: t('monitoring.info') };
      case 'HIGH':
        return { color: highColor, label: t('monitoring.high') };
      case 'MEDIUM':
        return { color: mediumColor, label: t('monitoring.medium') };
      case 'LOW':
        return { color: lowColor, label: t('monitoring.low') };
      default:
        return { color: noneColor, label: 'N/A' };
    }
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="security internet table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('monitoring.data')}
                </Typography>
              </TableCell>
              {internet.some((item) => item.type === 'PHISHING_DOMAINS') && (
                <>
                  <TableCell>
                    <Typography align="center" variant="subtitle2" fontWeight={600}>
                      Domain Up
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Potential Risk
                    </Typography>
                  </TableCell>
                </>
              )}
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
            {displayedInternet.map((internet, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    onClick={() => handleOpenModal(internet)}
                    color="primary"
                    sx={{ cursor: 'pointer' }}
                  >
                    {internet.data.data || internet.data.title || 'NA'}
                    {internet.type === 'Correlations' && (
                      <Chip
                        label={getChipColor(internet.data.risk).label}
                        sx={{
                          backgroundColor: getChipColor(internet.data.risk).color,
                          color: 'white',
                          ml: '5px',
                        }}
                      />
                    )}
                  </Typography>
                </TableCell>
                {internet.type === 'PHISHING_DOMAINS' && (
                  <>
                    <TableCell align="center">
                      {internet.data?.domain_up ? (
                        <CheckCircle color="success" />
                      ) : (
                        <Cancel color="error" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {internet.data?.potential_risk || 'N/A'}
                      </Typography>
                    </TableCell>
                  </>
                )}
                <TableCell align="center">
                  <HumanizedDate dateString={internet.date} />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{internet.source}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={internet.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <SecurityinternetDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        data={selectedInternet ? selectedInternet.data : {}}
      />
    </>
  );
};

export default InternetTable;
