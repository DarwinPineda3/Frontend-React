// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Box, CardContent, Divider, Grid, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { useTranslation } from 'react-i18next';  

// components
import { IconArticle, IconBell, IconLock, IconUserCircle } from '@tabler/icons-react';
import AccountTab from '../../components/pages/account-setting/AccountTab';
import BillsTab from '../../components/pages/account-setting/BillsTab';
import NotificationTab from '../../components/pages/account-setting/NotificationTab';
import SecurityTab from '../../components/pages/account-setting/SecurityTab';
import BlankCard from '../../components/shared/BlankCard';


const AccountSetting = () => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

const BCrumb = [
  {
    to: '/',
    title: t('menu.home'),
  },
  {
    title: t('account_settings.title'),
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <PageContainer title="Akila" description="this is Account Setting page">
      <Breadcrumb title={t('account_settings.title')} items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BlankCard>
            <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="basic tabs example"
              >
                <Tab
                  iconPosition="start"
                  icon={<IconUserCircle size="22" />}
                  label={t('account_settings.account')}
                  {...a11yProps(0)}
                />
                {/* pestañas comentadas */}
                {/* <Tab
                  iconPosition="start"
                  icon={<IconBell size="22" />}
                  label="Notifications"
                  {...a11yProps(1)}
                /> */}
                {/* <Tab
                  iconPosition="start"
                  icon={<IconArticle size="22" />}
                  label="Bills"
                  {...a11yProps(2)}
                /> */}
                {/* <Tab
                  iconPosition="start"
                  icon={<IconLock size="22" />}
                  label="Security"
                  {...a11yProps(3)}
                /> */}
              </Tabs>
            </Box>
            <Divider />
            <CardContent>
              <TabPanel value={value} index={0}>
                <AccountTab />
              </TabPanel>
              {/* pestañas comentadas*/}
              {/* <TabPanel value={value} index={1}>
                <NotificationTab />
              </TabPanel> */}
              {/* <TabPanel value={value} index={2}>
                <BillsTab />
              </TabPanel> */}
              {/* <TabPanel value={value} index={3}>
                <SecurityTab />
              </TabPanel> */}
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AccountSetting;
