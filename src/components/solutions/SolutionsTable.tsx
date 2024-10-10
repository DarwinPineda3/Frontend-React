import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Box,
  Pagination,
  Link,
} from '@mui/material';

interface Solution {
  id: string;
  name: string;
  description: string;
}

const solutionsData: Solution[] = [
  { id: '10000088826', name: 'Monitoring', description: 'Support for monitoring module on Balam' },
  { id: '10000088842', name: 'Vulnerabilities', description: 'Sin descripción' },
  { id: '10000088845', name: 'Observability', description: 'Sin descripción' },
  { id: '10000088959', name: 'Settings', description: 'Sin descripción' },
  
];

interface SolutionsTableProps {
  searchTerm: string;
}

const SolutionsTable: React.FC<SolutionsTableProps> = ({ searchTerm }) => {
  const filteredSolutions = solutionsData.filter(solution =>
    solution.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const [page, setPage] = useState(1);
  const [rowsPerPage,] = useState(5); 

  useEffect(() => {
    
    setPage(1);
  }, [searchTerm]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedSolutions = filteredSolutions.slice(startIndex, endIndex);

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Lista de Soluciones
        </Typography>
        <TableContainer>
          <Table aria-label="solutions table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>ID</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>Nombre</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>Descripción</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSolutions.length > 0 ? (
                paginatedSolutions.map(solution => (
                  <TableRow key={solution.id}>
                    <TableCell align="center">
                      <Link 
                        href={`/support/solutions/${solution.id}/${solution.name}`} 
                        variant="body2"
                        underline="hover"
                        color="primary"
                      >
                        {solution.id}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2">{solution.name}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2">{solution.description}</Typography>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="body2">No se encontraron soluciones</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box my={3} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(filteredSolutions.length / rowsPerPage)}
            color="primary"
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SolutionsTable;
