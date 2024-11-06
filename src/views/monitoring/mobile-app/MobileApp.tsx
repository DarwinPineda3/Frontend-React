import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "src/store/Store";

import MobileAppDetail from 'src/components/home/monitoring/mobile-apps/MobileAppDetail';
import MobileAppList from 'src/components/home/monitoring/mobile-apps/MobileAppResultList';
import { fetchMobileAppById } from 'src/store/sections/mobile-app/MobileAppSlice';
// import { fetchResultAppById } from 'src/store/sections/mobile-app/ResultAppSlice';
import { fetchResultAppById } from 'src/store/sections/mobile-app/ResultAppSlice';
import Error from "src/views/general/Error";


const MobileApp = () => {
  const { t } = useTranslation();
  const { appScanId } = useParams<{ appScanId?: string }>();
  const { resultAppId } = useParams<{ resultAppId?: string }>();

  const dispatch = useDispatch();
  const location = useLocation();

  const [selectedMobileAppId, setSelectedMobileAppId] = useState<string | null>(null);
  const navigate = useNavigate();
  const mobileAppResults = useSelector((state: any) => state.mobileAppsReducer?.mobileAppResults);
  const appResultDetail = useSelector((state: any) => state.resultAppsReducer?.appResultDetail);
  const error = useSelector((state: any) => state.resultAppsReducer?.error);

  useEffect(() => {
    if (resultAppId) {
      dispatch(fetchResultAppById(resultAppId));
    }
    if (appScanId) {
      dispatch(fetchMobileAppById(appScanId));
    }

  }, [appScanId, resultAppId, location]);

  const handleMobileAppClick = async (id: string) => {
    setSelectedMobileAppId(id);
    navigate(`/monitoring/cyber-guard/mobile-apps/${appScanId}/results/${id}`);
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
          {mobileAppResults && (
            resultAppId ? [
              <Link
                key="appNameLink"
                component={RouterLink}
                color="inherit"
                to={`/monitoring/cyber-guard/mobile-apps/${appScanId}`}
              >
                {mobileAppResults.name}
              </Link>
            ] : [
              <Typography key="appNameText" color="textPrimary">
                {mobileAppResults.name}
              </Typography>
            ]
          )}
          {appResultDetail && resultAppId && (
            <Typography key="appNameText" color="textPrimary">
              {appResultDetail.appName} ({appResultDetail.source})
            </Typography>
          )

          }
        </Breadcrumbs>
      </Box>
      {resultAppId ? (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            {appResultDetail ? (

              <MobileAppDetail resultAppDetail={appResultDetail} />
            ) : (
              error && (
                <Error></Error>
              )
            )
            }
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} lg={12}>
            {mobileAppResults && (
              <MobileAppList results={mobileAppResults.results} onMobileAppClick={handleMobileAppClick} />
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default MobileApp;
