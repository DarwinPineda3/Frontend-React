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
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { TicketType } from '../../types/apps/ticket';
import DashboardCard from '../shared/DashboardCard';

const TicketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Typography variant="h6" color="error">ID no encontrado</Typography>;
  }

  const ticket: TicketType | null = JSON.parse(localStorage.getItem('tickets') || '[]').find((t: TicketType) => t.Id === parseInt(id));

  if (!ticket) {
    return <Typography variant="h6" color="error">Ticket no encontrado</Typography>;
  }

  console.log('Attachment:', ticket.attachment); // Para verificar si el attachment está disponible

  return (
    <Box sx={{ padding: '16px', maxWidth: '800px', margin: 'auto' }}>
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
