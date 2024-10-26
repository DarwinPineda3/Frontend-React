import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TicketList from '../../components/ticketform/Ticketlist';
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
    <div>
      <h2>Tickets Management</h2>
      <Button variant="contained" color="primary" onClick={() => navigate('/support/ticketform')}>
        Crear Nuevo Ticket
      </Button>

      <div style={{ marginTop: '20px' }}>
        <TicketList tickets={tickets} onDelete={handleDeleteTicket} />
      </div>
    </div>
  );
};

export default Tickets;
