import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

const GiottoTemplateControlDescriptionAccordion: React.FC<{ control: any }> = ({ control }) => {
  return (
    <Accordion key={`${control.name}`}>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls={`${control.name}-content`}
        id={`${control.name}-header`}
      >
        <IconButton aria-label="Example">
          <SettingsIcon />
        </IconButton>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          {control.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* // TODO: agregar detalle del control */}
        {/* <GiottoProjectTechniciansTable technicians={control.groupTechnicians} /> */}
      </AccordionDetails>
    </Accordion>
  );
};

export default GiottoTemplateControlDescriptionAccordion;
