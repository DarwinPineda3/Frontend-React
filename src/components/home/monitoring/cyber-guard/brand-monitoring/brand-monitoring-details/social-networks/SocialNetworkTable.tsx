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
import { SocialNetwork } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import HumanizedDate from 'src/components/shared/HumanizedDate';
import SecurityLeakDetailModal from 'src/components/home/monitoring/cyber-guard/brand-monitoring/brand-monitoring-details/security-leaks/SecurityLeaksModal'; 

interface SecurityLeakTableProps {
  social: SocialNetwork[];
}

const SocialNetworkTable: React.FC<SecurityLeakTableProps> = ({ social }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLeak, setSelectedLeak] = useState<SocialNetwork| null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedLeaks = social.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleOpenModal = (social: SocialNetwork) => {
    setSelectedLeak(social);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLeak(null);
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="security social table">
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
            {displayedLeaks.map((social, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    onClick={() => handleOpenModal(social)}
                    sx={{ cursor: 'pointer'}}
                  >
                    {social.data.user_fullname || social.data.username || 'NA'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <HumanizedDate dateString={social.date} />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{social.source}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={social.length}
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

export default SocialNetworkTable;