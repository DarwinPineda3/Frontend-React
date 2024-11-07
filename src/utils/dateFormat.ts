import { format, isValid, parseISO } from 'date-fns';
import { enUS, es } from 'date-fns/locale';

export const formatDate = (dateString: string, locale: string = 'en'): string => {
  const date = parseISO(dateString);

  if (!isValid(date)) {
    console.error(`Invalid date string: ${dateString}`);
    return 'Invalid date';
  }

  const selectedLocale = locale === 'es' ? es : enUS;

  try {
    return format(date, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: selectedLocale });
  } catch (error) {
    console.error('Error formatting the date:', error);
    return 'Error formatting the date';
  }
};
