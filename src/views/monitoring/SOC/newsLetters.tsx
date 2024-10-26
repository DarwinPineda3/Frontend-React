import PageContainer from "src/components/container/PageContainer";
import { Box, Grid, IconButton, Breadcrumbs, Link, Typography } from "@mui/material";
import NewsLettersList from "src/components/monitoring/NewsLettersList";
import { useParams, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NewsLetterDetail from "src/components/monitoring/NewsLetterDetail";

const NewsLetter = () => {
    const { newsLetterId } = useParams<{ newsLetterId?: string }>();
    const location = useLocation();  // Tracks the current URL location
    const navigate = useNavigate();

    const [selectedNewsLetter, setSelectedNewsLetter] = useState<string | null>(null);

    // Synchronize state with URL parameters
    useEffect(() => {
        if (newsLetterId) {
            setSelectedNewsLetter(newsLetterId);
        } else {
            setSelectedNewsLetter(null);
        }

    }, [newsLetterId, location]);

    const handleNewsLetterClick = (id: string) => {
        navigate(`/monitoring/soc/newsLetters/${id}`);
    };
    return (
        <PageContainer title="Akila">
            <Box display="flex" alignItems="center" mt={2}>
                <IconButton onClick={() => navigate(-1)} color="primary">
                    <ArrowBackIcon />
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link component={RouterLink} color="inherit" to="/monitoring/newsLetter">
                        Monitoring
                    </Link>
                    {selectedNewsLetter && (
                        <Typography color="textPrimary">
                            NewsLetter Details
                        </Typography>
                    )}
                </Breadcrumbs>
            </Box>
            {selectedNewsLetter ? (
                <Grid container spacing={0} mt={1}>
                    <Grid item xs={12} xl={12}>
                        <NewsLetterDetail newsLetterId={selectedNewsLetter!} />
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

export default NewsLetter;
