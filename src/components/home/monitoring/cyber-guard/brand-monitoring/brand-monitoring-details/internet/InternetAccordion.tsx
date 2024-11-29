import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import { InternetCategories } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import { Box, IconButton } from '@mui/material';
import InternetTable from './InternetTable';
import { useTranslation } from 'react-i18next';

interface InternetAccordionProps {
  internet_data: InternetCategories[];
}

const formatKey = (key: string) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};


const InternetAccordion: React.FC<InternetAccordionProps> = ({ internet_data }) => {

  const { t } = useTranslation();

  const traslateCategoriesDescription = (description: string) => {
    const translation = t(`monitoring.description_${description.toLowerCase()}`);
    return translation === `monitoring.description_${description.toLowerCase()}`
      ? t('monitoring.description_not_available')
      : translation;
  };
  return (
    <Box>
      {internet_data.map((security_leaks, index) => {
        const sortedEntries = Object.entries(security_leaks).sort(([, detailsA], [, detailsB]) => {
          return detailsB.total_results - detailsA.total_results;
        });

        return sortedEntries.map(([category, details]) => (
          <Accordion key={`${category}-${index}`}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls={`${category}-content`}
              id={`${category}-header`}
            >
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                {formatKey(details.type)} ({details.total_results})
                <Tooltip title={traslateCategoriesDescription(details.type)}>
                  <IconButton size="small" sx={{ marginLeft: 1 }}>
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InternetTable internet={details.data} />
            </AccordionDetails>
          </Accordion>
        ));
      })}
    </Box>
  );
};

export default InternetAccordion;
