import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TicketList from '../../components/ticketform/Ticketlist';
import { TicketType } from '../../types/apps/ticket';
import { useTranslation } from 'react-i18next';

const Tickets: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketType[]>([]);

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(storedTickets);
  }, []);

  const handleDeleteTicket = (id: number) => {
    const updatedTickets = tickets.filter(ticket => ticket.Id !== id);
    setTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
  };

  return (
    <div>
      <h2>{t("support.tickets_management")}</h2>
      <Button variant="contained" color="primary" onClick={() => navigate('/support/ticketform')}>
        {t("support.create_new_ticket")}
      </Button>

      <div style={{ marginTop: '20px' }}>
        <TicketList tickets={tickets} onDelete={handleDeleteTicket} />
      </div>
    </div>
  );
};

export default Tickets;
