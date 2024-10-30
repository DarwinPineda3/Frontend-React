import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
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
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { TicketType } from '../../types/apps/ticket';
import DashboardCard from '../shared/DashboardCard';

interface TicketListProps {
  tickets: TicketType[];
  onDelete: (id: number) => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, onDelete }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(5);

  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const paginatedTickets = tickets.slice((currentPage - 1) * ticketsPerPage, currentPage * ticketsPerPage);

  return (
    <DashboardCard
      title={t("support.tickets_management") as string}
      subtitle={t("support.tickets_subtitle") as string}
      action={
        <IconButton color="primary" onClick={() => navigate('/support/ticketform')}>
          <AddIcon />
        </IconButton>
      }
    >
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>ID</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>Asunto</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>Categoría</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>Acciones</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTickets.map((ticket) => (
                <TableRow key={ticket.Id}>
                  <TableCell>
                    <Link to={`/support/ticket/${ticket.Id}`} style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
                      <Typography variant="body1" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                        {ticket.Id}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Typography>{ticket.ticketTitle}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{ticket.category}</Typography>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" color="secondary" onClick={() => onDelete(ticket.Id)}>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box my={3} display="flex" justifyContent={'center'}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default TicketList;
