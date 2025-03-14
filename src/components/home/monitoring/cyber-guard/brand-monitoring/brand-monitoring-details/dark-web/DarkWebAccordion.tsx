import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Badge, Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import {
  DarkWeb,
  DarkWebCategories,
  DarkWebData,
} from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import DarkWebTable from './DarkWebTable';

interface DarkWebAccordionProps {
  dark_web_data: DarkWebCategories[];
  accordionId: string;
}

const formatKey = (key: string) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const DarkWebAccordion: React.FC<DarkWebAccordionProps> = ({ dark_web_data, accordionId }) => {
  const getCategoryData = (dar_web: DarkWeb, category: string) => {
    switch (category) {
      case 'Domains':
        return dar_web.data.domain;
      case 'Emails':
        return dar_web.data.email;
      case 'IPs':
        return dar_web.data.ip_address;
      case 'Usernames':
        return dar_web.data.username || dar_web.data.name;
      case 'Phones':
        return dar_web.data.phone;
      default:
        return null;
    }
  };

  const formatData = (dark_web_data: DarkWebCategories[]) => {
    const dar_websFormatter = dark_web_data.map((dark_web) => {
      return Object.entries(dark_web).map(([category, details]) => {
        const dataGroup: { [key: string]: DarkWeb } = {};
        var total_results_new = 0;
        details.data.forEach((dar_web) => {
          const uniqueKey: any = getCategoryData(dar_web, category);

          if (uniqueKey) {
            if (!dataGroup[uniqueKey]) {
              dataGroup[uniqueKey] = {
                date: dar_web.date,
                data: {} as DarkWebData,
                generated: dar_web.generated,
                source: dar_web.source,
                type: dar_web.type,
                risk_level: dar_web.risk_level,
                data_new: dar_web.data_new,
              };

              Object.keys(dar_web.data).forEach((key) => {
                dataGroup[uniqueKey].data[key as keyof DarkWebData] = [] as string[];
              });
            }

            Object.entries(dar_web.data).forEach(([key, value]) => {
              if (value && !dataGroup[uniqueKey].data[key as keyof DarkWebData].includes(value)) {
                dataGroup[uniqueKey].data[key as keyof DarkWebData].push(value);
              }
            });
          }
          if (dar_web.data_new) {
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
        } as DarkWebCategories;
      });
    });

    return { dark_web_data: dar_websFormatter.flat() };
  };

  const [expandedPanels, setExpandedPanels] = useState(
    accordionId ? [`${accordionId}-header`] : [],
  );

  const result = formatData(dark_web_data);
  const sortedData = result.dark_web_data
    .flatMap((dark_web) =>
      Object.entries(dark_web).map(([category, details]) => ({
        category,
        details,
      })),
    )
    .filter(({ details }) => details.data && details.data.length > 0)
    .sort((a, b) => b.details.total_results - a.details.total_results);

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
      {sortedData.map(({ category, details }, index) => (
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
            <DarkWebTable dark_web={details.data} category={details.type} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default DarkWebAccordion;
