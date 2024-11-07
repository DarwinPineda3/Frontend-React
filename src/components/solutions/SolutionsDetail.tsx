import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Alert,
    Breadcrumbs,
    IconButton,
    Box,
    Link,
    Snackbar,
    IconButton as MuiIconButton,
    useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import solutionImage from 'src/assets/images/img solutions/monitoring.png'; 
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import { useTranslation } from 'react-i18next';  
const SolutionDetail: React.FC = () => {
    const { t } = useTranslation();  
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const theme = useTheme();

    const solutionDetails = {
        id: '10000088826',
        name: t('solutionDetail.solution'), 
        description: t('solutionDetail.description'),  
        details: (
            <>
                <Typography variant="body1" fontWeight="bold">{t('solutionDetail.step1')} </Typography>
                <Typography variant="body1">{t('solutionDetail.step1Text')}</Typography>
                
                <Typography variant="body1" fontWeight="bold">{t('solutionDetail.step2')}</Typography>
                <Typography variant="body1">{t('solutionDetail.step2Text')}</Typography>
                <Typography
                    variant="body1"
                    sx={{
                        whiteSpace: 'pre-wrap',
                        padding: '10px',
                        borderRadius: '4px',
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
                        color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        cursor: 'pointer'
                    }}
                    onClick={() => copyToClipboard(t('solutionDetail.commandText'))} 
                >
                    {t('solutionDetail.commandText')}
                </Typography>
                
                <Typography variant="body1" fontWeight="bold">{t('solutionDetail.step3')}</Typography>
                <Typography variant="body1">{t('solutionDetail.step3Text')}</Typography>
                
                <Typography variant="body1">{t('solutionDetail.additionalInfo')}</Typography>
                
                <img src={solutionImage} alt={t('image.description') ?? 'Default image description'} style={{ width: '100%', marginTop: '20px', borderRadius: '4px' }} />
            </>
        ),
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setSnackbarMessage(t('solutionDetail.snackbarMessage') + text); 
            setSnackbarOpen(true);
            setTimeout(() => {
                setSnackbarOpen(false);
            }, 2000);
        } catch (err) {
            console.error('Error al copiar al portapapeles: ', err);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <PageContainer title={t('solutions.solution_detail_title') ?? 'Solution Detail'}>
            <Box mb={2}>
                <Box display="flex" alignItems="center" mt={2}>
                    <IconButton onClick={() => navigate(-1)} color="primary">
                        <ArrowBackIcon />
                    </IconButton>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link component={RouterLink} color="inherit" to="/support/solutions">
                            {t('menu.solutions')}  
                        </Link>
                        <Link color="inherit">{solutionDetails.name}</Link>
                    </Breadcrumbs>
                </Box>
            </Box>

            <Card variant="outlined" sx={{ margin: '30px auto', maxWidth: '2500px' }}>
                <CardContent>
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">{solutionDetails.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1">{solutionDetails.description}</Typography>
                            {solutionDetails.details}
                        </AccordionDetails>
                    </Accordion>

                    <Alert severity="info" sx={{ marginTop: '20px' }}>
                    {t('solutionDetail.alertText')} 
                        {' '}
                        <Link component={RouterLink} to="/support/tickets" color="inherit">
                     {t('solutionDetail.createTicketLinkText')}
                        </Link>
                    </Alert>
                </CardContent>
            </Card>

            <Snackbar
    open={snackbarOpen}
    onClose={handleCloseSnackbar}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    message={snackbarMessage || ''} 
    autoHideDuration={2000}
    action={
        <MuiIconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
        </MuiIconButton>
    }
/>
        </PageContainer>
    );
};

export default SolutionDetail;
