import { ArrowBack } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Breadcrumbs,
    Grid,
    IconButton,
    Link,
    Snackbar,
    Tab,
    Tabs,
    Typography,
    useTheme
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLinux, FaWindows } from 'react-icons/fa';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../shared/DashboardCard';

const InstallationGuides = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [value, setValue] = React.useState(0);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const theme = useTheme();

    const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setSnackbarMessage(`${t('snackbar.copied_text')} ${text}`);
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
                        <ArrowBack />
                    </IconButton>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link component={RouterLink} color="inherit" to="/observability/installation-guide">
                            {t('menu.observability')}
                        </Link>
                        <Link component={RouterLink} color="inherit" to="/observability/installation-guide">
                            {t('menu.installation_guide')}
                        </Link>
                    </Breadcrumbs>
                </Box>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <DashboardCard>
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                {t('installation_guide.title')}
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: 3 }}>
                                {t('installation_guide.welcome_message')}
                            </Typography>

                            {/* Accordion para Windows */}
                            <Accordion defaultExpanded>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6"><FaWindows style={{ marginRight: '8px' }} /> {t('installation_guide.windows.title')}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="h6">{t('installation_guide.windows.individual_installation.title')}</Typography>
                                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                        {t('installation_guide.windows.individual_installation.steps.intro')}
                                    </Typography>
                                    <ul>
                                        <li><strong>{t('installation_guide.windows.individual_installation.steps.step1')}</strong></li>
                                        <li>
                                            <strong>{t('installation_guide.windows.individual_installation.steps.step2')}</strong>
                                        </li>
                                    </ul>
                                    <CodeBlock onClick={() => copyToClipboard(`Invoke-WebRequest -Uri "https://gitlab.octapus.io/public-releases/akila-agent-installers/-/raw/main/Akila_Agent_setup.exe" -OutFile "$env:temp\Akila_Agent_setup.exe"; Start-Process -FilePath "$env:temp\Akila_Agent_setup.exe" -ArgumentList '/VERYSILENT URL="https://akilademo1.akila-dev.octapus.io/" API_KEY="BjTcUCJp.tQQur17OOtoTrkehEVH6msKsI7q10C6o" Version="1.0.5"' -Wait`)}>
                                        {`Invoke-WebRequest -Uri "https://gitlab.octapus.io/public-releases/akila-agent-installers/-/raw/main/Akila_Agent_setup.exe" -OutFile "$env:temp\Akila_Agent_setup.exe"; Start-Process -FilePath "$env:temp\Akila_Agent_setup.exe" -ArgumentList '/VERYSILENT URL="https://akilademo1.akila-dev.octapus.io/" API_KEY="BjTcUCJp.tQQur17OOtoTrkehEVH6msKsI7q10C6o" Version="1.0.5"' -Wait`}
                                    </CodeBlock>
                                    <ul>
                                        <li><strong>{t('installation_guide.windows.individual_installation.steps.step3')}</strong></li>
                                        <li>{t('installation_guide.windows.individual_installation.steps.note')}</li>
                                    </ul>

                                    <Typography variant="h6" sx={{ marginTop: 2 }}>{t('installation_guide.windows.bulk_installation.title')}</Typography>
                                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                        {t('installation_guide.windows.bulk_installation.steps.intro')}
                                    </Typography>
                                    <ul>
                                        <li><strong>{t('installation_guide.windows.bulk_installation.steps.step1')}</strong></li>
                                        <li><strong>{t('installation_guide.windows.bulk_installation.steps.step2')}</strong></li>
                                    </ul>
                                    <CodeBlock onClick={() => copyToClipboard(`$markerFile = "$env:ProgramData\AkilaAgentInstalled.txt" # Path to the marker file if (-not (Test-Path $markerFile)) { # Download and install the agent only if the marker does not exist Invoke-WebRequest -Uri "https://gitlab.octapus.io/public-releases/akila-agent-installers/-/raw/main/Akila_Agent_setup.exe" -OutFile "$env:temp\Akila_Agent_setup.exe"; Start-Process -FilePath "$env:temp\Akila_Agent_setup.exe" -ArgumentList '/VERYSILENT URL="https://akilademo1.akila-dev.octapus.io/" API_KEY="BjTcUCJp.tQQur17OOtoTrkehEVH6msKsI7q10C6o" Version="1.0.5"' -Wait New-Item -ItemType File -Path $markerFile -Force }`)}>
                                        {`$markerFile = "$env:ProgramData\AkilaAgentInstalled.txt" # Path to the marker file if (-not (Test-Path $markerFile)) { # Download and install the agent only if the marker does not exist Invoke-WebRequest -Uri "https://gitlab.octapus.io/public-releases/akila-agent-installers/-/raw/main/Akila_Agent_setup.exe" -OutFile "$env:temp\Akila_Agent_setup.exe"; Start-Process -FilePath "$env:temp\Akila_Agent_setup.exe" -ArgumentList '/VERYSILENT URL="https://akilademo1.akila-dev.octapus.io/" API_KEY="BjTcUCJp.tQQur17OOtoTrkehEVH6msKsI7q10C6o" Version="1.0.5"' -Wait New-Item -ItemType File -Path $markerFile -Force }`}
                                    </CodeBlock>
                                    <ul>
                                        <li><strong>{t('installation_guide.windows.bulk_installation.steps.step3')}</strong></li>
                                    </ul>

                                    <Box sx={{
                                        borderLeft: `5px solid ${theme.palette.primary.main}`,
                                        padding: 2,
                                        marginTop: 2,
                                    }}>
                                        <Typography variant="h6">
                                            {t('installation_guide.windows.active_directory.title')}
                                        </Typography>
                                        <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                            {t('installation_guide.windows.active_directory.intro')}
                                        </Typography>
                                        <ul>
                                            <li><strong>{t('installation_guide.windows.active_directory.steps.step1')}</strong></li>
                                            <li><strong>{t('installation_guide.windows.active_directory.steps.step2')}</strong></li>
                                            <li><strong>{t('installation_guide.windows.active_directory.steps.step3')}</strong></li>
                                            <li><strong>{t('installation_guide.windows.active_directory.steps.step4')}</strong></li>
                                            <li><strong>{t('installation_guide.windows.active_directory.steps.step5')}</strong></li>
                                            <li><strong>{t('installation_guide.windows.active_directory.steps.step6')}</strong></li>
                                            <li><strong>{t('installation_guide.windows.active_directory.steps.step7')}</strong></li>
                                        </ul>
                                    </Box>
                                    <Typography variant="body2">
                                        {t('installation_guide.windows.notes')}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            {/* Accordion para Linux */}
                            <Accordion defaultExpanded>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6"><FaLinux style={{ marginRight: '8px' }} /> {t('installation_guide.linux.title')}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="h6">{t('installation_guide.linux.individual_installation.title')}</Typography>
                                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                        {t('installation_guide.linux.individual_installation.steps.intro')}
                                    </Typography>
                                    <ul>
                                        <li><strong>{t('installation_guide.linux.individual_installation.steps.step1')}</strong></li>
                                        <li>
                                            <strong>{t('installation_guide.linux.individual_installation.steps.step2')}</strong>
                                        </li>
                                    </ul>
                                    <Box sx={{ marginBottom: 2 }}>
                                        <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
                                            <Tab label="Ubuntu/Debian" />
                                            <Tab label="CentOS/RHEL" />
                                            <Tab label="Fedora" />
                                            <Tab label="Arch Linux" />
                                            <Tab label="openSUSE" />
                                        </Tabs>
                                    </Box>
                                    <Box sx={{ padding: 2 }}>
                                        {value === 0 && (
                                            <CodeBlock onClick={() => copyToClipboard(`sudo apt install unzip sysstat`)}>
                                                {`sudo apt install unzip sysstat`}
                                            </CodeBlock>
                                        )}
                                        {value === 1 && (
                                            <CodeBlock onClick={() => copyToClipboard(`sudo yum install unzip sysstat`)}>
                                                {`sudo yum install unzip sysstat`}
                                            </CodeBlock>
                                        )}
                                        {value === 2 && (
                                            <CodeBlock onClick={() => copyToClipboard(`sudo dnf install unzip sysstat`)}>
                                                {`sudo dnf install unzip sysstat`}
                                            </CodeBlock>
                                        )}
                                        {value === 3 && (
                                            <CodeBlock onClick={() => copyToClipboard(`sudo pacman -S unzip sysstat`)}>
                                                {`sudo pacman -S unzip sysstat`}
                                            </CodeBlock>
                                        )}
                                        {value === 4 && (
                                            <CodeBlock onClick={() => copyToClipboard(`sudo zypper install unzip sysstat`)}>
                                                {`sudo zypper install unzip sysstat`}
                                            </CodeBlock>
                                        )}
                                    </Box>

                                    <ul>
                                        <li><strong>{t('installation_guide.linux.individual_installation.steps.step3')}</strong></li>
                                        <li>
                                            <strong>{t('installation_guide.linux.individual_installation.steps.step4')}</strong>
                                        </li>
                                    </ul>
                                    <CodeBlock onClick={() => copyToClipboard(`sudo curl -o- https://gitlab.octapus.io/public-releases/akila-agent-installers/-/raw/main/agent_linux.sh | sudo bash -s -- --url "https://akilademo1.akila-dev.octapus.io/" --api-key "BjTcUCJp.tQQur17OOtoTrkehEVH6msKsI7q10C6o" --version "1.0.5"`)} >
                                        {`sudo curl -o- https://gitlab.octapus.io/public-releases/akila-agent-installers/-/raw/main/agent_linux.sh | sudo bash -s -- --url "https://akilademo1.akila-dev.octapus.io/" --api-key "BjTcUCJp.tQQur17OOtoTrkehEVH6msKsI7q10C6o" --version "1.0.5"`}
                                    </CodeBlock>
                                    <ul>
                                        <li><strong>{t('installation_guide.linux.individual_installation.steps.step5')}</strong></li>
                                        <li>{t('installation_guide.linux.individual_installation.steps.note')}</li>
                                    </ul>

                                    <Typography variant="h6" sx={{ marginTop: 2 }}>{t('installation_guide.linux.error_notes.title')}</Typography>
                                    <Typography variant="body2">
                                        {t('installation_guide.linux.error_notes.intro')}
                                    </Typography>
                                    <CodeBlock onClick={() => copyToClipboard(`wget http://security.ubuntu.com/ubuntu/pool/main/o/openssl1.0/libssl1.0.0_1.0.2n-1ubuntu5_amd64.deb\nsudo dpkg -i libssl1.0.0_1.0.2n-1ubuntu5_amd64.deb`)}>
                                        {`wget http://security.ubuntu.com/ubuntu/pool/main/o/openssl1.0/libssl1.0.0_1.0.2n-1ubuntu5_amd64.deb\nsudo dpkg -i libssl1.0.0_1.0.2n-1ubuntu5_amd64.deb`}
                                    </CodeBlock>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </DashboardCard>
                    <Snackbar
                        open={snackbarOpen}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        message={snackbarMessage}
                        autoHideDuration={2000}
                        action={
                            <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    />
                </Grid>
            </Grid>
        </PageContainer>
    );
};

const CodeBlock: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => {
    const theme = useTheme();

    return (
        <Typography 
            variant="body2" 
            onClick={onClick} 
            sx={{
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f5f5f5',
                color: theme.palette.mode === 'dark' ? theme.palette.text.primary : '#333',
                padding: '8px',
                borderRadius: '4px',
                whiteSpace: 'pre-wrap',
                marginBottom: 2,
                cursor: 'pointer',
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.palette.mode === 'light' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
        >
            {children}
        </Typography>
    );
};

export default InstallationGuides;
