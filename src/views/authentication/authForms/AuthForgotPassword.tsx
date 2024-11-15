// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';

const AuthForgotPassword = () => {
  const { t } = useTranslation();

   return ( 
  <>
    <Stack mt={4} spacing={2}>
    <CustomFormLabel htmlFor="reset-email">{t('authForgotPassword.emailLabel')}</CustomFormLabel>
      <CustomTextField id="reset-email" variant="outlined" fullWidth />

      <Button color="primary" variant="contained" size="large" fullWidth component={Link} to="/">
       {t('authForgotPassword.forgotPasswordButton')}
      </Button>
      <Button color="primary" variant="outlined" size="large" fullWidth component={Link} to="/auth/login">
       {t('authForgotPassword.backToLoginButton')}
      </Button>
    </Stack>
  </>
);
};

export default AuthForgotPassword;
