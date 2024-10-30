import PageContainer from "src/components/container/PageContainer";
import AppScanList from "src/components/home/monitoring/mobile-apps/MobileAppScansList";
import { useState, useEffect } from "react";
import { Box, Grid, IconButton, Breadcrumbs, Link, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';




const AppScan = () => {

    const { appScanId } = useParams<{ appScanId?: string }>();
    const location = useLocation();  // Tracks the current URL location

    const [selectedAppScan, setSelectedAppScan] = useState<string | null>(null);
    const navigate = useNavigate();

    // Synchronize state with URL parameters
    useEffect(() => {
        if (appScanId) {
            setSelectedAppScan(appScanId);
        } else {
            setSelectedAppScan(null);
        }

    }, [appScanId, location]);

    const handleAppScanClick = (id: number) => {
        navigate(`/monitoring/cyber-guard/mobile-app/scan-app/${id}`); //ruta hacia el siguiente listado
    };
    return (
        <Box>
            <Box display="flex" alignItems="center" mt={2}>
                <IconButton onClick={() => navigate(-1)} color="primary">
                    <ArrowBackIcon />
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard/mobile-app">
                        Monitoring
                    </Link>
                    <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard/mobile-app">
                        Cyber Guard
                    </Link>
                    <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard/mobile-app">
                        Mobile Apps
                    </Link>

                </Breadcrumbs>
            </Box>
            <Grid container spacing={0} mt={1}>
                <Grid item xs={12} lg={12}>
                    {/* <AssetsCards/> */}
                </Grid>
                <Grid item xs={12} lg={12}>
                    <AppScanList onAppScanClick={handleAppScanClick} />
                </Grid>
            </Grid>
        </Box>

    );
};

export default AppScan;