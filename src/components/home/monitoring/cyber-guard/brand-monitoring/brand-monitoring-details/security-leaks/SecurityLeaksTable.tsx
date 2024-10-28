import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  TablePagination,
} from '@mui/material';
import { SecurityLeak } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import SecurityLeakDetailModal from 'src/components/home/monitoring/cyber-guard/brand-monitoring/brand-monitoring-details/security-leaks/SecurityLeaksModal'; 

interface SecurityLeakTableProps {
  leaks: SecurityLeak[];
}

const SecurityLeakTable: React.FC<SecurityLeakTableProps> = ({ leaks }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLeak, setSelectedLeak] = useState<SecurityLeak| null>(null);

  const getChipColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
        return { color: '#EF0E0E', label: 'Critical' };
      case 'high':
        return { color: '#EF8E0E', label: 'High' };
      case 'medium':
        return { color: '#c9bc0d', label: 'Medium' };
      case 'low':
        return { color: '#329223', label: 'Low' };
      default:
        return { color: '#90CAF9', label: 'N/A' };
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

  return (
    <>
      <TableContainer>
        <Table aria-label="security leak table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Data
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  Risk Level
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Source
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
                    sx={{ cursor: 'pointer'}}
                  >
                    {leak.data.email || leak.data.name || leak.data.username || 'NA'}
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
                  <Typography variant="subtitle2">{leak.source}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
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