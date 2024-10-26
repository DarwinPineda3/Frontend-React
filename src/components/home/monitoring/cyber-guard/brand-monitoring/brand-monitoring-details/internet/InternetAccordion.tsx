import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { InternetCategories } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import { Box } from '@mui/material';
import InternetTable from './InternetTable';

interface InternetAccordionProps {
  internet_data: InternetCategories[];
}

const InternetAccordion: React.FC<InternetAccordionProps> = ({ internet_data }) => {
  return (
    <Box>
      {internet_data.map((security_leaks, index) =>
        Object.entries(security_leaks).map(([category, details]) => (
          <Accordion key={`${category}-${index}`}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls={`${category}-content`}
              id={`${category}-header`}
            >
              <Typography variant="h6">
                {details.type} ({details.total_results})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InternetTable internet={details.data} />
            </AccordionDetails>
          </Accordion>
        )),
      )}
    </Box>
  );
};

export default InternetAccordion;
