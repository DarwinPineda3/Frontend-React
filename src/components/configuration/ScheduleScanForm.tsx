import { ArrowBack } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, FormControl, Grid, IconButton, Link, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../shared/DashboardCard';
import { styled } from '@mui/material/styles';
import { TextField, FormLabel } from '@mui/material';

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

const CustomFormLabel = styled(FormLabel)(({ theme }) => ({
  marginBottom: '4px',  
  marginTop: '10px',   
  display: 'block',
  fontWeight: 600,
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

    // Reset form fields
    setScanType('');
    setName('');
    setFrequency('');
    setExecutionTime('');
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
                <FormControl fullWidth variant="outlined" margin="normal">
                  <CustomFormLabel htmlFor="scan_type">{t('scan.type')}</CustomFormLabel>
                  <Select
                    id="scan_type"
                    value={scanType}
                    onChange={(e) => setScanType(e.target.value)}
                    required
                    label={t('scan.type')}
                  >
                    <MenuItem value="1">{t('scan.network_vulnerability')}</MenuItem>
                    <MenuItem value="2">{t('scan.web_vulnerability')}</MenuItem>
                    <MenuItem value="3">{t('scan.wordpress_vulnerability')}</MenuItem>
                    <MenuItem value="4">{t('scan.network_observability')}</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined" margin="normal">
                  <CustomFormLabel htmlFor="scan_name">{t('scan.name')}</CustomFormLabel>
                  <CustomTextField
                    id="scan_name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </FormControl>

                <FormControl fullWidth variant="outlined" margin="normal">
                  <CustomFormLabel htmlFor="execution_frequency">{t('scan.execution_frequency')}</CustomFormLabel>
                  <Select
                    id="execution_frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    required
                    label={t('scan.execution_frequency')}
                  >
                    <MenuItem value="daily">{t('scan.daily')}</MenuItem>
                    <MenuItem value="weekly">{t('scan.weekly')}</MenuItem>
                    <MenuItem value="monthly">{t('scan.monthly')}</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined" margin="normal">
                  <CustomFormLabel htmlFor="execution_time">{t('scan.execution_time')}</CustomFormLabel>
                  <CustomTextField
                    id="execution_time"
                    type="time"
                    variant="outlined"
                    fullWidth
                    value={executionTime}
                    onChange={(e) => setExecutionTime(e.target.value)}
                    required
                  />
                </FormControl>

                <div style={{ margin: '20px 0' }}>
                  <Typography variant="body1" component="div">
                    {t('scan.create_task_link')} <RouterLink to="/vulnerabilities/network/scans/create">{t('scan.task')}</RouterLink>
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
