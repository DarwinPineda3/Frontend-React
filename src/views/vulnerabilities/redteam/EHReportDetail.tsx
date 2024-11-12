import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListIcon from '@mui/icons-material/List';
import GlobeIcon from '@mui/icons-material/Public';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Badge, Box, Breadcrumbs, Divider, Grid, IconButton, Link, Tab, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import EHEvidencesList from 'src/components/vulnerabilities/redteam/EHEvidenceList';
import EHReportDetail from 'src/components/vulnerabilities/redteam/EHReportDetail';
import EHVulnerabilitiesList from 'src/components/vulnerabilities/redteam/EHVulnerabilitiesList';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchEHReportById } from "src/store/vulnerabilities/redteam/EthicalHackingReportSlice";

const EHReportDetails = () => {
  const { ehReportId } = useParams<{ ehReportId?: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const ehReport = useSelector((state: any) => state.ehReportsReducer.ehReport);
  const navigate = useNavigate();

  const COMMON_TAB = [
    {
      value: 'overview',
      icon: <GlobeIcon />,
      label: `Overview`, // translate
      disabled: false,
      content: <EHReportDetail ehReport={ehReport} />,
    },
    {
      value: 'vulnerabilities',
      icon: <ListIcon />,
      label: `Vulnerabilities`, // translate
      disabled: false,
      content: <EHVulnerabilitiesList vulnerabilities={ehReport?.vulnerabilities} />,
    },
    {
      value: 'evidences',
      icon: <InsertDriveFileIcon />,
      label: `evidences`, // translate
      disabled: false,
      content: <EHEvidencesList evidences={ehReport?.evidences} />,
    },
  ];

  const [value, setValue] = React.useState('overview');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (ehReportId) {
      dispatch(fetchEHReportById(ehReportId));
    }
  }, [dispatch, ehReportId]);

  return (
    <PageContainer title="Akila">
      <Box display="flex" alignItems="center" mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} color="inherit" to="/vulnerabilities/redteam">
            {t('menu.vulnerabilities')}
          </Link>
          <Link component={RouterLink} color="inherit" to="/vulnerabilities/redteam">
            {t('menu.redteam')}
          </Link>
          <Typography color="textPrimary">
            {t("redteam.ethical_hacking_reports")}
          </Typography>
          {ehReport && (
            <Typography color="textPrimary">{ehReport.name}</Typography>
          )}
        </Breadcrumbs>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={12}>
          <TabContext value={value}>
            <Box sx={{ p: 0 }}>
              <TabList onChange={handleChange} aria-label="Tabs Cyber Guard" variant="scrollable" scrollButtons="auto">
                {COMMON_TAB.map((tab) => (
                  <Tab
                    key={tab.value}
                    icon={tab.icon}
                    label={
                      <>
                        {tab.label}
                        {tab.badge && (
                          <Badge color="primary" variant="dot" sx={{ ml: 1 }}>
                            {tab.badge}
                          </Badge>
                        )}
                      </>
                    }
                    value={tab.value}
                    disabled={tab.disabled}
                    sx={{ mb: 1 }}
                  />
                ))}
              </TabList>
            </Box>
            <Divider />
            <Box mt={2} sx={{ p: 0 }}>
              {COMMON_TAB.map((panel) => (
                <TabPanel key={panel.value} value={panel.value} sx={{ p: 0 }}>
                  {panel.content}
                </TabPanel>
              ))}
            </Box>
          </TabContext>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default EHReportDetails;
