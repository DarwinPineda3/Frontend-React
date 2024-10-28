import PageContainer from "src/components/container/PageContainer";
import { Box, Grid, IconButton, Breadcrumbs, Link, Typography } from "@mui/material";
import NewsLettersList from "src/components/monitoring/NewsletterList";
import { useParams, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NewsLetterDetail from "src/components/monitoring/NewsletterDetail";

const Newsletter = () => {
    const { newsletterId } = useParams<{ newsletterId?: string }>();
    const location = useLocation();  // Tracks the current URL location
    const navigate = useNavigate();

    const [selectedNewsletter, setSelectedNewsLetter] = useState<string | null>(null);

    // Synchronize state with URL parameters
    useEffect(() => {
        if (newsletterId) {
            setSelectedNewsLetter(newsletterId);
        } else {
            setSelectedNewsLetter(null);
        }

    }, [newsletterId, location]);

    const handleNewsLetterClick = (id: string) => {
        navigate(`/monitoring/soc/newsletters/${id}`);
    };
    return (
        <PageContainer title="Akila">
            <Box display="flex" alignItems="center" mt={2}>
                <IconButton onClick={() => navigate(-1)} color="primary">
                    <ArrowBackIcon />
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link component={RouterLink} color="inherit" to="/monitoring/soc/newsletters">
                        Monitoring
                    </Link>
                    <Link component={RouterLink} color="inherit" to="/monitoring/soc/newsletters">
                        Newsletter
                    </Link>
                    {selectedNewsletter && (
                        <Typography color="textPrimary">
                            Newsletter Details
                        </Typography>
                    )}
                </Breadcrumbs>
            </Box>
            {selectedNewsletter ? (
                <Grid container spacing={0} mt={1}>
                    <Grid item xs={12} xl={12}>
                        <NewsLetterDetail newsletterId={selectedNewsletter!} />
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                        <NewsLettersList onNewsLetterClick={handleNewsLetterClick} />
                    </Grid>
                </Grid>
            )}
        </PageContainer>
        
    );
};

export default Newsletter;
