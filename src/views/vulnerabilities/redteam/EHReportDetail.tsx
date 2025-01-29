import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListIcon from '@mui/icons-material/List';
import GlobeIcon from '@mui/icons-material/Public';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Badge, Box, Breadcrumbs, Chip, Divider, Grid, IconButton, Link, Tab, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import Loader from 'src/components/shared/Loader/Loader';
import EHEvidencesList from 'src/components/vulnerabilities/redteam/EHEvidenceList';
import EHOverview from 'src/components/vulnerabilities/redteam/EHOverview';
import EHVulnerabilitiesList from 'src/components/vulnerabilities/redteam/EHVulnerabilitiesList';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchEHReportById } from "src/store/vulnerabilities/redteam/EHReportSlice";

const EHReportDetails = () => {
  const { ehReportId } = useParams<{ ehReportId?: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const ehReport = useSelector((state: any) => state.ehReportsReducer.ehReport);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      if (ehReportId) {
        try {
          setIsLoading(true);
          await dispatch(fetchEHReportById(ehReportId));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching ehreport:', error);
        }
      }
    };
    fetchData();
  }, [ehReportId, dispatch]);

  const COMMON_TAB = [
    {
      value: 'overview',
      icon: <GlobeIcon />,
      label: t("redteam.Overview"),
      disabled: false,
      content: <EHOverview ehReport={ehReport} />,
    },
    {
      value: 'vulnerabilities',
      icon: <ListIcon />,
      label: t("redteam.Vulnerabilities"),
      disabled: false,
      content: <EHVulnerabilitiesList vulnerabilities={ehReport?.vulnerabilities} name={ehReport?.name} />,
    },
    {
      value: 'evidences',
      icon: <InsertDriveFileIcon />,
      label: t("redteam.evidences"),
      disabled: false,
      content: <EHEvidencesList evidences={ehReport?.evidences} />,
    },
  ];

  const [value, setValue] = React.useState('overview');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <PageContainer title="Akila">
      <Box display="flex" alignItems="center" mb={2}>
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
      <Grid container spacing={3}>
        {isLoading ? (
          <Grid item xs={12} lg={12}>
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
              <Loader />
            </Box>
          </Grid>
        ) : (
          <>
          <Grid item xs={12} xl={12}>
            <Breadcrumb title={ehReport?.name}>
              <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                <Chip label={`${t("redteam.objectives")}: ${ehReport?.objectives}`} color="secondary" variant="outlined" />
                <Chip label={`${t("redteam.start_date")}: ${ehReport?.start_date_report}`} color="info" variant="outlined" />
                <Chip label={`${t("redteam.end_date")}: ${ehReport?.end_date_report}`} color="primary" variant="outlined" />
              </Box>
            </Breadcrumb>
          </Grid>

          <Grid item xs={12} lg={12}>
            <TabContext value={value}>
              <Box>
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
                      sx={{ mb: 0 }}
                    />
                  ))}
                </TabList>
              </Box>
              <Divider />
              <Box mt={2}>
                {COMMON_TAB.map((panel) => (
                  <TabPanel key={panel.value} value={panel.value} sx={{ p: 0 }}>
                    {panel.content}
                  </TabPanel>
                ))}
              </Box>
            </TabContext>
          </Grid>
          </>
        )}
      </Grid>
    </PageContainer>
  );
};

export default EHReportDetails;
