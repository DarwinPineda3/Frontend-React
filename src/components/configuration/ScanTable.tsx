import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Box,
  Pagination,
  Button,
  IconButton,
  Typography,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DashboardCard from '../shared/DashboardCard';
import { useNavigate } from 'react-router-dom';

interface Scan {
  id: string;
  name: string;
  scanType: string;
  frequency: string;
  executionTime: string;
  status: string;
}

interface ScansTableProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const ScansTable: React.FC<ScansTableProps> = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const [scans, setScans] = useState<Scan[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    const storedScans = JSON.parse(localStorage.getItem('scans') || '[]');
    setScans(storedScans);
  }, []);

  const filteredScans = scans.filter(scan =>
    scan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDelete = (id: string) => {
    const updatedScans = scans.filter(scan => scan.id !== id);
    setScans(updatedScans);
    localStorage.setItem('scans', JSON.stringify(updatedScans));
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedScans = filteredScans.slice(startIndex, endIndex);

  const addButton = (
    <IconButton color="primary" onClick={() => navigate('/configuration/schedule-scan')}>
      <AddIcon />
    </IconButton>
  );

  return (
    <DashboardCard title="Lista de Escaneos" action={addButton}>
      <Box>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            variant="outlined"
            placeholder="Buscar..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: '150px' }}
          />
        </Box>
        <TableContainer>
          <Table aria-label="scans table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>Nombre</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>Tipo de escaneo</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>Frecuencia de ejecución</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>Hora de ejecución</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>Estado</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>Acciones</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedScans.length > 0 ? (
                paginatedScans.map(scan => (
                  <TableRow key={scan.id}>
                    <TableCell align="center">
                      <Typography variant="subtitle2">{scan.name}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2">{scan.scanType}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2">{scan.frequency}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2">{scan.executionTime}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2">{scan.status}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="primary" size="small">Editar</Button>
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        size="small" 
                        sx={{ marginLeft: 1 }} 
                        onClick={() => handleDelete(scan.id)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body2">No se encontraron escaneos</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box my={3} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(filteredScans.length / rowsPerPage)}
            color="primary"
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default ScansTable;

