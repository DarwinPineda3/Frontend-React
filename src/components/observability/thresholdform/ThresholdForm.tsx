import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useTranslation } from 'react-i18next';  // Importar el hook

interface ThresholdFormProps {
  onSubmit: (data: { cpuThreshold: number; ramThreshold: number; storageThreshold: number; userEmail: string }) => void;
}

const ThresholdForm: React.FC<ThresholdFormProps> = ({ onSubmit }) => {
  const [cpuThreshold, setCpuThreshold] = useState<number>(95);
  const [ramThreshold, setRamThreshold] = useState<number>(95);
  const [storageThreshold, setStorageThreshold] = useState<number>(95);
  const [userEmail, setUserEmail] = useState<string>('Example@email.com');
  
  // Usamos el hook de traducción
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      cpuThreshold,
      ramThreshold,
      storageThreshold,
      userEmail
    });
  };

  const handleCpuThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpuThreshold(Number(e.target.value));
  };

  const handleRamThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRamThreshold(Number(e.target.value));
  };

  const handleStorageThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStorageThreshold(Number(e.target.value));
  };

  const handleUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  return (
    <DashboardCard
    title={t('threshold.threshold_settings') ?? 'Threshold Settings'}  
    subtitle={t('thresholdForm.subtitle') ?? 'Adjust the resource usage limits below to set your thresholds.'} 
    >
      <form onSubmit={handleSubmit}>
        {/* CPU Threshold */}
        <CustomFormLabel htmlFor="cpu-threshold" sx={{ mt: 0 }}>
          {t('thresholdForm.cpu_threshold', { defaultValue: 'CPU Threshold (%)' })}
        </CustomFormLabel>
        <CustomTextField
          id="cpu-threshold"
          value={cpuThreshold}
          onChange={handleCpuThresholdChange}
          variant="outlined"
          fullWidth
          type="number"
          inputProps={{ min: 1, max: 100 }}
        />

        {/* RAM Threshold */}
        <CustomFormLabel htmlFor="ram-threshold" sx={{ mt: 3 }}>
          {t('thresholdForm.ram_threshold', { defaultValue: 'RAM Threshold (%)' })}
        </CustomFormLabel>
        <CustomTextField
          id="ram-threshold"
          value={ramThreshold}
          onChange={handleRamThresholdChange}
          variant="outlined"
          fullWidth
          type="number"
          inputProps={{ min: 1, max: 100 }}
        />

        {/* Storage Threshold */}
        <CustomFormLabel htmlFor="storage-threshold" sx={{ mt: 3 }}>
          {t('thresholdForm.storage_threshold', { defaultValue: 'Storage Threshold (%)' })}
        </CustomFormLabel>
        <CustomTextField
          id="storage-threshold"
          value={storageThreshold}
          onChange={handleStorageThresholdChange}
          variant="outlined"
          fullWidth
          type="number"
          inputProps={{ min: 1, max: 100 }}
        />

        {/* User Email */}
        <CustomFormLabel htmlFor="user-email" sx={{ mt: 3 }}>
          {t('thresholdForm.user_email', { defaultValue: 'Email Address' })}
        </CustomFormLabel>
        <CustomTextField
          id="user-email"
          value={userEmail}
          onChange={handleUserEmailChange}
          variant="outlined"
          fullWidth
          type="email"
        />

        {/* Save Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button variant="contained" color="primary" type="submit">
            {t('thresholdForm.save_changes', { defaultValue: 'Save Changes' })}
          </Button>
        </Box>
      </form>
    </DashboardCard>
  );
};

export default ThresholdForm;
