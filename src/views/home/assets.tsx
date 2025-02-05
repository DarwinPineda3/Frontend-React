import { ArrowBack } from "@mui/icons-material";
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from "@mui/material";
import { t } from "i18next";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from "src/components/container/PageContainer";
import AssetList from "src/components/home/AssetList";
import AssetsCards from "src/components/home/AssetsCards";

const Assets = () => {
  const navigate = useNavigate();
  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBack />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/home/assets">
              {t('menu.home')}
            </Link>
            <Typography color="textPrimary">{t('compliance_menu.compliance_assets')}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AssetsCards />
        </Grid>
        <Grid item xs={12}>
          <AssetList />
        </Grid>
      </Grid>
    </PageContainer>

  );
};

export default Assets;
