import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { SecurityLeakCategories } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import { Box } from '@mui/material';
import SecurityLeaksTable from './SecurityLeaksTable';

interface SecurityLeaksAccordionProps {
  security_leaks_data: SecurityLeakCategories[];
}
const formatKey = (key: string) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const SecurityLeaksAccordion: React.FC<SecurityLeaksAccordionProps> = ({ security_leaks_data }) => {
  return (
    <Box>
      {security_leaks_data.map((security_leaks, index) =>
        Object.entries(security_leaks).map(([category, details]) => (
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
              <SecurityLeaksTable leaks={details.data} />
            </AccordionDetails>
          </Accordion>
        )),
      )}
    </Box>
  );
};

export default SecurityLeaksAccordion;
