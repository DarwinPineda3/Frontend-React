import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, Grid, IconButton, Breadcrumbs, Link } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ObservedAssetsTable from 'src/components/observability/assets/ObservedAssetsTableView';
import ObservedAssetDetail from 'src/components/observability/assets/ObservedAssetDetail';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';

const ObservedAssets = () => {
  // Get params from the URL
  const { id: id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const location = useLocation();  // Tracks the current URL location

  // State to manage the selected asset
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  // State for the date picker
  const [startDate, setStartDate] = useState<Date | null>(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  });
  const [endDate, setEndDate] = useState<Date | null>(new Date());

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
        <Box flexGrow={1} />
        <Box display="flex" alignItems="center" mt={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              renderInput={(props) => (
                <CustomTextField
                  {...props}
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiSvgIcon-root': {
                      width: '18px',
                      height: '18px',
                    },
                    '& .MuiFormHelperText-root': {
                      display: 'none',
                    },
                  }}
                />
              )}
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
            />
          </LocalizationProvider>
          -
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              renderInput={(props) => (
                <CustomTextField
                  {...props}
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiSvgIcon-root': {
                      width: '18px',
                      height: '18px',
                    },
                    '& .MuiFormHelperText-root': {
                      display: 'none',
                    },
                  }}
                />
              )}
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      {selectedAsset ? (
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



