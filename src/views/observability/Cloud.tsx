import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, Grid, IconButton, Breadcrumbs, Link, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NetworkScanListTable from 'src/components/observability/network/networkScans';
import NetworkScanDetail from 'src/components/observability/network/networkScanDetail';
import CloudScansTable from 'src/components/observability/cloud/cloudScans';
import CloudScansDetailObs from 'src/components/observability/cloud/cloudScanDetail';
import { useTranslation } from 'react-i18next';

const CloudObservability = () => {
  // Get params from the URL
  const { scanId } = useParams<{ scanId?: string}>();
  const navigate = useNavigate();
  const location = useLocation();  // Tracks the current URL location
  
  const [selectedScan, setSelectedScan] = useState<string | null>(null);

  const {t} = useTranslation();

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
    navigate(`/observability/cloud/scans/${scanId}`);
  };
  return (
    <Box>
      <Box display="flex" alignItems="center" mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} color="inherit" to="/observability/cloud">
          {t('menu.observability')}
          </Link>
          <Link component={RouterLink} color="inherit" to="/observability/cloud">
          {t('menu.cloud')}
          </Link>
          {selectedScan && (
            <Link component={RouterLink} color="inherit" to={`/observability/cloud/scans/${selectedScan}`}>
              {t('observability.cloud_obs_scans')} 
            </Link>
          )}
        </Breadcrumbs>
      </Box>

      {/* If a scan is selected and no alert is selected, show scan details */}
      {selectedScan? (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <CloudScansDetailObs scanId={selectedScan!} />
          </Grid>
        </Grid>
      ) : (
        // Default view: show scan list
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} xl={12}>
            <CloudScansTable onScanClick={handleScanClick} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};



export default CloudObservability;
