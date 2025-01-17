import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BoltIcon from '@mui/icons-material/Bolt';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import WarningIcon from '@mui/icons-material/Warning';
import { IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const GiottoTemplateControlDescriptionAccordion: React.FC<{ control: any }> = ({ control }) => {
  const { t } = useTranslation();

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
          {control.isExecutable && (
            <>
              -
              <IconButton aria-label="Example">
                <BoltIcon sx={{ color: 'yellow' }} />
              </IconButton>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                {t('compliance_templates.template_control_executable')} - {control.isExecutable}
              </Typography>
            </>
          )}
          {control.isSettable && (
            <>
              <IconButton aria-label="Example">
                <EditIcon />
              </IconButton>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                {t('compliance_templates.template_control_editable')} - {control.isSettable}
              </Typography>
            </>
          )}
          <IconButton aria-label="Example">
            <WarningIcon />
          </IconButton>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            {control.criticalness}
          </Typography>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{control.description}</AccordionDetails>
    </Accordion>
  );
};

export default GiottoTemplateControlDescriptionAccordion;
