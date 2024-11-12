import { formatDistanceToNow, isValid, parseISO } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface HumanizedDateProps {
  dateString: string;
}

const HumanizedDate: React.FC<HumanizedDateProps> = ({ dateString }) => {
  const { i18n } = useTranslation();

  const date = parseISO(dateString);

  if (!isValid(date)) {
    console.error(`Invalid date string: ${dateString}`);
    return 'Invalid date';
  }

  const selectedLocale = i18n.language === 'es' ? es : enUS;

  try {
    const humanizedDate = formatDistanceToNow(date, {
      addSuffix: true,
      locale: selectedLocale,
    });

    return humanizedDate;
  } catch (error) {
    console.error('Error formatting the humanized date:', error);
    return 'Error formatting date';
  }
};

export default HumanizedDate;
