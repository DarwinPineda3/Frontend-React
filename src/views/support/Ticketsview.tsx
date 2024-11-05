import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TicketList from '../../components/ticketform/TicketList';
import { TicketType } from '../../types/apps/ticket';

const TicketsView = () => {
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
      <h1>{t("support.tickets_management")}</h1>
      <Button variant="contained" color="primary" onClick={() => navigate('/support/ticketform')}>
        {t("support.create_new_ticket")}
      </Button>

      <div style={{ marginTop: '20px' }}>
        <TicketList tickets={tickets} onDelete={handleDeleteTicket} />
      </div>
    </div>
  );
};

export default TicketsView;
