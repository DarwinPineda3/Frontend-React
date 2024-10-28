import { Grid, Box, IconButton, Breadcrumbs, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageContainer from 'src/components/container/PageContainer';
import ParameterList from 'src/components/home/monitoring/cyber-guard/parameters/ParameterList';

const Parameters = () => {
  const navigate = useNavigate();

  return (
    <PageContainer title="Akila">
      <Box mb={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              component={RouterLink}
              color="inherit"
              to="/monitoring/cyber-guard/brand-monitoring"
            >
              Monitoring
            </Link>
            <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard/parameters">
              Cyber Guard
            </Link>
            <Link component={RouterLink} color="inherit" to="/monitoring/cyber-guard/parameters">
              Parameters
            </Link>
          </Breadcrumbs>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}></Grid>
        <Grid item xs={12} lg={12}>
          <ParameterList />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Parameters;
