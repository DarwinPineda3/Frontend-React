import React, { useState } from 'react';
import { Box, Card, CardContent, CardHeader, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

interface ChangelogItem {
  version: string;
  date: string;
  added: string[];
  changed: string[];
  deprecated: string[];
  removed: string[];
  fixed: string[];
  security: string[];
}

interface ChangelogListProps {
  changes: ChangelogItem[];
}

const ChangelogList: React.FC<ChangelogListProps> = ({ changes }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | false>('panel0'); 

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      {changes.map((change, index) => (
        <Box key={index} mb={2}>
          <Card variant="outlined">
            <CardHeader
              title={`${t('changelog.version')} ${change.version}`}
              subheader={change.date}
              sx={{ backgroundColor: 'primary.main', color: 'white' }}
            />
            <CardContent>
              <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                >
                  <Typography variant="h6" color="textPrimary">
                    {t('changelog.changes')} {change.version}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* Added Section */}
                  {change.added.length > 0 && (
                    <Box sx={{ mb: 0.3, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" color="success.main" sx={{ paddingTop: 1 }}>
                        {t('changelog.added')}
                      </Typography>
                      <List sx={{ padding: 0 }}>
                        {change.added.map((item, idx) => (
                          <ListItem key={idx} sx={{ padding: 0 }}>
                            <Typography variant="body1" color="textSecondary">
                              • {item}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {/* Changed Section */}
                  {change.changed.length > 0 && (
                    <Box sx={{ mb: 0.3, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" color="secondary.main" sx={{ paddingTop: 1 }}>
                        {t('changelog.changed')}
                      </Typography>
                      <List sx={{ padding: 0 }}>
                        {change.changed.map((item, idx) => (
                          <ListItem key={idx} sx={{ padding: 0 }}>
                            <Typography variant="body1" color="textSecondary">
                              • {item}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {/* Deprecated Section */}
                  {change.deprecated.length > 0 && (
                    <Box sx={{ mb: 0.3, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" color="warning.main" sx={{ paddingTop: 1 }}>
                        {t('changelog.deprecated')}
                      </Typography>
                      <List sx={{ padding: 0 }}>
                        {change.deprecated.map((item, idx) => (
                          <ListItem key={idx} sx={{ padding: 0 }}>
                            <Typography variant="body1" color="textSecondary">
                              • {item}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {/* Removed Section */}
                  {change.removed.length > 0 && (
                    <Box sx={{ mb: 0.3, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" color="error.main" sx={{ paddingTop: 1 }}>
                        {t('changelog.removed')}
                      </Typography>
                      <List sx={{ padding: 0 }}>
                        {change.removed.map((item, idx) => (
                          <ListItem key={idx} sx={{ padding: 0 }}>
                            <Typography variant="body1" color="textSecondary">
                              • {item}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {/* Fixed Section */}
                  {change.fixed.length > 0 && (
                    <Box sx={{ mb: 0.3, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" color="success.main" sx={{ paddingTop: 1 }}>
                        {t('changelog.fixed')}
                      </Typography>
                      <List sx={{ padding: 0 }}>
                        {change.fixed.map((item, idx) => (
                          <ListItem key={idx} sx={{ padding: 0 }}>
                            <Typography variant="body1" color="textSecondary">
                              • {item}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {/* Security Section */}
                  {change.security.length > 0 && (
                    <Box sx={{ mb: 0.3, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" color="info.main" sx={{ paddingTop: 1 }}>
                        {t('changelog.security')}
                      </Typography>
                      <List sx={{ padding: 0 }}>
                        {change.security.map((item, idx) => (
                          <ListItem key={idx} sx={{ padding: 0 }}>
                            <Typography variant="body1" color="textSecondary">
                              • {item}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default ChangelogList;
