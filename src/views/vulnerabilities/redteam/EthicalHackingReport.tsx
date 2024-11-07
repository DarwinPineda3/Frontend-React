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
  const location = useLocation();  // Tracks the current URL location

  const [selectedEHReport, setSelectedEHReport] = useState<string | null>(null);
  const navigate = useNavigate();

  // Synchronize state with URL parameters
  useEffect(() => {
    if (ehReportId) {
      setSelectedEHReport(ehReportId);
    } else {
      setSelectedEHReport(null);
    }

  }, [ehReportId, location]);

  const handleEHReportClick = (id: number) => {
    // navigate(`/monitoring/cyber-guard/mobile-apps/${id}`); //ruta hacia el siguiente listado
  };
  return (
    <PageContainer title="Akila">
      <Box display="flex" alignItems="center" mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} color="inherit" to="/vulnerabilities/redteam">
            {t("menu.vulnerabilities")}
          </Link>
          <Link component={RouterLink} color="inherit" to="/vulnerabilities/redteam">
            {t("menu.redteam")}
          </Link>
          <Typography color="textPrimary">
            {t("redteam.ethical_hacking_reports")}
          </Typography>

        </Breadcrumbs>
      </Box>
      <Grid container spacing={0} mt={1}>
        <Grid item xs={12} lg={12}>
          {/* <AssetsCards/> */}
        </Grid>
        <Grid item xs={12} lg={12}>
          <EHReportList onEHReportClick={handleEHReportClick}/>
        </Grid>
      </Grid>
    </PageContainer>

  );
};

export default EHReport;