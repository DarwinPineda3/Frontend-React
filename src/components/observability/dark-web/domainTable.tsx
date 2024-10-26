import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Pagination,
  Button,
  IconButton,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import DashboardCard from 'src/components/shared/DashboardCard';

const burntData = [
  {
    status: 'Open',
    foundDate: '24/09/2024',
    domain: 'octapus.io',
    threat: 'octapush.io',
    phash: '0%',
    fuzzer: 'Addition',
    dnsNs: 1,
    mailExchange: 1,
    ipv4: 1,
  },
  {
    status: 'Open',
    foundDate: '24/09/2024',
    domain: 'octapus.io',
    threat: 'octepus.io',
    phash: '17%',
    fuzzer: 'Bitsquatting',
    dnsNs: 1,
    mailExchange: 0,
    ipv4: 1,
  },
  // Add more rows as needed
];

const rowsPerPage = 5;

const DomainTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const paginatedData = burntData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <DashboardCard>
            <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Domain</Typography>
        <Button variant="contained" color="primary">
          Export to CSV
        </Button>
      </Box>
      <TableContainer>
        <Table aria-label="domain table">
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Found Date</TableCell>
              <TableCell>Domain</TableCell>
              <TableCell>Threat</TableCell>
              <TableCell>Phash</TableCell>
              <TableCell>Fuzzer</TableCell>
              <TableCell>DNS NS</TableCell>
              <TableCell>Mail Exchange</TableCell>
              <TableCell>IPv4</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    endIcon={<KeyboardArrowDown />}
                  >
                    {row.status}
                  </Button>
                </TableCell>
                <TableCell>{row.foundDate}</TableCell>
                <TableCell>{row.domain}</TableCell>
                <TableCell>{row.threat}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small">
                    {row.phash}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="info" size="small">
                    {row.fuzzer}
                  </Button>
                </TableCell>
                <TableCell>{row.dnsNs}</TableCell>
                <TableCell>{row.mailExchange}</TableCell>
                <TableCell>{row.ipv4}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box my={3} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(burntData.length / rowsPerPage)}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
    </DashboardCard>
  );
};

export default DomainTable;
