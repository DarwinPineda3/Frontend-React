import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, Grid, IconButton, Breadcrumbs, Link } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudScanTable from 'src/components/vulnerabilities/cloud/cloudScansTable';
import CloudScanDetailView from 'src/components/vulnerabilities/cloud/cloudScanDetailView';
import { useTranslation } from 'react-i18next';


const CloudVulnerabilities = () => {
  // Get params from the URL
  const { cloudId } = useParams<{cloudId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();  // Tracks the current URL location
  
  const [ selectedCloud , setSelectedCloud] = useState<string | null>(null);

  const { t } = useTranslation();
  // Synchronize state with URL parameters
  useEffect(() => {
    if (cloudId) {
      setSelectedCloud(cloudId);
    } else {
      setSelectedCloud(null);
    }
  }, [cloudId, location]);

  // Handle navigating to an alert detail
  const handleCloudClick = (cloudId: string) => {
    navigate(`/vulnerabilities/cloud/vulnerabilities/${cloudId}`);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} color="inherit" to="/vulnerabilities/cloud">
            {t('vulnerabilities.vulnerabilities')}
          </Link>
          <Link component={RouterLink} color="inherit" to="/vulnerabilities/cloud">
            {t('vulnerabilities.cloud')}
        
          </Link>
        </Breadcrumbs>
      </Box>

      {/* If a vulnerability is selected, show the vulnerability detail */}
      {selectedCloud ? (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <CloudScanDetailView />
          </Grid>
        </Grid>
      ) : (
        // Default view: show scan list
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} xl={12}>
            <CloudScanTable onScanClick={handleCloudClick} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};


export default CloudVulnerabilities;
