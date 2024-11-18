// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, Typography, Button, Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { registerType } from 'src/types/auth/auth';
import AuthSocialButtons from './AuthSocialButtons';

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const { t } = useTranslation(); 

  
  const translatedTitle = title || t('authRegister.title', { defaultValue: 'Default Title' });
  const translatedSubtitle = subtitle || t('authRegister.subtitle', { defaultValue: 'Welcome to Akila' });
  const translatedSubtext = subtext || t('authRegister.subtext', { defaultValue: 'Your Admin Dashboard' });

  return (
    <>
      {translatedTitle && (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {translatedTitle}
        </Typography>
      )}

      {translatedSubtext}

      <AuthSocialButtons title={t('authRegister.signUpWith', { defaultValue: 'Sign up with' }) as string } />

      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            {t('authRegister.orSignUpWith', { defaultValue: 'or sign up with' })}
          </Typography>
        </Divider>
      </Box>

      <Box>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="email">{t('authRegister.emailLabel', { defaultValue: 'Email Address' })}</CustomFormLabel>
          <CustomTextField id="email" variant="outlined" fullWidth />
        </Stack>
        <Button color="primary" variant="contained" size="large" fullWidth component={Link} to="/auth/login">
          {t('authRegister.signUpButton', { defaultValue: 'Sign Up' })}
        </Button>
      </Box>

      {translatedSubtitle}
    </>
  );
};

export default AuthRegister;
