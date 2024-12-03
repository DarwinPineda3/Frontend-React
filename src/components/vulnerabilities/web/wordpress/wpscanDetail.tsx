import {
  Box,
  Grid
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'src/store/Store';

// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import ListIcon from '@mui/icons-material/List';
// import GlobeIcon from '@mui/icons-material/Public';
import { useParams } from 'react-router';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchWPScanById } from 'src/store/vulnerabilities/web/WPScanSlice';
import WPSFindings from './wpscanFindings';
import WPSMainTheme from './wpscanMainTheme';
// import WPSOverview from './wpscanOverview';
import WPSPlugins from './wpscanPlugings';
import WpScanTopBar from './wpscanTopBar';
// import WpScanTopCards from './wpScantopCards';
import DashboardCard from 'src/components/shared/DashboardCard';
import WpScanTopCards from './wpScantopCards';


const WpScanDetail: React.FC = () => {
  const { scanId } = useParams<{ scanId?: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const wpscan = useSelector((state: any) => state.wpscanReducer.wpscan);
  const isLoading = useSelector((state: any) => state.wpscanReducer.isLoading);
  const error = useSelector((state: any) => state.wpscanReducer.error);



  React.useEffect(() => {
    const fetchData = async () => {
      if (scanId) {
        try {
          await dispatch(fetchWPScanById(scanId));
        } catch (error) {
          console.error('Error fetching wpscans:', error);
        }
      }
    };

    fetchData();
  }, [scanId, dispatch]);

  const usersCount = wpscan?.users ? Object.keys(wpscan.users).length : 0;

  const wpscanData: { severity: 'critical' | 'high' | 'medium' | 'low'; value: string }[] = [
    { severity: 'critical', value: wpscan?.count_vulnerabulities || 0 },
    { severity: 'high', value: wpscan?.count_outdated_plugins || 0 },
    { severity: 'medium', value: usersCount.toString() },
    { severity: 'low', value: wpscan?.interesting_findings.length || 0 },
  ];



  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Loader />
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {/* Scan Metadata Section */}
      <Grid item xs={12} xl={12}>
        <WpScanTopCards data={wpscanData} />
      </Grid>
      <Grid item xs={12} xl={6}>
          <WPSPlugins plugins_list={wpscan?.plugins_list} />
      </Grid>

      <Grid item xs={12} xl={6}>
        <WpScanTopBar status={wpscan?.version?.status} version={wpscan?.version?.number} site_url={wpscan?.target_url} effective_url={wpscan?.effective_url} />
        
          <WPSMainTheme main_theme={wpscan?.main_theme} />
      </Grid>
      {/* Alerts Table Section */}
      <Grid item xs={12} xl={12}>
        <WPSFindings findings={wpscan?.interesting_findings} />
      </Grid>
    </Grid>
  );
};

export default WpScanDetail;
