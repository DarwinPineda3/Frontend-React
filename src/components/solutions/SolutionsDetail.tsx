import React from 'react';
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import solutionImage from 'src/assets/images/img solutions/monitoring.png'; 

const SolutionDetail: React.FC = () => {
   
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

    return (
        <Card variant="outlined" sx={{ maxWidth: 1200, margin: '30px auto' }}>
            <CardContent>
                <Typography variant="h5">{solutionDetails.name}</Typography>
                <Typography variant="body1">{solutionDetails.description}</Typography>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">Detalles</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {solutionDetails.details}
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    );
};

export default SolutionDetail;
