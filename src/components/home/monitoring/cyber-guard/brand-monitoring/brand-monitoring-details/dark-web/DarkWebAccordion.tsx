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

const DarkWebAccordion: React.FC<DarkWebAccordionProps> = ({ dark_web_data }) => {
  return (
    <Box>
      {dark_web_data.map((security_leaks, index) =>
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
              <DarkWebTable dark_web={details.data} />
            </AccordionDetails>
          </Accordion>
        )),
      )}
    </Box>
  );
};

export default DarkWebAccordion;
