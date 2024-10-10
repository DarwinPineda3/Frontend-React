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
  Paper,
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';

// Mock Data from JSON
const scanData = [
  {
    id: 1,
    provider: 'gcp',
    cloudId: '104892762537578212777',
    date: '27 de agosto de 2024 a las 19:00',
  },
  {
    id: 2,
    provider: 'aws',
    cloudId: 'AKIAU6GDVX2P643LZAIG',
    date: '27 de agosto de 2024 a las 18:58',
  },
  // Add more data if needed
];

interface CloudScanTableProps {
  onScanClick: (scanId: string) => void;
}

const CloudScanTable: React.FC<CloudScanTableProps> = ({ onScanClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Adjust this for how many rows you want per page

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Logic to paginate rows
  const paginatedData = scanData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <DashboardCard title="Scans" subtitle="List of all scans">
        <>
      <TableContainer >
        <Table aria-label="scan list table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Proveedor
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Cloud ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Fecha
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Typography variant="body2">{row.provider}</Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    color="primary"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onScanClick(row.cloudId)}
                  >
                    {row.cloudId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.date}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box my={3} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(scanData.length / rowsPerPage)}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
      </>
    </DashboardCard>
  );
};

export default CloudScanTable;
