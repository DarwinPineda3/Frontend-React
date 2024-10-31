import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box } from '@mui/material';
import MobileAppTable from './MobileAppTable';

interface MobileAppAccordionProps {
  data: any; 
}



const MobileAppAccordion: React.FC<MobileAppAccordionProps> = ({ data }) => {

    const groupedDetails = [
        { title: 'Permissions', data: data.details.permissions },
        { title: 'Risks', data: data.details.risks },
        { title: 'OWASP Issues', data: data.details.OWASP },
        { title: 'External Communications', data: data.details.externalCommunications },
      ];

      return (
        <Box>
          {groupedDetails.map((group, index) => (
            group.data.length > 0 && (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ArrowDownwardIcon />}
                  aria-controls={`${group.title}-content`}
                  id={`${group.title}-header`}
                >
                  <Typography variant="subtitle1">{group.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <MobileAppTable data={group.data} title={"Name"} />
                </AccordionDetails>
              </Accordion>
            )
          ))}
        </Box>
      );
};

export default MobileAppAccordion;