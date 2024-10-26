import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { SocialNetworksCategories } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import { Box } from '@mui/material';
import SocialNetworkTable from './SocialNetworkTable';

interface SocialNetworksAccordionProps {
  social_network_data: SocialNetworksCategories[];
}

const SocialNetworksAccordion: React.FC<SocialNetworksAccordionProps> = ({ social_network_data }) => {
  return (
    <Box>
      {social_network_data.map((security_leaks, index) =>
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
              <SocialNetworkTable social={details.data} />
            </AccordionDetails>
          </Accordion>
        )),
      )}
    </Box>
  );
};

export default SocialNetworksAccordion;
