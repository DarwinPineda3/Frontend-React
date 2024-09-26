import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  TableContainer,
  Box,
  Pagination,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardCard from 'src/components/shared/DashboardCard';

const burntScansData = [
  {
    id: 1,
    name: 'Octapus Sep',
    host: 'https://octapus.io',
    date: '3 de septiembre de 2024 a las 12:28',
    type: 'passive_scan',
    progress: 100,
    progressTime: 'hace 3 semanas',
  },
  {
    id: 2,
    name: 'Octapus IO 26 agosto',
    host: 'https://octapus.io',
    date: '26 de agosto de 2024 a las 17:08',
    type: 'passive_scan',
    progress: 100,
    progressTime: 'hace 4 semanas, 1 día',
  },
  {
    id: 3,
    name: 'Tu pala',
    host: 'https://prueba-tu-pala.ofertasdepadel.com/',
    date: '26 de agosto de 2024 a las 14:54',
    type: 'passive_scan',
    progress: 100,
    progressTime: 'hace 4 semanas, 1 día',
  },
  // Add more data similar to this for the other rows in the image
];

interface ScanListTableProps {
  onScanClick: (scanId: number) => void;
}

const ScanListTable: React.FC<ScanListTableProps> = ({ onScanClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1; // Set this according to how many pages of burnt data you want

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleDownload = (scanId: number) => {
    console.log(`Downloading scan ${scanId}`);
  };

  const handleDelete = (scanId: number) => {
    console.log(`Deleting scan ${scanId}`);
  };

  return (
    <Box>
            <DashboardCard title="Scans" subtitle="List of all scans">
      <Box >
        <TableContainer>
          <Table aria-label="scan list table" >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Nombre
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Hosts
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Fecha
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Tipo
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Progreso
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Acciones
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {burntScansData.map((scan, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="primary"
                      component="a"
                      onClick={() => onScanClick(scan.id)} // Trigger the parent callback
                      style={{ cursor: 'pointer' }}
                    >
                      {scan.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{scan.host}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{scan.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{scan.type}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{`${scan.progress}%`}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {scan.progressTime}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleDownload(scan.id)}>
                      <DownloadIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(scan.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box my={3} display="flex" justifyContent={'center'}>
          <Pagination
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </DashboardCard>
    </Box>

  );
};

export default ScanListTable;
