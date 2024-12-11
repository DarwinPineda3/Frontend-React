import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link } from "@mui/material";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import CloudScanDetailView from 'src/components/vulnerabilities/cloud/cloudScanDetailView';


const CloudVulnerabilitiesDetails = () => {
  // Get params from the URL
  const { cloudId } = useParams<{ cloudId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();  // Tracks the current URL location

  const [selectedCloud, setSelectedCloud] = useState<string | null>(null);

  const { t } = useTranslation();
  // Synchronize state with URL parameters
  useEffect(() => {
    if (cloudId) {
      setSelectedCloud(cloudId);
    } else {
      setSelectedCloud(null);
    }
  }, [cloudId, location]);

  return (
    <PageContainer title="Akila">
      <Box mb={2}>
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
      </Box>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <CloudScanDetailView />
        </Grid>
      </Grid>

    </PageContainer>
  );
};


export default CloudVulnerabilitiesDetails;
