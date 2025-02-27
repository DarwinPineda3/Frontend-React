import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Breadcrumbs,
  Chip,
  Grid,
  IconButton,
  Link,
  Typography,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchTicketsById } from 'src/store/support/FreshTicketsSlice';
import PageContainer from '../container/PageContainer';
import Breadcrumb from '../shared/breadcrumb/Breadcrumb';
import DashboardCard from '../shared/DashboardCard';
import HumanizedDate from '../shared/HumanizedDate';
import Loader from '../shared/Loader/Loader';

const TicketDetail: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const ticket = useSelector((state: any) => state.ticketReducer.ticket);

  React.useEffect(() => {
    const fetchData = async () => {
      if (ticketId) {
        try {
          setIsLoading(true);
          await dispatch(fetchTicketsById(ticketId));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching ticket:', error);
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [ticketId, dispatch]);

  const theme = useTheme();
  const { high, medium, low, critical, unknown, none, info, purpleAlt } = theme.palette.level;

  return (
    <>
      <PageContainer title="Akila">
        <Box mb={2}>
          <Box display="flex" alignItems="center" mt={2}>
            <IconButton onClick={() => navigate(-1)} color="primary">
              <ArrowBackIcon />
            </IconButton>
            <Breadcrumbs aria-label="breadcrumb"> <Link component={RouterLink} color="inherit" to="/support/tickets">
              {t("menu.support")}
            </Link>
              <Link component={RouterLink} to="/support/tickets" color="inherit">
                Tickets
              </Link>
              <Typography color="textPrimary">{ticket.subject}</Typography>
            </Breadcrumbs>
          </Box>
        </Box>

        <Grid container spacing={1}>
          {isLoading ? (
            <Grid item xs={12} lg={12}>
              <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                <Loader />
              </Box>
            </Grid>
          ) : (
            <>
              <Grid item xs={12} lg={12}>
                <Breadcrumb title={`Ticket: ${ticket.subject}`}>
                  <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                    <Chip label={`${t("support.created")}: ${new Date(ticket.created_at).toLocaleString()}`} color="primary" variant="outlined" />
                    <Chip label={`${t("support.id")}: ${ticket.id}`} color="secondary" variant="outlined" />
                  </Box>
                </Breadcrumb>
              </Grid>

              <Grid item xs={12} xl={12}>
                <DashboardCard title={`${t('support.ticket_details')}`}>
                  <Box display="flex" flexDirection="column" gap={2} sx={{ minHeight: '16em' }}>
                    {/* <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('support.subject')!}
                      </Typography>
                      <Typography variant="body2">{ticket.subject}</Typography>
                    </Box> */}
                    <Box display="flex" alignItems="center" gap={4} flexWrap="wrap">
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {t('support.id')!}:
                        </Typography>
                        <Typography variant="body2">{ticket.id}</Typography>
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {t('support.status')!}:
                        </Typography>
                        <Chip
                          label={t(`support.${ticket.status === 2 ? 'open' :
                            ticket.status === 3 ? 'pending' :
                              ticket.status === 4 ? 'resolved' :
                                ticket.status === 5 ? 'closed' :
                                  ticket.status === 6 ? 'new' :
                                    ticket.status === 7 ? 'assigned' :
                                      'unknown'
                            }`)}
                          size="small"
                          style={{
                            backgroundColor:
                              ticket.status === 2 ? info :
                                ticket.status === 3 ? medium :
                                  ticket.status === 4 ? low :
                                    ticket.status === 5 ? none :
                                      ticket.status === 6 ? high :
                                        ticket.status === 7 ? purpleAlt :
                                          unknown,
                            color: '#fff',
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {t('support.priority')!}:
                        </Typography>
                        <Chip
                          label={t(`support.${ticket.priority === 1 ? 'low' : ticket.priority === 2 ? 'medium' : ticket.priority === 3 ? 'high' : 'urgent'}`)}
                          size="small"
                          style={{
                            backgroundColor:
                              ticket.priority === 1
                                ? low
                                : ticket.priority === 2
                                  ? medium
                                  : ticket.priority === 3
                                    ? high
                                    : critical,
                            color: '#fff',
                          }}
                        />
                      </Box>
                    </Box>


                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('support.description')!}
                      </Typography>
                      <Typography variant="body2" dangerouslySetInnerHTML={{ __html: ticket.description }} />
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t('support.created')!}
                      </Typography>
                      <Typography variant="body2">
                        <HumanizedDate dateString={ticket.created_at} />
                        <br />
                        {new Date(ticket.created_at).toLocaleString()}
                      </Typography>
                    </Box>

                    {ticket.attachments && ticket.attachments.length > 0 && (
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {t('support.attach_files')!}
                        </Typography>
                        {ticket.attachments.map((file: any, index: number) => (
                          <Box key={index}>
                            <a href={file.url} target="_blank" rel="noopener noreferrer">
                              <Typography color="primary">{file.filename}</Typography>
                            </a>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </DashboardCard>
              </Grid>
            </>

            
          )}
        </Grid>
      </PageContainer>
    </>
  );
};

export default TicketDetail;
