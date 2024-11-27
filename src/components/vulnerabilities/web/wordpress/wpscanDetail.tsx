import TranslateIcon from '@mui/icons-material/Translate';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Chip,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchWPScanById } from "src/store/vulnerabilities/web/WPScanSlice";
import PluginVersionTable from './pluginVersionTable';
import WpScanTopCards from './wpScantopCards';
import WpScanTopBar from './wpscanTopBar';
import WPSFindings from './wpscansFindings';
import WPSMainTheme from './wpscanMainTheme';

const WpScanDetail: React.FC<{ scanId: string; onAlertClick: (alertId: string) => void }> = ({
  scanId,
  onAlertClick,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const wpscan = useSelector((state: any) => state.wpscanReducer.wpscan);

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
  }, [dispatch, scanId]);

  console.log(wpscan)

  const dataCards = [
    { severity: 'critical', value: wpscan?.vulnerabilities.length || 0 },
    { severity: 'high', value: wpscan?.plugins_list.length || 0 },
    { severity: 'medium', value: wpscan?.users.length || 0 },
    { severity: 'low', value: wpscan?.interesting_findings.length || 0 },
  ];

  return (
    <Grid container spacing={3}>
      {/* Scan Metadata Section */}
      <Grid item xs={12} xl={12}>
        {wpscan && (
          <WpScanTopCards data={dataCards} />
        )}
      </Grid>
      <Grid item xs={12} xl={6}>
        <DashboardCard>
          <PluginVersionTable />
        </DashboardCard>
      </Grid>

      <Grid item xs={12} xl={6}>
        <WpScanTopBar scan_name={"a"} status={"a"} version={"a"} site_url={"a"} effective_url={"a"} />
        <WPSMainTheme />
      </Grid>
      {/* Alerts Table Section */}
      <Grid item xs={12} xl={12}>
        <WPSFindings />
      </Grid>
    </Grid>
  );
};

export default WpScanDetail;
