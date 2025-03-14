import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Stack, Typography } from "@mui/material";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Loader from 'src/components/shared/Loader/Loader';
import CloudScanFindings from 'src/components/vulnerabilities/cloud/cloudScanFindings';
import CloudScanSummaryService from 'src/components/vulnerabilities/cloud/cloudScanServiceSummary';
import CloudScanTopBar from 'src/components/vulnerabilities/cloud/cloudScanTopBar';
import CloudScanTopCards from 'src/components/vulnerabilities/cloud/cloudScanTopCards';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchCloudScanById } from 'src/store/vulnerabilities/cloud/CloudSlice';


const CloudVulnerabilitiesDetails = () => {
  const { cloudId } = useParams<{ cloudId?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cloudscan = useSelector((state: any) => state.cloudScanReducer.cloudScanDetails);
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();

  React.useEffect(() => {
    const fetchData = async () => {
      if (cloudId) {
        try {
          setIsLoading(true);
          await dispatch(fetchCloudScanById(cloudId));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching cloudscans:', error);
        }
      }
    };

    fetchData();
  }, [cloudId, dispatch]);

  let overview = {}
  if (cloudscan) {
    overview = {
      timestamp: cloudscan?.timestamp,
      version: cloudscan?.version,
      cloud_id: cloudscan?.cloud_id,
      provider: cloudscan?.provider,
    }
  }

  return (
    <PageContainer title="Darwin's project">
      <Box mb={1}>
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
            <Typography color="textPrimary">
              {cloudscan?.cloud_id}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
              <Loader />
            </Box>
          ) : (
            <Grid container>
              <Grid item xs={12} xl={12}>
                <CloudScanTopBar overview={overview} />
              </Grid>

              <Stack spacing={3}>
                {/* Top Cards */}
                <Grid item xs={12} xl={12}>
                  <CloudScanTopCards statistics={cloudscan?.statistics} />
                </Grid>

                {/* Service Summary */}
                <Grid item xs={12} xl={12}>
                  <CloudScanSummaryService services={cloudscan?.services} />
                </Grid>

                {/* Reports Table */}
                <Grid item xs={12} xl={12}>
                  <CloudScanFindings findings={cloudscan?.findings} />
                </Grid>
              </Stack>


            </Grid>
          )}
        </Grid>
      </Grid>

    </PageContainer>
  );
};


export default CloudVulnerabilitiesDetails;
