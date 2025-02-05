import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Badge, Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { SocialNetworksCategories } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import SocialNetworkTable from './SocialNetworkTable';

interface SocialNetworksAccordionProps {
  social_network_data: SocialNetworksCategories[];
}

const formatKey = (key: string) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const SocialNetworksAccordion: React.FC<SocialNetworksAccordionProps> = ({
  social_network_data,
}) => {
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
                {formatKey(details.type)} ({details.total_results})
                {details.total_results_new > 0 && (
                  <Badge
                    badgeContent={`${details.total_results_new} Recent`}
                    color="primary"
                    sx={{
                      ml: 5,
                      '& .MuiBadge-badge': {
                        whiteSpace: 'nowrap',
                      },
                    }}
                  />
                )}
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
