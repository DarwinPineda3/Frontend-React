import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, Grid, IconButton, Breadcrumbs, Link } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ObservedAssetsTable from 'src/components/observability/assets/ObservedAssetsTableView';
import ObservedAssetDetail from 'src/components/observability/assets/ObservedAssetDetail';

const ObservedAssets = () => {
  // Get params from the URL
  const { id: id } = useParams<{ id?: string}>();
  const navigate = useNavigate();
  const location = useLocation();  // Tracks the current URL location
  
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  // Synchronize state with URL parameters
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
    <Box>
      <Box display="flex" alignItems="center" mt={2}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} color="inherit" to="/observability/observed-assets">
            Observabilidad
          </Link>
          <Link component={RouterLink} color="inherit" to="/observability/observed-assets">
            Assets
          </Link>
          {selectedAsset && (
            <Link component={RouterLink} color="inherit" to={`/observability/observed-assets/assets/${selectedAsset}`}>
              Escaneos observabilidad Red
            </Link>
          )}
        </Breadcrumbs>
      </Box>

      {selectedAsset? (
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12} xl={12}>
            <ObservedAssetDetail id={selectedAsset!} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} xl={12}>
            <ObservedAssetsTable onScanClick={handleScanClick} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ObservedAssets;



