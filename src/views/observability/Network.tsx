import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link } from "@mui/material";
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import NetworkScanDetail from 'src/components/observability/network/networkScanDetail';
import NetworkScanListTable from 'src/components/observability/network/networkScans';

const NetworkObservability = () => {
    // Get params from the URL
    const { scanId } = useParams<{ scanId?: string }>();
    const navigate = useNavigate();
    const location = useLocation();  // Tracks the current URL location

    const [selectedScan, setSelectedScan] = useState<string | null>(null);

    // Synchronize state with URL parameters
    useEffect(() => {
        if (scanId) {
            setSelectedScan(scanId);
        } else {
            setSelectedScan(null);
        }
    }, [scanId, location]);


    // Handle navigating to a scan detail
    const handleScanClick = (scanId: string) => {
        navigate(`/observability/network/scans/${scanId}`);
    };
    return (
        <PageContainer title="Akila">
            <Box mb={2}>
                <Box display="flex" alignItems="center" mt={2}>
                    <IconButton onClick={() => navigate(-1)} color="primary">
                        <ArrowBackIcon />
                    </IconButton>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link component={RouterLink} color="inherit" to="/observability/network">
                            Observabilidad
                        </Link>
                        <Link component={RouterLink} color="inherit" to="/observability/network">
                            Red
                        </Link>
                        {selectedScan && (
                            <Link component={RouterLink} color="inherit" to={`/observability/network/scans/${selectedScan}`}>
                                Escaneos observabilidad Red
                            </Link>
                        )}
                    </Breadcrumbs>
                </Box>
            </Box>

            {/* If a scan is selected and no alert is selected, show scan details */}
            {selectedScan ? (
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <NetworkScanDetail scanId={selectedScan!} />
                    </Grid>
                </Grid>
            ) : (
                // Default view: show scan list
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <NetworkScanListTable onScanClick={handleScanClick} />
                    </Grid>
                </Grid>
            )}
        </PageContainer>
    );
};

export default NetworkObservability;


