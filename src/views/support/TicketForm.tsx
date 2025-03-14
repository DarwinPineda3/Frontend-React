import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import TicketFormComp from 'src/components/ticketform/TicketFormComp';

const Tickets: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageContainer title="Darwin's project">
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
              <Typography color="inherit">{t("support.tickets_management")}</Typography>
            </Link>
            <Typography color="text.primary">{t("support.create_ticket")}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TicketFormComp />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Tickets;
