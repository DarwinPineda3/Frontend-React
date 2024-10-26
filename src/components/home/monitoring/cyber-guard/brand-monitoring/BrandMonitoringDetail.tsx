import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'src/store/Store';
import { Box, Divider, Badge, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import GlobeIcon from '@mui/icons-material/Public';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import ExclamationIcon from '@mui/icons-material/ErrorOutline';
import DashboardCard from '../../../../shared/DashboardCard';
import SecurityLeaks from './brand-monitoring-details/security-leaks/SecurityLeaks';
import { fetchBrandMonitoringById } from 'src/store/sections/cyber-guard/BrandMonitoringSlice';
import { Data } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import SocialNetworks from './brand-monitoring-details/social-networks/SocialNetworks';
import Internet from './brand-monitoring-details/internet/Internet';
import DarkWeb from './brand-monitoring-details/dark-web/DarkWeb';

interface BrandMonitoringDetailProps {
  id: string;
}

const BrandMonitoringDetail: React.FC<BrandMonitoringDetailProps> = ({ id }) => {
  const dispatch = useDispatch();
  const brandMonitoringDetail: Data = useSelector((state: any) => state.brandMonitoringReducer.brandMonitoringDetail);

  const COMMON_TAB = [
    {
      value: 'internet',
      icon: <GlobeIcon />,
      label: 'Internet',
      disabled: false,
      content: <Internet brandMonitoringDetail={brandMonitoringDetail} />,
    },
    {
      value: 'security-leaks',
      icon: <ListIcon />,
      label: 'Security Leaks',
      disabled: false,
      content: <SecurityLeaks brandMonitoringDetail={brandMonitoringDetail} />,
    },
    {
      value: 'social-networks',
      icon: <PersonIcon />,
      label: 'Social Networks',
      disabled: false,
      content: <SocialNetworks brandMonitoringDetail={brandMonitoringDetail} />,
    },
    {
      value: 'darkweb',
      icon: <ExclamationIcon />,
      label: 'Dark Web',
      disabled: false,
      badge: '',
      content: <DarkWeb brandMonitoringDetail={brandMonitoringDetail}/>,
    },
  ];
  React.useEffect(() => {
    dispatch(fetchBrandMonitoringById(id));
  }, [dispatch, id]);

  const [value, setValue] = React.useState('internet');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <DashboardCard title={brandMonitoringDetail?.query}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="Tabs Example">
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
        <Box mt={2}>
          {COMMON_TAB.map((panel) => (
            <TabPanel key={panel.value} value={panel.value}>
              {panel.content}
            </TabPanel>
          ))}
        </Box>
      </TabContext>
    </DashboardCard>
  );
};

export default BrandMonitoringDetail;