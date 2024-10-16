import React from 'react';
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, Alert, Breadcrumbs, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import solutionImage from 'src/assets/images/img solutions/monitoring.png'; 
import { useNavigate } from 'react-router-dom';

const SolutionDetail: React.FC = () => {
    const navigate = useNavigate();

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
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
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

    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <IconButton onClick={handleBack} sx={{ mr: 1 }} color="primary">
                    <ArrowBackIcon />
                </IconButton>
                <Typography color="text.primary">{solutionDetails.name}</Typography>
            </Breadcrumbs>

            <Typography variant="h3" sx={{ margin: '20px 0' }}>Detalles</Typography>

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
        </div>
    );
};

export default SolutionDetail;
