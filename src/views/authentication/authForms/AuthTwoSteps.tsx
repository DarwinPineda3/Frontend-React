import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';

const AuthTwoSteps = () => {
  const { t } = useTranslation(); 

  return (
    <>
      <Box mt={4}>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="code">{t('authTwoSteps.title')}</CustomFormLabel>
          <Stack spacing={2} direction="row">        
            <CustomTextField id="code" variant="outlined" fullWidth />
            <CustomTextField id="code" variant="outlined" fullWidth />
            <CustomTextField id="code" variant="outlined" fullWidth />
            <CustomTextField id="code" variant="outlined" fullWidth />
            <CustomTextField id="code" variant="outlined" fullWidth />
            <CustomTextField id="code" variant="outlined" fullWidth />
          </Stack>
        </Stack>

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          to="/"
        >
          {t('authTwoSteps.verifyButton')} 
        </Button>

        <Stack direction="row" spacing={1} mt={3}>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            {t('authTwoSteps.didntGetCode')} 
          </Typography>
          <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            {t('authTwoSteps.resend')} 
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default AuthTwoSteps;
