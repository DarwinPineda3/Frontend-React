import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';

import MobileAppDetail from 'src/components/home/monitoring/mobile-apps/MobileAppDetail';
import MobileAppList from 'src/components/home/monitoring/mobile-apps/MobileAppResultList';
// import MalwareAnalysisDetail from "src/components/home/malwareAnalyses/MalwareAnalysisDetail";

const MobileApp = () => {
  const { t } = useTranslation();
  const { mobileAppId } = useParams<{ mobileAppId?: string }>();
  const dispatch = useDispatch();
  const location = useLocation(); // Tracks the current URL location

  const [selectedMobileApp, setSelectedMobileApp] = useState<string | null>(null);
  const [selectedMobileAppName, setselectedMobileAppName] = useState<string | null>(null);
  const navigate = useNavigate();
  const mobileAppDetails = useSelector((state: any) => state.mobileAppsReducer.mobileAppDetails);

  // Synchronize state with URL parameters
  useEffect(() => {
    if (mobileAppId) {
      setSelectedMobileApp(mobileAppId);
      // dispatch(fetchMobielAppById(mobileAppId));
    } else {
      setSelectedMobileApp(null);
    }
  }, [mobileAppId, location, dispatch]);

  const handleMobileAppClick = (id: number, appName: string) => {
    setselectedMobileAppName(appName);
    navigate(`/monitoring/cyber-guard/mobile-apps/${id}/results/${id}`);
  };
  return (
    <Box>
      <Box display="flex" alignItems="center" mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard/mobile-apps">
            {t('menu.monitoring')}
          </Link>
          <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard/mobile-apps">
            {t('menu.cyber_guard')}
          </Link>
          <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard/mobile-apps">
            {t('mobile_apps.mobile_apps')}
          </Link>
          {selectedMobileAppName ? (
            <Link
              component={RouterLink}
              color="inherit"
              to={`/monitoring/cyber-guard/mobile-apps/${selectedMobileAppName}`}
            >
              {t('mobile_apps.results_app_scans')}
            </Link>
          ) : (
            <Typography color="textPrimary">{t('mobile_apps.results_app_scans')}</Typography>
          )}
          {selectedMobileApp && (
            <Typography color="textPrimary">{selectedMobileAppName}</Typography>
          )}
        </Breadcrumbs>
      </Box>
      {selectedMobileApp ? (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <MobileAppDetail mobileAppId={selectedMobileApp!} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} lg={12}>
            {/* <AssetsCards/> */}
          </Grid>
          <Grid item xs={12} lg={12}>
            <MobileAppList onMobileAppClick={handleMobileAppClick} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default MobileApp;
