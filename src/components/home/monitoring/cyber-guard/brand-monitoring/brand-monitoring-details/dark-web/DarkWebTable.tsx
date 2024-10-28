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
import { DarkWeb } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import DarkWebDetailModal from 'src/components/home/monitoring/cyber-guard/brand-monitoring/brand-monitoring-details/security-leaks/SecurityLeaksModal'; 

interface DarkWebTableProps {
  dark_web: DarkWeb[];
}

const DarkWebTable: React.FC<DarkWebTableProps> = ({ dark_web }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLeak, setSelectedLeak] = useState<DarkWeb| null>(null);

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

  return (
    <>
      <TableContainer>
        <Table aria-label="security dark_web table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Data
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
            {displayedDarkWeb.map((dark_web, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    onClick={() => handleOpenModal(dark_web)}
                    color="primary"
                    sx={{ cursor: 'pointer'}}
                  >
                    {dark_web.data?.email || dark_web.data?.username || 'NA'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <HumanizedDate dateString={dark_web.date} />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{dark_web.source}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
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
        data={selectedLeak ? selectedLeak : {}}
      />
    </>
  );
};

export default DarkWebTable;