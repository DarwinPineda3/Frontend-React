import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; 
import { Box, Breadcrumbs, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TicketFormComp from '../../components/ticketform/TicketFormComp';

const Tickets: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box display="flex" alignItems="center" mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <RouterLink to="/tickets" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography color="inherit">Tickets Management</Typography>
          </RouterLink>
          <Typography color="text.primary">Create Ticket</Typography>
        </Breadcrumbs>
      </Box>

      <h2>Ticket Form</h2>
      <TicketFormComp /> 
    </Box>
  );
};

export default Tickets;
