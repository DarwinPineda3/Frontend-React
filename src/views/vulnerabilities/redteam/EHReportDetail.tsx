import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import EHReportDetail from 'src/components/vulnerabilities/redteam/EHReportDetail';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchEHReportById } from "src/store/vulnerabilities/redteam/EthicalHackingReportSlice";

const EHReportDetails = () => {
  const { ehReportId } = useParams<{ ehReportId?: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const ehReport = useSelector((state: any) => state.ehReportsReducer.ehReport);
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   dispatch(fetchEHReportById(ehReportId));
  // }, [dispatch, ehReportId]);

  React.useEffect(() => {
    if (ehReportId) {
      dispatch(fetchEHReportById(ehReportId));
    }
  }, [dispatch, ehReportId]);

  return (
    <PageContainer title="Akila">
      <Box display="flex" alignItems="center" mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} color="inherit" to="/vulnerabilities/redteam">
            {t('menu.vulnerabilities')}
          </Link>
          <Link component={RouterLink} color="inherit" to="/vulnerabilities/redteam">
            {t('menu.redteam')}
          </Link>
          <Typography color="textPrimary">
            {t("redteam.ethical_hacking_reports")}
          </Typography>
          {ehReport && (
            <Typography color="textPrimary">{ehReport.name}</Typography>
          )}
        </Breadcrumbs>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={12}>
          <EHReportDetail ehReport={ehReport} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default EHReportDetails;
