import {
  Box,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchTickets, setPage } from 'src/store/support/FreshTicketsSlice';
// import DashboardCard from 'src/shared/DashboardCard';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../shared/DashboardCard';
import NoDataAvailable from 'src/views/general/NoDataAvailable';

const TicketList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tickets = useSelector((state: any) => state.ticketReducer.tickets);
  const currentPage = useSelector((state: any) => state.ticketReducer.page);
  const totalPages = useSelector((state: any) => state.ticketReducer.totalPages);


  useEffect(() => {
    dispatch(fetchTickets(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      dispatch(setPage(page));
    }
  };


  return (
    <DashboardCard title="Tickets" subtitle="List of available tickets"
      action={
        <IconButton color="primary" onClick={() => navigate('/support/ticketform')}>
          <AddIcon />
        </IconButton>
      }>
      <Box>
        <TableContainer>
          <Table aria-label="tickets table" sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Ticket ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Subject
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Description
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.length > 0 ? (
                tickets.map((ticket: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {ticket.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                        {ticket.subject}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                        {ticket.description_text}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>
                    <NoDataAvailable entityType="ticket" formUrl="/support/ticketform" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box my={3} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default TicketList;
