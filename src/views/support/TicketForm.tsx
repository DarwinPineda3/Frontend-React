import React from 'react';
import { Link } from 'react-router-dom'; 
import TicketFormComp from '../../components/ticketform/TicketFormComp';

const Tickets: React.FC = () => {
  return (
    <div>
      <h1>Tickets</h1>
      <Link to="/tickets/create"></Link>
      <TicketFormComp /> 
    </div>
  );
};

export default Tickets;


