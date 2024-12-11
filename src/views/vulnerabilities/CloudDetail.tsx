import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link } from "@mui/material";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import CloudScanFindings from 'src/components/vulnerabilities/cloud/cloudScanFindings';
import CloudScanSummaryService from 'src/components/vulnerabilities/cloud/cloudScanServiceSummary';
import CloudScanTopBar from 'src/components/vulnerabilities/cloud/cloudScanTopBar';
import CloudScanTopCards from 'src/components/vulnerabilities/cloud/cloudScanTopCards';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchCloudScanById } from 'src/store/vulnerabilities/cloud/CloudSlice';


const CloudVulnerabilitiesDetails = () => {
  const { cloudId } = useParams<{ cloudId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const cloudscan = useSelector((state: any) => state.cloudScanReducer.cloudScanDetails);

  const { t } = useTranslation();

  React.useEffect(() => {
    const fetchData = async () => {
      if (cloudId) {
        try {
          await dispatch(fetchCloudScanById(cloudId));
        } catch (error) {
          console.error('Error fetching wpscans:', error);
        }
      }
    };

    fetchData();
  }, [cloudId, dispatch]);

  console.log(cloudscan);


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
          <Grid container spacing={3}>
            <Grid item xs={12} xl={12}>
              <CloudScanTopBar />
            </Grid>

            {/* Top Cards */}
            <Grid item xs={12} xl={12}>
              <CloudScanTopCards />
            </Grid>

            {/* Service Summary */}
            <Grid item xs={12} xl={12}>
              <CloudScanSummaryService />
            </Grid>

            {/* Reports Table */}
            <Grid item xs={12} xl={12}>
              <CloudScanFindings />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </PageContainer>
  );
};


export default CloudVulnerabilitiesDetails;
