import PageContainer from "src/components/container/PageContainer";
import { useState, useEffect } from "react";
import { Box, Grid, IconButton, Breadcrumbs, Link, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';

import MobileAppList from "src/components/home/monitoring/mobile-apps/MobileAppResultList";
import AppScansList from "src/components/home/monitoring/mobile-apps/MobileAppScansList";

// import MalwareAnalysisDetail from "src/components/home/malwareAnalyses/MalwareAnalysisDetail";



const MobileApp = () => {

    const { appScanId, mobileAppId } = useParams<{ mobileAppId?: string, AppScanId?: string }>();
    const location = useLocation();  // Tracks the current URL location
    const navigate = useNavigate();

    const [selectedMobileApp, setSelectedMobileApp] = useState<number | null>(null);
    const [selectedAppScan, setSelectedAppScan] = useState<number | null>(null);

    // Synchronize state with URL parameters
    useEffect(() => {
        if (mobileAppId) {
            setSelectedMobileApp(Number(mobileAppId));
        } else {
            setSelectedMobileApp(null);
        }

        if (appScanId) {
            setSelectedAppScan(Number(appScanId));
        } else {
            setSelectedAppScan(null);
        }

    }, [mobileAppId, appScanId, location]);

    // Handle navigating to an mobile results detail
    const handleMobileAppClick = (mobileAppId: number) => {
        navigate(`/monitoring/cyber-guard/mobile-app/${selectedAppScan}/result-app/${mobileAppId}`);
    };

    // Handle navigating to a scan detail
    const handleScanAppClick = (appScanId: number) => {
        navigate(`/monitoring/cyber-guard/mobile-app/${appScanId}`);
    };

    // Handle navigating back to the scan list
    const handleBackToScans = () => {
        navigate('/monitoring/cyber-guard/mobile-app');
    };

    // Handle navigating back to the mobile results list
    const handleBackToResults = () => {
        navigate(`/vulnerabilities/web/applications/${selectedAppScan}`);
    };


    return (
        <Box>
            <Box display="flex" alignItems="center" mt={2}>
                <IconButton onClick={() => navigate(-1)} color="primary">
                    <ArrowBackIcon />
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard">
                        Monitoring
                    </Link>
                    <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard/mobile-app">
                        Cyber Guard
                    </Link>
                    {selectedAppScan && (
                        <Link component={RouterLink} color="inherit" to={`/monitoring/cyber-guard/mobile-app/scan-app/${selectedAppScan}`}>
                            App scans
                        </Link>
                    )}
                    {selectedMobileApp && (
                        <Typography color="textPrimary">
                            Mobile results
                        </Typography>
                    )}
                </Breadcrumbs>
            </Box>

            {/* If a scan is selected and no mobile results is selected, show scan details */}
            {selectedAppScan && !selectedMobileApp ? (
                <Grid container spacing={0} mt={1}>
                    <Grid item xs={12} xl={12}>
                        {/* <ScanListDetail scanId={selectedAppScan!} onAlertClick={handleBackToResults} /> detail mobile app */}
                        <MobileAppList onMobileAppClick={handleMobileAppClick} />
                    </Grid>
                </Grid>
            ) : selectedMobileApp ? (
                // If an mobile results is selected, show mobile results detail
                <Grid container spacing={0} mt={1}>
                    <Grid item xs={12} xl={12}>
                        {/* <AlertDetail alertId={selectedMobileApp} /> */}
                    </Grid>
                </Grid>
            ) : (
                // Default view: show scan list
                <Grid container spacing={3} mt={1}>
                    <Grid item xs={12} xl={12}>
                        {/* <AppScansList onScanClick={handleBackToScans} /> index scans */}
                    </Grid>
                </Grid>
            )}
        </Box>

    );
};

export default MobileApp;