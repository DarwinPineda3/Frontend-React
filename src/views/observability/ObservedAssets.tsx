import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Breadcrumbs, Grid, IconButton, Link, Typography} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import ObservedAssetDetail from 'src/components/observability/assets/ObservedAssetDetail';
import ObservedAssetsTable from 'src/components/observability/assets/ObservedAssetsTableView';

const ObservedAssets = () => {
  // Get params from the URL
  const { id: id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const location = useLocation(); // Tracks the current URL location
  const { t } = useTranslation();

  // State to manage the selected asset
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setSelectedAsset(id);
    } else {
      setSelectedAsset(null);
    }
  }, [id, location]);

  // Handle navigating to a scan detail
  const handleScanClick = (assetId: string) => {
    navigate(`/observability/observed-assets/assets/${assetId}`);
  };
  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="inherit" to="/observability/observed-assets">
              {t('menu.observability')}
            </Link>
            {selectedAsset ? (
              <Link
                component={RouterLink}
                color="inherit"
                to={`/observability/observed-assets/assets/${selectedAsset}`}
              >
                {t('menu.assets')}
              </Link>
            ) : (
              <Typography color="textPrimary">{t('menu.assets')}</Typography>
            )}
            {selectedAsset && (
              <Typography color="textPrimary">{selectedAsset}</Typography>
            )}
          </Breadcrumbs>
          <Box flexGrow={1} />
        </Box>
      </Box>

      {selectedAsset ? (
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <ObservedAssetDetail id={selectedAsset!} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ObservedAssetsTable onScanClick={handleScanClick} />
          </Grid>
        </Grid>
      )}
    </PageContainer>
  );
};

export default ObservedAssets;
