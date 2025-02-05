import { ArrowBack } from '@mui/icons-material';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import GiottoAssetsList from 'src/components/compliance/giotto-assets/giottoAssetsList';
import PageContainer from 'src/components/container/PageContainer';

const ComplianceAssetsView = () => {
  const { assetId } = useParams<{ assetId?: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedAsset, setselectedAsset] = useState<string | null>(null);

  useEffect(() => {
    if (assetId) {
      setselectedAsset(assetId);
    } else {
      setselectedAsset(null);
    }
  });

  return (
    <PageContainer title={String(t('compliance_menu.compliance_assets'))}>
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBack />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/compliance/assets">
              {t('compliance_menu.compliance')}
            </Link>
            {selectedAsset ? (
              <Link component={RouterLink} color="inherit" to="/compliance/assets">
                {t('compliance_menu.compliance_assets')}
              </Link>
            ) : (
              <Typography color="textPrimary">{t('compliance_menu.compliance_assets')}</Typography>
            )}
            {selectedAsset && (
              <Typography color="textPrimary">{selectedAsset}</Typography>
            )}
          </Breadcrumbs>

        </Box>
      </Box>
      {
        selectedAsset == null ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <GiottoAssetsList onScanClick={(scanId: string) => navigate(`/compliance/assets/${scanId}`)} />
            </Grid>
          </Grid>
        ) :
          <Grid container spacing={3}>
            <Grid item xs={12}>
              a
            </Grid>
          </Grid>
      }
    </PageContainer>
  );
};

export default ComplianceAssetsView;
