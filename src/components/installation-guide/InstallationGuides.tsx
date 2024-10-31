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
                                Guía de instalación
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: 3 }}>
                                ¡Bienvenido/a a la Guía de Instalación del Agente! Esta guía proporciona instrucciones
                                paso a paso para instalar el agente en diferentes sistemas operativos.
                            </Typography>

                            {/* Accordion para Windows */}
                            <Accordion defaultExpanded>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6"><FaWindows style={{ marginRight: '8px' }} /> Windows</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="h6">Instalación Individual</Typography>
                                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                        Para ejecutar el comando en Windows, siga estos pasos:
                                    </Typography>
                                    <ul>
                                        <li><strong>Paso 1:</strong> Abra PowerShell con privilegios administrativos.</li>
                                        <li>
                                            <strong>Paso 2:</strong> Copie el siguiente comando:
                                        </li>
                                    </ul>
                                    <CodeBlock onClick={() => copyToClipboard(`Invoke-WebRequest -Uri "https://git.lorius.cloud/aordonez/installers_agent_akila/-/raw/main/Akila_Agent_setup.exe" -OutFile "$env:temp\\Akila_Agent_setup.exe"; Start-Process -FilePath "$env:temp\\Akila_Agent_setup.exe" -ArgumentList '/VERYSILENT URL="https://akilamonitoring1.akila-dev.octapus.io/" API_KEY="hytKMeKI.1Tk3sAkriiE7xOYs986DvMl4DecIzhQx" Version="1.0.5"' -Wait`)}>
                                        {`Invoke-WebRequest -Uri "https://git.lorius.cloud/aordonez/installers_agent_akila/-/raw/main/Akila_Agent_setup.exe" -OutFile "$env:temp\\Akila_Agent_setup.exe"; Start-Process -FilePath "$env:temp\\Akila_Agent_setup.exe" -ArgumentList '/VERYSILENT URL="https://akilamonitoring1.akila-dev.octapus.io/" API_KEY="hytKMeKI.1Tk3sAkriiE7xOYs986DvMl4DecIzhQx" Version="1.0.5"' -Wait`}
                                    </CodeBlock>
                                    <ul>
                                        <li><strong>Paso 3:</strong> Pegue el comando en la ventana de PowerShell y presione Enter para ejecutarlo.</li>
                                        <li>El comando descargará y ejecutará el Agente Akila con la URL y la clave API proporcionadas.</li>
                                    </ul>

                                    <Typography variant="h6" sx={{ marginTop: 2 }}>Instalación Masiva</Typography>
                                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                        Para crear un script para instalación masiva, siga estos pasos:
                                    </Typography>
                                    <ul>
                                        <li><strong>Paso 1:</strong> Cree un nuevo archivo de script de PowerShell con una extensión .ps1, por ejemplo, install_agent.ps1.</li>
                                        <li><strong>Paso 2:</strong> Copie el siguiente script en el archivo de script de PowerShell recién creado:</li>
                                    </ul>
                                    <CodeBlock onClick={() => copyToClipboard(`$markerFile = "$env:ProgramData\\AkilaAgentInstalled.txt"
if (-not (Test-Path $markerFile)) {
    Invoke-WebRequest -Uri "https://git.lorius.cloud/aordonez/installers_agent_akila/-/raw/main/Akila_Agent_setup.exe" -OutFile "$env:temp\\Akila_Agent_setup.exe"; Start-Process -FilePath "$env:temp\\Akila_Agent_setup.exe" -ArgumentList '/VERYSILENT URL="https://akilamonitoring1.akila-dev.octapus.io/" API_KEY="hytKMeKI.1Tk3sAkriiE7xOYs986DvMl4DecIzhQx" Version="1.0.5"' -Wait
    New-Item -ItemType File -Path $markerFile -Force
}`)}>
                                        {`$markerFile = "$env:ProgramData\\AkilaAgentInstalled.txt"
if (-not (Test-Path $markerFile)) {
    Invoke-WebRequest -Uri "https://git.lorius.cloud/aordonez/installers_agent_akila/-/raw/main/Akila_Agent_setup.exe" -OutFile "$env:temp\\Akila_Agent_setup.exe"; Start-Process -FilePath "$env:temp\\Akila_Agent_setup.exe" -ArgumentList '/VERYSILENT URL="https://akilamonitoring1.akila-dev.octapus.io/" API_KEY="hytKMeKI.1Tk3sAkriiE7xOYs986DvMl4DecIzhQx" Version="1.0.5"' -Wait
    New-Item -ItemType File -Path $markerFile -Force
}`}
                                    </CodeBlock>
                                    <ul>
                                        <li><strong>Paso 3:</strong> Guarde el archivo de script.</li>
                                    </ul>

                                    <Box sx={{
                                        borderLeft: `5px solid ${theme.palette.primary.main}`,
                                        padding: 2,
                                        marginTop: 2,
                                    }}>
                                        <Typography variant="h6">
                                            Instrucciones para la Directiva de Grupo de Active Directory
                                        </Typography>
                                        <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                            Para aplicar políticas de grupo en Active Directory, siga estos pasos:
                                        </Typography>
                                        <ul>
                                            <li><strong>Paso 1:</strong> Abra la Consola de Administración de Directivas de Grupo (GPMC).</li>
                                            <li><strong>Paso 2:</strong> Navegue hasta la Unidad Organizativa (OU) o dominio deseado.</li>
                                            <li><strong>Paso 3:</strong> Cree un nuevo Objeto de Directiva de Grupo (GPO) o edite uno existente.</li>
                                            <li><strong>Paso 4:</strong> Navegue a Configuración del Equipo &gt; Directivas &gt; Scripts (Inicio/Apagado).</li>
                                            <li><strong>Paso 5:</strong> Agregue un nuevo script de inicio y especifique la ruta de su script de PowerShell (por ejemplo, install_agent.ps1).</li>
                                            <li><strong>Paso 6:</strong> Asegúrese de que la directiva de ejecución permita que el script se ejecute.</li>
                                            <li><strong>Paso 7:</strong> Una vez que la Directiva de Grupo se aplique a las computadoras deseadas, el script se ejecutará durante el inicio.</li>
                                        </ul>
                                    </Box>
                                    <Typography variant="body2">
                                        Notas: El agente de Windows es compatible con las versiones de Windows Server 2008 R2 y posteriores.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            {/* Accordion para Linux */}
                            <Accordion defaultExpanded>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6"><FaLinux style={{ marginRight: '8px' }} /> Linux</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="h6">Instalación Individual</Typography>
                                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                        Para ejecutar el comando en Linux, siga estos pasos:
                                    </Typography>
                                    <ul>
                                        <li><strong>Paso 1:</strong> Abra una terminal en su sistema Linux.</li>
                                        <li>
                                            <strong>Paso 2:</strong> Elija su distribución de Linux:
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
                                        <li><strong>Paso 3:</strong> Pegue el comando en la ventana de la terminal de Linux y presione Enter para ejecutarlo.</li>
                                        <li>
                                            <strong>Paso 4:</strong> Copie el siguiente comando:
                                        </li>
                                    </ul>
                                    <CodeBlock onClick={() => copyToClipboard(`sudo curl -o- https://git.lorius.cloud/aordonez/installers_agent_akila/-/raw/main/agent_linux.sh | sudo bash -s -- --url "https://akilamonitoring1.akila-dev.octapus.io/" --api-key "hytKMeKI.1Tk3sAkriiE7xOYs986DvMl4DecIzhQx" --version "1.0.5"`)} >
                                        {`sudo curl -o- https://git.lorius.cloud/aordonez/installers_agent_akila/-/raw/main/agent_linux.sh | sudo bash -s -- --url "https://akilamonitoring1.akila-dev.octapus.io/" --api-key "hytKMeKI.1Tk3sAkriiE7xOYs986DvMl4DecIzhQx" --version "1.0.5"`}
                                    </CodeBlock>
                                    <ul>
                                        <li><strong>Paso 5:</strong> Pegue el comando en la ventana de la terminal de Linux y presione Enter para ejecutarlo.</li>
                                        <li>El comando descargará y ejecutará el Agente Akila con la URL y la clave API proporcionadas.</li>
                                    </ul>

                                    <Typography variant="h6" sx={{ marginTop: 2 }}>Notas de error</Typography>
                                    <Typography variant="body2">
                                        Si hay problemas, intente con los siguientes comandos:
                                    </Typography>
                                    <CodeBlock onClick={() => copyToClipboard(`wget http://security.ubuntu.com/ubuntu/pool/main/o/openssl1.0/libssl1.0.0_1.0.2n-1ubuntu5_amd64.deb
sudo dpkg -i libssl1.0.0_1.0.2n-1ubuntu5_amd64.deb`)}>
                                        {`wget http://security.ubuntu.com/ubuntu/pool/main/o/openssl1.0/libssl1.0.0_1.0.2n-1ubuntu5_amd64.deb
sudo dpkg -i libssl1.0.0_1.0.2n-1ubuntu5_amd64.deb`}
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

const CodeBlock: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
    <Typography variant="body2" onClick={onClick} sx={{
        backgroundColor: '#f4f4f4',
        padding: '8px',
        borderRadius: '4px',
        whiteSpace: 'pre-wrap',
        marginBottom: 2,
        cursor: 'pointer',
    }}>
        {children}
    </Typography>
);

export default InstallationGuides;
