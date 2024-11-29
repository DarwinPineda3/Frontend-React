import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { SecurityLeak, SecurityLeakCategories, SecurityLeakData } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import { Box } from '@mui/material';
import SecurityLeaksTable from './SecurityLeaksTable';

interface SecurityLeaksAccordionProps {
  security_leaks_data: SecurityLeakCategories[];
}
const formatKey = (key: string) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const SecurityLeaksAccordion: React.FC<SecurityLeaksAccordionProps> = ({ security_leaks_data }) => {

  const getCategoryData = (leak: SecurityLeak, category: string) => {
    switch (category) {
      case 'Domains':
        return leak.data.domain;
      case 'Emails':
        return leak.data.email;
      case 'IPs':
        return leak.data.ip_address;
      case 'Usernames':
        return leak.data.username || leak.data.name;
      case 'Phones':
        return leak.data.phone;
      default:
        return null;
    }
  };

  const formatData = (security_leaks_data: SecurityLeakCategories[]) => {
    const leaksFormatter = security_leaks_data.map((security_leaks) => {
      return Object.entries(security_leaks).map(([category, details]) => {
        const dataGroup: { [key: string]: SecurityLeak } = {};

        details.data.forEach((leak) => {
          const uniqueKey: any = getCategoryData(leak, category);

          if (uniqueKey) {
            if (!dataGroup[uniqueKey]) {
              dataGroup[uniqueKey] = {
                date: leak.date,
                data: {} as SecurityLeakData,
                generated: leak.generated,
                source: leak.source,
                type: leak.type,
                risk_level: leak.risk_level,
              };

              Object.keys(leak.data).forEach((key) => {
                dataGroup[uniqueKey].data[key as keyof SecurityLeakData] = [] as string[];
              });
            }

            Object.entries(leak.data).forEach(([key, value]) => {
              if (value && !dataGroup[uniqueKey].data[key as keyof SecurityLeakData].includes(value)) {
                dataGroup[uniqueKey].data[key as keyof SecurityLeakData].push(value);
              }
            });
          }
        });

        const resultArray = Object.values(dataGroup);
        const totalResults = resultArray.length;

        return {
          [category]: {
            type: category,
            data: resultArray,
            total_results: totalResults,
          }
        } as SecurityLeakCategories;
      });
    });

    return { security_leaks_data: leaksFormatter.flat() };
  };

  const result = formatData(security_leaks_data);  
  return (
    <Box>
      {result.security_leaks_data.map((security_leaks, index) =>
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
              <SecurityLeaksTable leaks={details.data} category={details.type} />
            </AccordionDetails>
          </Accordion>
        )),
      )}
    </Box>
  );
};

export default SecurityLeaksAccordion;