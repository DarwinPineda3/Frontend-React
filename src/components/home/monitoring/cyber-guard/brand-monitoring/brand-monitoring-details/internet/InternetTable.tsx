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
import { Internet } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import SecurityinternetDetailModal from 'src/components/home/monitoring/cyber-guard/brand-monitoring/brand-monitoring-details/security-leaks/SecurityLeaksModal'; 

interface InternetTableProps {
  internet: Internet[];
}

const InternetTable: React.FC<InternetTableProps> = ({ internet }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInternet, setSelectedInternet] = useState<Internet| null>(null);

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

  return (
    <>
      <TableContainer>
        <Table aria-label="security internet table">
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
            {displayedInternet.map((internet, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    onClick={() => handleOpenModal(internet)}
                    sx={{ cursor: 'pointer'}}
                  >
                    {internet.data.data || internet.data.title || 'NA'}
                  </Typography>
                </TableCell>
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
        rowsPerPageOptions={[5, 10, 25]}
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