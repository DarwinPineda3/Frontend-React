import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { parseISO } from 'date-fns';

interface HumanizedDateProps {
    dateString: string;
  }
  
  const HumanizedDate: React.FC<HumanizedDateProps> = ({ dateString }) => {
    const date = parseISO(dateString);
    const humanizedDate = formatDistanceToNow(date, { addSuffix: true });
  
    return humanizedDate;
  };
  
export default HumanizedDate;