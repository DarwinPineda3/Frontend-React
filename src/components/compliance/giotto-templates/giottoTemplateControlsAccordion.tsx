import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import GiottoTemplateControlDescriptionAccordion from './giottoTemplateControlDescriptionAccordion';

interface GiottoGroupControlsListProps {
  groupName: string;
  controls: any[];
}
const GiottoTemplateControlsAccordion: React.FC<GiottoGroupControlsListProps> = ({
  groupName,
  controls,
}) => {
  return (
    <Accordion key={`${groupName}`}>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls={`${groupName}-content`}
        id={`${groupName}-header`}
      >
        <IconButton aria-label="Example">
          <FormatListBulletedIcon />
        </IconButton>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          {groupName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {Object.entries(controls).map(([index]: any) => (
          <GiottoTemplateControlDescriptionAccordion control={controls[index]} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default GiottoTemplateControlsAccordion;
