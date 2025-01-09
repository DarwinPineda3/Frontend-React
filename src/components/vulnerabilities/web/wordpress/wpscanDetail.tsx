import {
  Badge,
  Box,
  Divider,
  Grid,
  Tab
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'src/store/Store';

import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import GlobeIcon from '@mui/icons-material/Public';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchWPScanById } from 'src/store/vulnerabilities/web/WPScanSlice';
import WPSBackups from './wpscanBackups';
import WPSFindings from './wpscanFindings';
import WPSMainTheme from './wpscanMainTheme';
import WPSPlugins from './wpscanPlugings';
import WpScanTopBar from './wpscanTopBar';
import WpScanTopCards from './wpScantopCards';
import WPSUsers from './wpscanUsers';


const WpScanDetail: React.FC = () => {
  const { scanId } = useParams<{ scanId?: string }>();
  const dispatch = useDispatch();
  const wpscan = useSelector((state: any) => state.wpscanReducer.wpscan);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  React.useEffect(() => {
    const fetchData = async () => {
      if (scanId) {
        try {
          setIsLoading(true)
          await dispatch(fetchWPScanById(scanId));
          setIsLoading(false)
        } catch (error) {
          console.error('Error fetching wpscans:', error);
        }
      }
    };

    fetchData();
  }, [scanId, dispatch]);

  const usersCount = wpscan?.users ? Object.keys(wpscan?.users).length : 0;

  const wpscanData: { severity: 'critical' | 'high' | 'medium' | 'low'; value: string }[] = [
    { severity: 'critical', value: wpscan?.count_vulnerabulities || 0 },
    { severity: 'high', value: wpscan?.count_outdated_plugins || 0 },
    { severity: 'medium', value: usersCount.toString() },
    { severity: 'low', value: wpscan?.interesting_findings.length || 0 },
  ];

  const COMMON_TAB = [
    {
      value: 'findings',
      icon: <ListIcon />,
      label: t('wpscan.findings'),
      disabled: false,
      content: <WPSFindings findings={wpscan?.interesting_findings} />,
    },
    {
      value: 'backups',
      icon: <GlobeIcon />,
      label: t('wpscan.backups'),
      disabled: false,
      content:
        <WPSBackups backups={wpscan?.config_backups_list} />,
    },
    {
      value: 'users',
      icon: <PersonIcon />,
      label: t('wpscan.users_tittle'),
      disabled: false,
      content:
        <WPSUsers users={wpscan?.users} />,
    },

  ];

  const [value, setValue] = React.useState('findings');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return (
    <Grid container spacing={3}>
      {isLoading ? (
        <Grid item xs={12} xl={12}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <Loader />
          </Box>
        </Grid>
      ) : (
        <>
          <Grid item xs={12} xl={12}>
            <WpScanTopBar status={wpscan?.version?.status} version={wpscan?.version?.number} site_url={wpscan?.target_url} effective_url={wpscan?.effective_url} />
          </Grid>
          <Grid item xs={12} xl={12}>
            <WpScanTopCards data={wpscanData} />
          </Grid>
          <Grid item xs={12} xl={6}>
            <WPSMainTheme main_theme={wpscan?.main_theme} />
          </Grid>
          <Grid item xs={12} xl={6}>
            <WPSPlugins plugins_list={wpscan?.plugins_list} scanId={scanId} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <DashboardCard title={t('wpscan.results')!}>
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
            </DashboardCard>
          </Grid>
        </>
      )}

    </Grid>
  );
};

export default WpScanDetail;
