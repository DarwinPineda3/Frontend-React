import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

interface HumanizedDateProps {
  dateString: string;
}

const HumanizedDate: React.FC<HumanizedDateProps> = ({ dateString }) => {
  const { i18n } = useTranslation();

  const date = parseISO(dateString);
  
  const humanizedDate = formatDistanceToNow(date, { 
    addSuffix: true, 
    locale: i18n.language === 'es' ? es : undefined
  });

  return <span>{humanizedDate}</span>;
};

export default HumanizedDate;