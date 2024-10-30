import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { DarkWebCategories } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import { Box } from '@mui/material';
import DarkWebTable from './DarkWebTable';

interface DarkWebAccordionProps {
  dark_web_data: DarkWebCategories[];
}

const formatKey = (key: string) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const DarkWebAccordion: React.FC<DarkWebAccordionProps> = ({ dark_web_data }) => {
  const sortedData = dark_web_data
    .flatMap((security_leaks) =>
      Object.entries(security_leaks).map(([category, details]) => ({
        category,
        details,
      }))
    )
    .filter(({ details }) => details.data && details.data.length > 0)
    .sort((a, b) => b.details.total_results - a.details.total_results);

  return (
    <Box>
      {sortedData.map(({ category, details }, index) => (
        <Accordion key={`${category}-${index}`}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls={`${category}-content`}
            id={`${category}-header`}
          >
            <Typography variant="h6">
              {formatKey(details.type)} ({details.total_results})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DarkWebTable dark_web={details.data} category={details.type} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default DarkWebAccordion;
