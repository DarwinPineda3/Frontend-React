import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Box,
  Button,
  Breadcrumbs,
  IconButton,
} from '@mui/material';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TicketType } from '../../types/apps/ticket';
import DashboardCard from '../shared/DashboardCard';

const TicketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return <Typography variant="h6" color="error">ID no encontrado</Typography>;
  }

  const ticket: TicketType | null = JSON.parse(localStorage.getItem('tickets') || '[]').find((t: TicketType) => t.Id === parseInt(id));

  if (!ticket) {
    return <Typography variant="h6" color="error">Ticket no encontrado</Typography>;
  }

  console.log('Attachment:', ticket.attachment); 

  return (
    <Box sx={{ padding: '16px', maxWidth: '1800px', margin: 'auto' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <RouterLink to="/tickets" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography color="inherit">Tickets</Typography>
          </RouterLink>
          <Typography color="text.primary">Detalles del Ticket</Typography>
        </Breadcrumbs>
      </Box>

      <DashboardCard title={`Detalles del Ticket: ${ticket.ticketTitle}`}>
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>Campo</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>Valor</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell><Typography>Id</Typography></TableCell>
                  <TableCell><Typography>{ticket.Id}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Asunto</Typography></TableCell>
                  <TableCell><Typography>{ticket.ticketTitle}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Categoría</Typography></TableCell>
                  <TableCell><Typography>{ticket.category}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Subcategoría</Typography></TableCell>
                  <TableCell><Typography>{ticket.Label}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Estado</Typography></TableCell>
                  <TableCell><Typography>{ticket.Status}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Urgencia</Typography></TableCell>
                  <TableCell><Typography>{ticket.urgency || 'No definido'}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Pendiente</Typography></TableCell>
                  <TableCell><Typography>{ticket.deleted ? 'Sí' : 'No'}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Descripción</Typography></TableCell>
                  <TableCell><Typography>{ticket.ticketDescription}</Typography></TableCell>
                </TableRow>
                {ticket.attachment && (
                  <TableRow>
                    <TableCell><Typography>Archivo Adjunto</Typography></TableCell>
                    <TableCell>
                      <a href={ticket.attachment} target="_blank" rel="noopener noreferrer">
                        <Typography color="primary">Ver Archivo</Typography>
                      </a>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box my={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={() => window.history.back()}>
              Regresar
            </Button>
          </Box>
        </>
      </DashboardCard>
    </Box>
  );
};

export default TicketDetail;
