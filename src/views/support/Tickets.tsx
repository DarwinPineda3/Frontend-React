import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import TicketList from '../../components/ticketform/TicketList';
import { TicketType } from '../../types/apps/ticket';

const Tickets: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              component={RouterLink}
              color="inherit"
              to="/support/tickets"
            >
              {t("menu.support")}
            </Link>
            <Link component={RouterLink} color="inherit" to="/support/tickets">
              {t("support.tickets_management")}
            </Link>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TicketList tickets={tickets} onDelete={handleDeleteTicket} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Tickets;
