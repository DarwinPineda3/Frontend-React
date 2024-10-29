import PageContainer from "src/components/container/PageContainer";
import { Box, Grid, IconButton, Breadcrumbs, Link } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SummaryVulnerabilitiesList from "src/components/vulnerabilities/SummaryVulnList";
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const SummaryVulnerabilities = () => {
    const navigate = useNavigate();

    return (
        <PageContainer title="Akila">
            <Box display="flex" alignItems="center" mt={2}>
                <IconButton onClick={() => navigate(-1)} color="primary">
                    <ArrowBackIcon />
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link component={RouterLink} color="inherit" to="/vulnerabilities/summary">
                        Vulnerabilities
                    </Link>
                    <Link component={RouterLink} color="inherit" to="/vulnerabilities/summary">
                        Summary
                    </Link>
                </Breadcrumbs>
            </Box>
            <Grid container spacing={3} mt={1}>
                <Grid item xs={12} lg={12}>
                    <SummaryVulnerabilitiesList/>
                </Grid>
            </Grid>
        </PageContainer>
        
    );
};

export default SummaryVulnerabilities;
