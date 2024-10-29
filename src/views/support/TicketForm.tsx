import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; 
import { Box, Breadcrumbs, IconButton, Typography, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TicketFormComp from '../../components/ticketform/TicketFormComp';

const Tickets: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Box display="flex" alignItems="center" mt={2} mb={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/support/tickets" color="inherit">
            <Typography color="inherit">Tickets</Typography>
          </Link>
          <Typography color="textPrimary">Crear Ticket</Typography>
        </Breadcrumbs>
      </Box>

      <TicketFormComp /> 
    </div>
  );
};

export default Tickets;
