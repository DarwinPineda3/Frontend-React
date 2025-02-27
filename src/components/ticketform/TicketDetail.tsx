import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Breadcrumbs,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchTicketsById } from 'src/store/support/FreshTicketsSlice';
import DashboardCard from '../shared/DashboardCard';
import HumanizedDate from '../shared/HumanizedDate';

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

  if (isLoading) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  if (!ticket) {
    return <Typography variant="h6" color="error">No se encontró el ticket.</Typography>;
  }

  console.log(ticket);

  return (
    <Box sx={{ maxWidth: '1200px', margin: 'auto' }}>
      <Box display="flex" alignItems="center" mb={3} mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/support/tickets" color="inherit">
            Tickets
          </Link>
          <Typography color="textPrimary">{ticket.subject}</Typography>
        </Breadcrumbs>
      </Box>

      <DashboardCard title={`Detalles del Ticket: ${ticket.subject}`}>
        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>Campo</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>Valor</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell><Typography>{t('support.id')!}</Typography></TableCell>
                  <TableCell><Typography>{ticket.id}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>{t('support.subject')!}</Typography></TableCell>
                  <TableCell><Typography>{ticket.subject}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>{t('support.status')!}</Typography></TableCell>
                  <TableCell><Typography>{ticket.status}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>{t('support.urgency')!}</Typography></TableCell>
                  <TableCell><Typography>{ticket.urgency}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>{t('support.priority')!}</Typography></TableCell>
                  <TableCell><Typography>{ticket.priority}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>{t('support.impact')!}</Typography></TableCell>
                  <TableCell><Typography>{ticket.impact}</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>{t('support.description')!}</Typography></TableCell>
                  <TableCell>
                    <Typography dangerouslySetInnerHTML={{ __html: ticket.description }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Typography>{t('support.created')!}</Typography></TableCell>
                  <TableCell>
                    <Typography>
                      <HumanizedDate dateString={ticket.created_at} /><br/>
                      {new Date(ticket.created_at).toLocaleString()}
                    </Typography>
                  </TableCell>
                </TableRow>
                {ticket.attachments && ticket.attachments.length > 0 && (
                  <TableRow>
                    <TableCell><Typography>{t('support.attach_files')!}</Typography></TableCell>
                    <TableCell>
                      {ticket.attachments.map((file: any, index: number) => (
                        <Box key={index}>
                          <a href={file.url} target="_blank" rel="noopener noreferrer">
                            <Typography color="primary">{file.filename}</Typography>
                          </a>
                        </Box>
                      ))}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DashboardCard>
    </Box>
  );
};

export default TicketDetail;
