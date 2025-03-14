// src/components/Loader.tsx
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const EmptyState: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} mt={4} mb={4}>
      <Typography variant="h6" color="textSecondary">
        {t('dashboard.no_data')}
      </Typography>
    </Box>

  );
};


export default EmptyState;
