import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Badge, Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import {
  SecurityLeak,
  SecurityLeakCategories,
  SecurityLeakData,
} from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import SecurityLeaksTable from './SecurityLeaksTable';

interface SecurityLeaksAccordionProps {
  security_leaks_data: SecurityLeakCategories[];
  accordionId: string;
}
const formatKey = (key: string) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const SecurityLeaksAccordion: React.FC<SecurityLeaksAccordionProps> = ({
  security_leaks_data,
  accordionId,
}) => {
  const [expandedPanels, setExpandedPanels] = useState(
    accordionId ? [`${accordionId}-header`] : [],
  );

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
        var total_results_new = 0;
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
                data_new: leak.data_new,
              };

              Object.keys(leak.data).forEach((key) => {
                dataGroup[uniqueKey].data[key as keyof SecurityLeakData] = [] as string[];
              });
            }

            Object.entries(leak.data).forEach(([key, value]) => {
              if (
                value &&
                !dataGroup[uniqueKey].data[key as keyof SecurityLeakData].includes(value)
              ) {
                dataGroup[uniqueKey].data[key as keyof SecurityLeakData].push(value);
              }
            });
          }
          if (leak.data_new) {
            total_results_new += 1;
          }
        });

        const resultArray = Object.values(dataGroup);
        const totalResults = resultArray.length;

        return {
          [category]: {
            type: category,
            data: resultArray,
            total_results: totalResults,
            total_results_new: total_results_new,
          },
        } as SecurityLeakCategories;
      });
    });

    return { security_leaks_data: leaksFormatter.flat() };
  };

  const result = formatData(security_leaks_data);

  const handleChange = (panel) => (_, isExpanded: boolean) => {
    setExpandedPanels(
      (prevExpanded) =>
        isExpanded
          ? [...prevExpanded, panel] // Agrega si se expande
          : prevExpanded.filter((p) => p !== panel), // Quita si se colapsa
    );
  };
  return (
    <Box>
      {result.security_leaks_data.map((security_leaks, index) =>
        Object.entries(security_leaks).map(([category, details]) => (
          <Accordion
            key={`${category}-${index}`}
            expanded={expandedPanels.includes(`${category}-header`)}
            onChange={handleChange(`${category}-header`)}
          >
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
              <SecurityLeaksTable leaks={details.data} category={details.type} />
            </AccordionDetails>
          </Accordion>
        )),
      )}
    </Box>
  );
};

export default SecurityLeaksAccordion;
