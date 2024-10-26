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
  IconButton,
  Button,
  TextField,
} from '@mui/material';
import { Dashboard, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import DashboardCard from 'src/components/shared/DashboardCard';

const burntData = [
  { status: 'Open', lastSeen: '17/03/2024', username: 'aordonez', domain: 'gmail.com', email: 'aordonez@gmail.com', password: '***************', name: 'anna ordonez', dbName: 'instagram.com', foundIn: 'multiple sources', source: 'Dark web API' },
  { status: 'Open', lastSeen: '17/03/2024', username: 'aordonez', domain: 'hotmail.com', email: 'abel_ordonez_romero@hotmail.com', password: '***b', name: 'abel ordonez', dbName: 'taringa', foundIn: 'multiple sources', source: 'Dark web API' },
  { status: 'Open', lastSeen: '17/03/2024', username: 'aordonez', domain: 'gmail.com', email: 'aordonez92@gmail.com', password: '***************', name: 'anna ordonez', dbName: 'lastfm', foundIn: 'multiple sources', source: 'Dark web API' },
  { status: 'Open', lastSeen: '17/03/2024', username: 'aordonez', domain: 'infocorp.com.pe', email: 'aordonez@infocorp.com.pe', password: '***d', name: 'alex ordonez', dbName: 'htcmania', foundIn: 'multiple sources', source: 'Dark web API' },
];

const rowsPerPage = 5;

const UsernamesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = burntData.filter(
    (row) =>
      row.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <DashboardCard>
        
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Usernames</Typography>
        <Button variant="contained" color="primary">
          Export to CSV
        </Button>
      </Box>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search by username, email, or domain"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '16px' }}
      />
      <TableContainer>
        <Table aria-label="usernames table">
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Last Seen</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Domain</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password/Hash</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Database Name</TableCell>
              <TableCell>Found In</TableCell>
              <TableCell>Source</TableCell>
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
                <TableCell>{row.lastSeen}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.domain}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.password}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.dbName}</TableCell>
                <TableCell>{row.foundIn}</TableCell>
                <TableCell>{row.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box my={3} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredData.length / rowsPerPage)}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
    </DashboardCard>
  );
};

export default UsernamesTable;
