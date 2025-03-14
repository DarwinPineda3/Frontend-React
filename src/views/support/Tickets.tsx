import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate, useParams} from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import TicketList from '../../components/ticketform/TicketList';
import { TicketType } from '../../types/apps/ticket';

const Tickets: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { selectedTicketId } = useParams<{ selectedTicketId?: string }>();
  const [tickets, setTickets] = useState<TicketType[]>([]);

  const [snackBarInfo, setSnackBarInfo] = useState<{
    color: 'error' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (location.state?.message) {
      setSnackBarInfo({
        color: location.state.severity || 'success',
        title: location.state.title || 'Información',
        message: location.state.message,
      });
    }

    const storedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(storedTickets);
  }, [location.state]);

  const handleDeleteTicket = (id: number) => {
    const updatedTickets = tickets.filter(ticket => ticket.Id !== id);
    setTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
  };

  return (
    <PageContainer title="Darwin's project">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/support/tickets">
              {t("menu.support")}
            </Link>
            {selectedTicketId ? (
              <Link
                component={RouterLink}
                color="inherit"
                to={`/support/tickets/${selectedTicketId}`}
              >
                {t("support.tickets_management")}
              </Link>
            ) : (
              <Typography color="textPrimary">{t("support.tickets_management")}</Typography>
            )}
            {selectedTicketId && (
              <Typography color="textPrimary">{selectedTicketId}</Typography>
            )}
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TicketList />
        </Grid>
      </Grid>

      {/* SnackBarInfo */}
      {snackBarInfo && (
        <SnackBarInfo
          color={snackBarInfo.color}
          title={snackBarInfo.title}
          message={snackBarInfo.message}
        />
      )}
    </PageContainer>
  );
};

export default Tickets;
