import PageContainer from "src/components/container/PageContainer";
import { Box, Grid, IconButton, Breadcrumbs, Link, Typography } from "@mui/material";
import TechInventoryList from "src/components/monitoring/cti/techinventory/TechInventoryList";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const TechInventory = () => {
    const navigate = useNavigate();

    return (
        <PageContainer title="Akila">
            <Box display="flex" alignItems="center" mt={2}>
                <IconButton onClick={() => navigate(-1)} color="primary">
                    <ArrowBackIcon />
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link component={RouterLink} color="inherit" to="/monitoring/soc/cti/technologies-inventory">
                        Monitoring
                    </Link>
                </Breadcrumbs>
            </Box>
            <Grid container spacing={0} mt={1}>
                <Grid item xs={12} lg={12}>
                    <TechInventoryList/>
                </Grid>
            </Grid>
        </PageContainer>
        
    );
};

export default TechInventory;
