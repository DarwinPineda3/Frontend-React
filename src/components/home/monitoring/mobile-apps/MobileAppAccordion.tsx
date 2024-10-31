import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box } from '@mui/material';
import MobileAppTable from './MobileAppTable';
import { useTranslation } from 'react-i18next';

interface MobileAppAccordionProps {
  data: any;
}



const MobileAppAccordion: React.FC<MobileAppAccordionProps> = ({ data }) => {
  const { t } = useTranslation();
  const groupedDetails = [
    { title: t("mobile_apps.permissions"), data: data.details.permissions },
    { title: t("mobile_apps.risks"), data: data.details.risks },
    { title: t("mobile_apps.owasp_issues"), data: data.details.OWASP },
    { title: t("mobile_apps.external_communications"), data: data.details.externalCommunications },
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
              <MobileAppTable data={group.data} title={t("mobile_apps.name")} />
            </AccordionDetails>
          </Accordion>
        )
      ))}
    </Box>
  );
};

export default MobileAppAccordion;