import { RuleFolder } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Breadcrumbs, Divider, IconButton, Link, Tab, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchNetworkScanDetail } from 'src/store/vulnerabilities/network/NetworkScansSlice';
import { Scan } from 'src/types/vulnerabilities/network/networkScansType';
import NetworkVulnerabilities from './Network';
const NetworkVulnerabilitiesDetail = () => {
  const { t } = useTranslation();
  const { scanId } = useParams<{
    scanId?: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const networkScanOverview: Scan = useSelector(
    (state: any) => state.networkScanReducer.networkScanDetail,
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchNetworkScanDetail(scanId!));
      } catch (error) {
        console.error('error', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, scanId]);

  const [selectedScan, setSelectedScan] = useState<string | null>(null);

  const Overview: React.FC<{ overview: Scan }> = ({ overview }) => {
    return (
      <>
        <DashboardCard>
          <Box>
            <Box display={'flex'}>
              <Typography color="textPrimary">{t('vulnerabilities.name')} </Typography>
              <Typography color="textPrimary">: {overview?.name || 'NA'}</Typography>
            </Box>
            <Box display={'flex'} mt={2}>
              <Typography color="textPrimary">{t('vulnerabilities.id')} </Typography>
              <Typography color="textPrimary">: {overview?.id || 'NA'}</Typography>
            </Box>
            <Box display={'flex'} mt={2}>
              <Typography color="textPrimary">{t('vulnerabilities.status')} </Typography>
              <Typography color="textPrimary">: {overview?.status || 'NA'}</Typography>
            </Box>
          </Box>
        </DashboardCard>
      </>
    );
  };

  const Target: React.FC<{ target: Scan }> = ({ target }) => {
    return (
      <>
        <DashboardCard>
          <Box>
            <Box display={'flex'}>
              <Typography color="textPrimary">{t('vulnerabilities.name')} </Typography>
              <Typography color="textPrimary">: {target?.target.name || 'NA'}</Typography>
            </Box>
            <Box display={'flex'} mt={2}>
              <Typography color="textPrimary">{t('vulnerabilities.hosts')} </Typography>
              <Typography color="textPrimary">: {target?.target.hosts || 'NA'}</Typography>
            </Box>
          </Box>
        </DashboardCard>
      </>
    );
  };

  const Scanner: React.FC<{ scanner: Scan }> = ({ scanner }) => {
    return (
      <>
        <DashboardCard>
          <Box>
            <Box display={'flex'}>
              <Typography color="textPrimary">{t('vulnerabilities.name')} </Typography>
              <Typography color="textPrimary">: Akila Scan360 </Typography>
            </Box>
            <Box display={'flex'} mt={2}>
              <Typography color="textPrimary">{t('vulnerabilities.type')} </Typography>
              <Typography color="textPrimary">: {scanner?.scanner.type || 'NA'}</Typography>
            </Box>
            <Box display={'flex'} mt={2}>
              <Typography color="textPrimary">
                {t('vulnerabilities.scan_configuration')}{' '}
              </Typography>
              <Typography color="textPrimary">: {scanner?.config.name || 'NA'}</Typography>
            </Box>
            <Box display={'flex'} mt={2}>
              <Typography color="textPrimary">
                {t('vulnerabilities.order_for_target_hosts')}{' '}
              </Typography>
              <Typography color="textPrimary">: {scanner?.hosts_ordering || 'NA'}</Typography>
            </Box>
          </Box>
        </DashboardCard>
      </>
    );
  };
  const COMMON_TAB = [
    {
      value: 'overview',
      icon: <DashboardIcon />,
      label: `${t('vulnerabilities.overview')}`,
      disabled: false,
      content: <Overview overview={networkScanOverview}></Overview>,
    },
    {
      value: 'target',
      icon: <LocationOnIcon />,
      label: `${t('vulnerabilities.target')}`,
      disabled: false,
      content: <Target target={networkScanOverview}></Target>,
    },
    {
      value: 'scanner',
      icon: <SearchIcon />,
      label: `${t('vulnerabilities.scanner')}`,
      disabled: false,
      content: <Scanner scanner={networkScanOverview}></Scanner>,
    },
    {
      value: 'reports',
      icon: <RuleFolder />,
      label: `${t('vulnerabilities.reports')}`,
      disabled: false,
      content: <NetworkVulnerabilities showHeader={false} />,
    },
  ];

  useEffect(() => {
    setSelectedScan(scanId ? String(scanId) : null);
  }, [scanId, location]);

  const [value, setValue] = useState('overview');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <PageContainer title="Darwin's project">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/vulnerabilities/network/scans">
              {t('vulnerabilities.breadcrumb_vulnerabilidades')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/vulnerabilities/network/scans">
              {t('vulnerabilities.breadcrumb_red')}
            </Link>
            {selectedScan && (
              <Link
                component={RouterLink}
                color="inherit"
                to={`/vulnerabilities/network/scans/detail/${selectedScan}`}
              >
                {t('vulnerabilities.detail')}
              </Link>
            )}
            {selectedScan && <Typography color="textPrimary">{selectedScan}</Typography>}
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Pestañas */}
      <Box mt={3}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Loader />
          </Box>
        ) : (
          <>
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
                      label={<>{tab.label}</>}
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
          </>
        )}
      </Box>
    </PageContainer>
  );
};

export default NetworkVulnerabilitiesDetail;
