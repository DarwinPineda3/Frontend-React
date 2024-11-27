import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Badge,
  Box,
  Divider,
  Grid,
  Tab
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'src/store/Store';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListIcon from '@mui/icons-material/List';
import GlobeIcon from '@mui/icons-material/Public';
import WPSMainTheme from './wpscanMainTheme';
import WPSFindings from './wpscansFindings';
import WpScanTopBar from './wpscanTopBar';
import WPSOverview from './wpscanOverview';
import WPSPlugins from './wpscansPlugins';
import PluginVersionTable from './wpscansPlugings';


const WpScanDetail: React.FC<{ scanId: string; onAlertClick: (alertId: string) => void }> = ({
  scanId
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const wpscan = useSelector((state: any) => state.wpscanReducer.wpscan);
  const isLoading = useSelector((state: any) => state.wpscanReducer.isLoading);
  const error = useSelector((state: any) => state.wpscanReducer.error);


  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     if (scanId && !wpscan) {
  //       try {
  //         await dispatch(fetchWPScanById(scanId));
  //       } catch (error) {
  //         console.error('Error fetching wpscans:', error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [scanId]);

  // console.log(wpscan)
  // let dataCards: any[] = [];
  // if (wpscan) {
  //   dataCards = [
  //     { severity: 'critical', value: wpscan?.vulnerabilities.length || 0 },
  //     { severity: 'high', value: wpscan?.plugins_list.length || 0 },
  //     { severity: 'medium', value: wpscan?.users.length || 0 },
  //     { severity: 'low', value: wpscan?.interesting_findings.length || 0 },
  //   ];
  // }

  // if (isLoading) {
  //   return (
  //     <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
  //       <Loader />
  //     </Box>
  //   );
  // }

  const COMMON_TAB = [
    {
      value: 'overview',
      icon: <GlobeIcon />,
      label: `Overview`, // translate
      disabled: false,
      content: <WPSOverview />,
    },
    {
      value: 'maintheme',
      icon: <InsertDriveFileIcon />,
      label: `Main Theme`, // translate
      disabled: false,
      content: <WPSMainTheme />,
    },
    {
      value: 'findings',
      icon: <ListIcon />,
      label: `Findings`, // translate
      disabled: false,
      content: <WPSFindings />,
    },
    {
      value: 'plugins',
      icon: <ListIcon />,
      label: `Plugins`, // translate
      disabled: false,
      content: <PluginVersionTable />,
    },
  ];

  const [value, setValue] = React.useState('overview');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={12}>
        <TabContext value={value}>
          <Box sx={{ p: 0 }}>
            <WpScanTopBar scan_name={"a"} status={"a"} version={"a"} site_url={"a"} effective_url={"a"} />
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
    // <Grid container spacing={3}>
    //   {/* Scan Metadata Section */}
    //   <Grid item xs={12} xl={12}>
    //     {wpscan ?(
    //       <WpScanTopCards data={dataCards} />
    //     ):(
    //       <Loader />
    //     )}
    //   </Grid>
    //   <Grid item xs={12} xl={6}>
    //     <DashboardCard>
    //       <PluginVersionTable />
    //     </DashboardCard>
    //   </Grid>

    //   <Grid item xs={12} xl={6}>
    //     <WpScanTopBar scan_name={"a"} status={"a"} version={"a"} site_url={"a"} effective_url={"a"} />
    //     <WPSMainTheme />
    //   </Grid>
    //   {/* Alerts Table Section */}
    //   <Grid item xs={12} xl={12}>
    //     <WPSFindings />
    //   </Grid>
    // </Grid>
  );
};

export default WpScanDetail;
