import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchTicketsById } from 'src/store/support/FreshTicketsSlice';
import DashboardCard from '../shared/DashboardCard';

const TicketDetail: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const ticket = useSelector((state: any) => state.ticketReducer.ticket);

  React.useEffect(() => {
    const fetchData = async () => {
      if (ticketId) {
        try {
          setIsLoading(true);
          await dispatch(fetchTicketsById(ticketId));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching ticket:', error);
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [ticketId, dispatch]);

  if (isLoading) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  if (!ticket) {
    return <Typography variant="h6" color="error">No se encontró el ticket.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: '1200px', margin: 'auto' }}>
      <Box display="flex" alignItems="center" mb={3} mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/support/tickets" color="inherit">
            Tickets
          </Link>
          <Typography color="textPrimary">Detalles del Ticket</Typography>
        </Breadcrumbs>
      </Box>

      <DashboardCard title={`Detalles del Ticket: ${ticket.subject}`}>
        <Box>
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
                  <TableCell><Typography>ID</Typography></TableCell>
                  <TableCell><Typography>{ticket.id}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Asunto</Typography></TableCell>
                  <TableCell><Typography>{ticket.subject}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Categoría</Typography></TableCell>
                  <TableCell><Typography>{ticket.category || 'No definida'}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Subcategoría</Typography></TableCell>
                  <TableCell><Typography>{ticket.sub_category || 'No definida'}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Estado</Typography></TableCell>
                  <TableCell><Typography>{ticket.status}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Urgencia</Typography></TableCell>
                  <TableCell><Typography>{ticket.urgency}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Prioridad</Typography></TableCell>
                  <TableCell><Typography>{ticket.priority}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Impacto</Typography></TableCell>
                  <TableCell><Typography>{ticket.impact}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Descripción</Typography></TableCell>
                  <TableCell>
                    <Typography dangerouslySetInnerHTML={{ __html: ticket.description }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Solicitante</Typography></TableCell>
                  <TableCell><Typography>{ticket.requester_id}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Correo CC</Typography></TableCell>
                  <TableCell>
                    {ticket.cc_emails && ticket.cc_emails.length > 0 ? (
                      ticket.cc_emails.join(', ')
                    ) : (
                      <Typography>No hay correos en CC</Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Fecha de creación</Typography></TableCell>
                  <TableCell><Typography>{new Date(ticket.created_at).toLocaleString()}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>Fecha de actualización</Typography></TableCell>
                  <TableCell><Typography>{new Date(ticket.updated_at).toLocaleString()}</Typography></TableCell>
                </TableRow>
                {ticket.attachments && ticket.attachments.length > 0 && (
                  <TableRow>
                    <TableCell><Typography>Archivos Adjuntos</Typography></TableCell>
                    <TableCell>
                      {ticket.attachments.map((file: any, index: number) => (
                        <Box key={index}>
                          <a href={file.url} target="_blank" rel="noopener noreferrer">
                            <Typography color="primary">{file.filename}</Typography>
                          </a>
                        </Box>
                      ))}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DashboardCard>
    </Box>
  );
};

export default TicketDetail;
