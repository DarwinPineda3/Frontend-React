import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import GiottoProjecTemplatesTable from './giottoProjecTemplatesTable';
import GiottoProjectTechniciansTable from './giottoProjectTechniciansTable';

const GiottoProjectGroupsAccordion: React.FC<{ group: any }> = ({ group }) => {
  return (
    <Accordion key={`${group.name}`}>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls={`${group.name}-content`}
        id={`${group.name}-header`}
      >
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          {group.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <GiottoProjectTechniciansTable technicians={group.groupTechnicians} />
        <GiottoProjecTemplatesTable templates={group.groupTemplates} />
      </AccordionDetails>
    </Accordion>
  );
};

export default GiottoProjectGroupsAccordion;
