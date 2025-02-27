import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchTickets, setPage, setPageSize } from 'src/store/support/FreshTicketsSlice';
// import DashboardCard from 'src/shared/DashboardCard';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import NoDataAvailable from 'src/views/general/NoDataAvailable';
import DashboardCard from '../shared/DashboardCard';
import HumanizedDate from '../shared/HumanizedDate';


const TicketList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tickets = useSelector((state: any) => state.ticketReducer.tickets);
  const page = useSelector((state: any) => state.ticketReducer.page);
  const pageSize = useSelector((state: any) => state.ticketReducer.pageSize);
  const totalPages = useSelector((state: any) => state.ticketReducer.totalPages);

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTickets(page, pageSize));
    };
    fetchData();
  }, [dispatch, page, pageSize]);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    pageEntrie: number,
  ) => {
    const newPage = pageEntrie + 1;
    if (newPage !== page) {
      dispatch(setPage(newPage));
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newPageSize = event.target.value as number;
    dispatch(setPageSize(newPageSize));
    dispatch(setPage(1));
  };

  const handleTicketClick = (ticketId: string) => {
    navigate(`/support/ticket/${ticketId}`);
  };


  return (
    <DashboardCard title={t('support.tickets_management')!} subtitle={t('support.tickets_subtitle')!}
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
                    {t('support.id')!}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('support.subject')!}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t('support.created')!}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.length > 0 ? (
                tickets.map((ticket: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography
                        color="primary"
                        fontWeight={600}
                        onClick={() => handleTicketClick(ticket.id)}
                        style={{ cursor: 'pointer' }}
                      >
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
                        <HumanizedDate dateString={ticket.created_at} />
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={totalPages * pageSize}
          rowsPerPage={pageSize}
          page={page - 1}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handlePageSizeChange}
        />
      </Box>
    </DashboardCard>
  );
};

export default TicketList;
