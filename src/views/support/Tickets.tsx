import React, { useState, useEffect } from 'react'; 
import { Box, Breadcrumbs, Link, IconButton } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import TicketList from '../../components/ticketform/Ticketlist';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TicketType } from '../../types/apps/ticket';

const Tickets: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketType[]>([]);

  useEffect(() => {
    // Cargar tickets desde el almacenamiento local
    const storedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(storedTickets);
  }, []);

  const handleDeleteTicket = (id: number) => {
    const updatedTickets = tickets.filter(ticket => ticket.Id !== id);
    setTickets(updatedTickets);
    // Actualizar el almacenamiento local
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component="button" onClick={() => navigate('/')} color="inherit" style={{ fontSize: 'inherit' }}>
            Home
          </Link>
          <Link component={RouterLink} color="inherit" to="/support/tickets">
                        tickets
                    </Link>
        </Breadcrumbs>
      </Box>

      <div style={{ marginTop: '20px' }}>
        <TicketList tickets={tickets} onDelete={handleDeleteTicket} />
      </div>
    </Box>
  );
};

export default Tickets;
