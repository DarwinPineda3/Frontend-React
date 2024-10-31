import { ArrowBack } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, FormControl, Grid, IconButton, Link, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../shared/DashboardCard';
import { styled } from '@mui/material/styles';
import { TextField, TextFieldProps } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

const CustomTextField = styled((props: TextFieldProps) => <TextField {...props} />)(({ theme }) => ({
  marginTop: '4px', 
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
}));

const ScheduleScanForm: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [scanType, setScanType] = useState('');
    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState('');
    const [executionTime, setExecutionTime] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newScan = {
            id: Date.now().toString(),
            name,
            scanType,
            frequency,
            executionTime,
            status: 'Activo',
        };
        const existingScans = JSON.parse(localStorage.getItem('scans') || '[]');
        localStorage.setItem('scans', JSON.stringify([...existingScans, newScan]));
        navigate('/configuration/scheduled-scans');
        setScanType('');
        setName('');
        setFrequency('');
        setExecutionTime('');
    };

    const handleScanTypeChange = (e: SelectChangeEvent<string>) => {
        setScanType(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleFrequencyChange = (e: SelectChangeEvent<string>) => {
        setFrequency(e.target.value);
    };

    const handleExecutionTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExecutionTime(e.target.value);
    };

    return (
        <PageContainer title="Akila">
            <Box mb={2}>
                <Box display="flex" alignItems="center" mt={2}>
                    <IconButton onClick={() => navigate(-1)} color="primary">
                        <ArrowBack />
                    </IconButton>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link component={RouterLink} color="inherit" to="/configuration/scheduled-scans">
                            {t('menu.configuration')}
                        </Link>
                        <Link component={RouterLink} color="inherit" to="/configuration/scheduled-scans">
                            {t('menu.scheduled_scans')}
                        </Link>
                        <Typography color="textPrimary">{t('configuration.create_scheduled_scan')}</Typography>
                    </Breadcrumbs>
                </Box>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <DashboardCard
                        title={t('configuration.create_scheduled_scan') as string}
                        subtitle={t('configuration.create_scheduled_scan_subtitle') as string}
                    >
                        <Box>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <label htmlFor="scan_type" style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                                            Tipo de escaneo
                                        </label>
                                        <FormControl fullWidth variant="outlined">
                                            <Select
                                                id="scan_type"
                                                value={scanType}
                                                onChange={handleScanTypeChange}
                                                required
                                            >
                                                <MenuItem value="1">Escaneos vulnerabilidad Red</MenuItem>
                                                <MenuItem value="2">Escaneos vulnerabilidad Web</MenuItem>
                                                <MenuItem value="3">Escaneos vulnerabilidad WordPress</MenuItem>
                                                <MenuItem value="4">Escaneos observabilidad Red</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <label htmlFor="name" style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                                            Nombre
                                        </label>
                                        <CustomTextField
                                            id="name"
                                            variant="outlined"
                                            fullWidth
                                            value={name}
                                            onChange={handleNameChange}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <label htmlFor="frequency" style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                                            Frecuencia de ejecución
                                        </label>
                                        <FormControl fullWidth variant="outlined">
                                            <Select
                                                id="frequency"
                                                value={frequency}
                                                onChange={handleFrequencyChange}
                                                required
                                            >
                                                <MenuItem value="daily">Cada día</MenuItem>
                                                <MenuItem value="weekly">Cada semana</MenuItem>
                                                <MenuItem value="monthly">Cada mes</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <label htmlFor="execution_time" style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                                            Hora de ejecución
                                        </label>
                                        <CustomTextField
                                            id="execution_time"
                                            type="time"
                                            variant="outlined"
                                            fullWidth
                                            value={executionTime}
                                            onChange={handleExecutionTimeChange}
                                            required
                                        />
                                    </Grid>
                                </Grid>

                                <div style={{ margin: '20px 0' }}>
                                    <Typography variant="body1" component="div">
                                        Debes crear un/a <RouterLink to="/vulnerabilities/network/scans/create">tarea</RouterLink>
                                    </Typography>
                                </div>

                                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                                    {t('configuration.create')}
                                </Button>
                            </form>
                        </Box>
                    </DashboardCard>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default ScheduleScanForm;
