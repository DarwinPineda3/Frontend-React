import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; 
import { Box, Breadcrumbs, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TicketFormComp from '../../components/ticketform/TicketFormComp';
import { useTranslation } from 'react-i18next';

const Tickets: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box>
      <Box display="flex" alignItems="center" mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <RouterLink to="/tickets" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography color="inherit">{t("support.tickets_management")}</Typography>
          </RouterLink>
          <Typography color="text.primary">{t("support.create_ticket")}</Typography>
        </Breadcrumbs>
      </Box>

      <h2>{t("support.ticket_form")}</h2>
      <TicketFormComp /> 
    </Box>
  );
};

export default Tickets;
