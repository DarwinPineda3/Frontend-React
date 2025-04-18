import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import EHReportList from 'src/components/vulnerabilities/redteam/EHReportsList';



const EHReport = () => {
  const { t } = useTranslation();
  const { ehReportId } = useParams<{ ehReportId?: string }>();
  const location = useLocation();

  const [selectedEHReport, setSelectedEHReport] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (ehReportId) {
      setSelectedEHReport(ehReportId);
    } else {
      setSelectedEHReport(null);
    }

  }, [ehReportId, location]);

  const handleEHReportClick = (id: string) => {
    navigate(`/vulnerabilities/redteam/${id}`);
  };
  return (
    <PageContainer title="Darwin's project">
      <Box display="flex" alignItems="center" mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} color="inherit" to="/vulnerabilities/redteam">
            {t("menu.vulnerabilities")}
          </Link>
          <Typography color="textPrimary">
            {t("menu.redteam")}
          </Typography>

        </Breadcrumbs>
      </Box>
      <Grid container spacing={0} mt={2}>
        <Grid item xs={12} lg={12}>
          <EHReportList onEHReportClick={handleEHReportClick} />
        </Grid>
      </Grid>
    </PageContainer>

  );
};

export default EHReport;