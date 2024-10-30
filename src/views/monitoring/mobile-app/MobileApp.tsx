import PageContainer from "src/components/container/PageContainer";
import { useState, useEffect } from "react";
import { Box, Grid, IconButton, Breadcrumbs, Link, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import MobileAppList from "src/components/home/monitoring/mobile-apps/MobileAppResultList";
import MobileAppDetail from "src/components/home/monitoring/mobile-apps/MobileAppDetail";
// import MalwareAnalysisDetail from "src/components/home/malwareAnalyses/MalwareAnalysisDetail";



const MobileApp = () => {
    const { t } = useTranslation();
    const { mobileAppId } = useParams<{ mobileAppId?: string }>();
    const location = useLocation();  // Tracks the current URL location

    const [selectedMobileApp, setSelectedMobileApp] = useState<string | null>(null);
    const [selectedMobileAppName, setselectedMobileAppName] = useState<string | null>(null);
    const navigate = useNavigate();

    // Synchronize state with URL parameters
    useEffect(() => {
        if (mobileAppId) {
            setSelectedMobileApp(mobileAppId);
        } else {
            setSelectedMobileApp(null);
        }

    }, [mobileAppId, location]);

    const handleMobileAppClick = (id: number, appName: string) => {
        setselectedMobileAppName(appName);
        navigate(`/monitoring/cyber-guard/mobile-apps/scan-app/${id}/result-app/${id}`);
    };
    return (
        <Box>
            <Box display="flex" alignItems="center" mt={2}>
                <IconButton onClick={() => navigate(-1)} color="primary">
                    <ArrowBackIcon />
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard/mobile-apps">
                        {t("menu.monitoring")}
                    </Link>
                    <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard/mobile-apps">
                        {t("menu.cyber_guard")}
                    </Link>
                    <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard/mobile-apps">
                        {t("mobile_apps.mobile_apps")}
                    </Link>
                    <Link component={RouterLink} color="inherit" to={`/monitoring/cyber-guard/mobile-apps/scan-app/${selectedMobileApp}`}>
                        {t("mobile_apps.results_app_scans")}
                    </Link>
                    {selectedMobileApp && (
                        <Typography color="textPrimary">
                            {selectedMobileAppName}
                        </Typography>
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