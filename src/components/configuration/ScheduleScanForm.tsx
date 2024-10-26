import React, { useState } from 'react';
import { Card, CardContent, Button, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const ScheduleScanForm: React.FC = () => {
    const navigate = useNavigate(); 
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

    return (
        <div>
            <h2 style={{ marginBottom: '30px' }}>Programar Escaneos</h2>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel id="scan_type_label">Tipo de escaneo</InputLabel>
                            <Select
                                labelId="scan_type_label"
                                value={scanType}
                                onChange={(e) => setScanType(e.target.value)}
                                required
                            >
                                <MenuItem value="1">Escaneos vulnerabilidad Red</MenuItem>
                                <MenuItem value="2">Escaneos vulnerabilidad Web</MenuItem>
                                <MenuItem value="3">Escaneos vulnerabilidad WordPress</MenuItem>
                                <MenuItem value="4">Escaneos observabilidad Red</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            margin="normal"
                        />

                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel id="execution_frequency_label">Frecuencia de ejecución</InputLabel>
                            <Select
                                labelId="execution_frequency_label"
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                                required
                            >
                                <MenuItem value="daily">Cada día</MenuItem>
                                <MenuItem value="weekly">Cada semana</MenuItem>
                                <MenuItem value="monthly">Cada mes</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label="Hora de ejecución"
                            type="time"
                            variant="outlined"
                            fullWidth
                            value={executionTime}
                            onChange={(e) => setExecutionTime(e.target.value)}
                            required
                            margin="normal"
                        />

                        <div style={{ margin: '20px 0' }}>
                            <Typography variant="body1" component="div">
                                Debes crear un/a <Link to="/vulnerabilities/network/scans/create">tarea</Link>
                            </Typography>
                        </div>

                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                            Programar escaneo
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ScheduleScanForm;
