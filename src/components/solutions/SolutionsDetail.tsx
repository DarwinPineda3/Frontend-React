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

const SolutionDetail: React.FC = () => {
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const theme = useTheme();

    const solutionDetails = {
        id: '10000088826',
        name: 'Single Installation',
        description: 'To execute the command on Windows, follow these steps:',
        details: (
            <>
                <Typography variant="body1" fontWeight="bold">Step 1: </Typography>
                <Typography variant="body1">Open PowerShell with administrative privileges.</Typography>
                
                <Typography variant="body1" fontWeight="bold">Step 2: </Typography>
                <Typography variant="body1">Copy the following command:</Typography>
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
                    onClick={() => copyToClipboard(`Invoke-WebRequest -Uri "https://git.lorius.cloud/aordonez/installers_balam/-/raw/main/Balam_Agent_setup.exe" -OutFile "$env:temp\\Balam_Agent_setup.exe"; Start-Process -FilePath "$env:temp\\Balam_Agent_setup.exe" -ArgumentList '/VERYSILENT URL="https://amunoz1.balam-dev.octapus.io/" API_KEY="twHJnYRQ.4cqNxLPdaJrE9dD30Ax1H1dIuxMixU7b"' -Wait`)}
                >
                    Invoke-WebRequest -Uri "https://git.lorius.cloud/aordonez/installers_balam/-/raw/main/Balam_Agent_setup.exe" -OutFile "$env:temp\Balam_Agent_setup.exe"; Start-Process -FilePath "$env:temp\Balam_Agent_setup.exe" -ArgumentList '/VERYSILENT URL="https://amunoz1.balam-dev.octapus.io/" API_KEY="twHJnYRQ.4cqNxLPdaJrE9dD30Ax1H1dIuxMixU7b"' -Wait
                </Typography>
                
                <Typography variant="body1" fontWeight="bold">Step 3: </Typography>
                <Typography variant="body1">Paste the command into the PowerShell window and press Enter to execute it.</Typography>
                
                <Typography variant="body1">
                    The command will download and execute the Balam Agent with the provided URL and API key.
                </Typography>
                
                <img src={solutionImage} alt="Monitoring" style={{ width: '100%', marginTop: '20px', borderRadius: '4px' }} />
            </>
        ),
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setSnackbarMessage('Texto copiado al portapapeles: ' + text);
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
        <PageContainer title="Akila">
            <Box mb={2}>
                <Box display="flex" alignItems="center" mt={2}>
                    <IconButton onClick={() => navigate(-1)} color="primary">
                        <ArrowBackIcon />
                    </IconButton>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link component={RouterLink} color="inherit" to="/support/solutions">
                            Solutions
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
                        Si no encuentras lo que buscas, puedes <a href="/support/tickets">crear un ticket</a>.
                    </Alert>
                </CardContent>
            </Card>

            <Snackbar
                open={snackbarOpen}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                message={snackbarMessage}
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
