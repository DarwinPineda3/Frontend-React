import ExclamationIcon from '@mui/icons-material/ErrorOutline';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import GlobeIcon from '@mui/icons-material/Public';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Badge, Box, Divider } from '@mui/material';
import Tab from '@mui/material/Tab';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import Loader from 'src/components/shared/Loader/Loader';
import {
  clearBrandMonitoringDetail,
  fetchBrandMonitoringById,
  updateDataViewedBrandMonitoring,
} from 'src/store/sections/cyber-guard/BrandMonitoringSlice';
import { useDispatch, useSelector } from 'src/store/Store';
import { Data } from 'src/types/cyber-guard/brand-monitoring/brandMonitoring';
import DashboardCard from '../../../../shared/DashboardCard';
import DarkWeb from './brand-monitoring-details/dark-web/DarkWeb';
import Internet from './brand-monitoring-details/internet/Internet';
import SecurityLeaks from './brand-monitoring-details/security-leaks/SecurityLeaks';
import SocialNetworks from './brand-monitoring-details/social-networks/SocialNetworks';

interface BrandMonitoringDetailProps {
  id: string;
}

const BrandMonitoringDetail: React.FC<BrandMonitoringDetailProps> = ({ id }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchParams, setsearchParams] = useSearchParams();
  const dataType = searchParams.get('dataType');
  const dataSource = searchParams.get('dataSource');
  const brandMonitoringDetail: Data = useSelector(
    (state: any) => state.brandMonitoringReducer.brandMonitoringDetail,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = React.useState(dataType || 'internet');
  const [valueAccordion, setValueAccordion] = React.useState(dataSource || '');
  const [title, setTitle] = React.useState('-');

  const formatAccordionTitle = (value: string) => {
    const words = value.split('_').map((word) => word.toLowerCase()); // Convierte todas las palabras a minúsculas
    return words
      .map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
      .join(' ');
  };

  const COMMON_TAB = [
    {
      value: 'internet',
      icon: <GlobeIcon />,
      label: `${t('monitoring.internet')}`,
      disabled: false,
      content: (
        <Internet
          brandMonitoringDetail={brandMonitoringDetail}
          accordionId={formatAccordionTitle(valueAccordion)}
        />
      ),
    },
    {
      value: 'security-leaks',
      icon: <ListIcon />,
      label: `${t('monitoring.data_leaks')}`,
      disabled: false,
      content: (
        <SecurityLeaks
          brandMonitoringDetail={brandMonitoringDetail}
          accordionId={formatAccordionTitle(valueAccordion)}
        />
      ),
    },
    {
      value: 'social-networks',
      icon: <PersonIcon />,
      label: `${t('monitoring.social_media')}`,
      disabled: false,
      content: (
        <SocialNetworks
          brandMonitoringDetail={brandMonitoringDetail}
          accordionId={formatAccordionTitle(valueAccordion)}
        />
      ),
    },
    {
      value: 'darkweb',
      icon: <ExclamationIcon />,
      label: `${t('monitoring.dark_web')}`,
      disabled: false,
      badge: '',
      content: (
        <DarkWeb
          brandMonitoringDetail={brandMonitoringDetail}
          accordionId={formatAccordionTitle(valueAccordion)}
        />
      ),
    },
  ];

  React.useEffect(() => {
    setValue(searchParams.get('dataType') || 'internet'); // Actualiza cuando cambia la URL
  }, [searchParams]);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchBrandMonitoringById(id, value));
      await dispatch(updateDataViewedBrandMonitoring(id));
      setIsLoading(false);
      if (brandMonitoringDetail?.query) {
        setTitle(brandMonitoringDetail.query);
      }
    };

    fetchData();
    return () => {
      if (title != '-') {
        dispatch(clearBrandMonitoringDetail(id));
      }
    };
  }, [dispatch, id, value]);

  React.useEffect(() => {
    if (brandMonitoringDetail?.query) {
      setTitle(brandMonitoringDetail.query);
    }
  }, [brandMonitoringDetail?.query]);

  React.useEffect(() => {
    if (dataSource) {
      setValueAccordion(dataSource);
    }
  }, [valueAccordion, dataSource]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    const dataType = newValue;
    setsearchParams({ dataType }, { replace: true });
  };

  return (
    <DashboardCard title={title}>
      <TabContext value={value}>
        <Box sx={{ p: 0 }}>
          <TabList
            onChange={handleChange}
            aria-label="Tabs Cyber Guard"
            variant="scrollable"
            scrollButtons="auto"
          >
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
              {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                  <Loader />
                </Box>
              ) : (
                panel.content
              )}
            </TabPanel>
          ))}
        </Box>
      </TabContext>
    </DashboardCard>
  );
};

export default BrandMonitoringDetail;
