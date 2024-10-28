import PageContainer from "src/components/container/PageContainer";
import { useState, useEffect } from "react";
import { Box, Grid, IconButton, Breadcrumbs, Link, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';

import MobileAppList from "src/components/home/monitoring/fake-apps/MobileAppList";
// import MalwareAnalysisDetail from "src/components/home/malwareAnalyses/MalwareAnalysisDetail";



const FakeApp = () => {

    const { mobileAppId } = useParams<{ mobileAppId?: string }>();
    const location = useLocation();  // Tracks the current URL location

    const [selectedMobileApp, setSelectedMobileApp] = useState<string | null>(null);
    const navigate = useNavigate();

    // Synchronize state with URL parameters
    useEffect(() => {
        if (mobileAppId) {
            setSelectedMobileApp(mobileAppId);
        } else {
            setSelectedMobileApp(null);
        }

    }, [mobileAppId, location]);

    const handleMobileAppClick = (id: string) => {
        navigate(`/monitoring/fake-app/${id}`);
    };
    return (
        <Box>
            <Box display="flex" alignItems="center" mt={2}>
                <IconButton onClick={() => navigate(-1)} color="primary">
                    <ArrowBackIcon />
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link component={RouterLink} color="inherit" to="/monitoring/fake-app">
                        Monitoreo
                    </Link>
                    {selectedMobileApp && (
                        <Typography color="textPrimary">
                            Detalle app móvil
                        </Typography>
                    )}
                </Breadcrumbs>
            </Box>
            {selectedMobileApp ? (
                <Grid container spacing={0} mt={1}>
                    <Grid item xs={12} xl={12}>
                        {/* <MalwareAnalysisDetail mobileAppId={selectedMobileApp!} /> */}
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

export default FakeApp;