import React, { useState } from 'react';
import { Grid, Box, Typography, TextField, Button, Alert } from '@mui/material';
import {  useNavigate, useParams } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next'; 
import PageContainer from 'src/components/container/PageContainer';
import img1 from 'src/assets/images/backgrounds/login-bg.svg';
import Logo from 'src/layouts/full/shared/logo/Logo';

const ResetPassword = () => {
  
  const { token } = useParams(); 
  console.log('Token desde la URL:', token); 

  const navigate = useNavigate();
  const { t } = useTranslation(); 

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'password') {
      setPassword(event.target.value);
    } else {
      setConfirmPassword(event.target.value);
    }
  };

  const validateForm = () => {
    if (!password || !confirmPassword) {
      setError(t('resetPassword.errorRequired')); 
      return false;
    }
    if (password !== confirmPassword) {
      setError(t('resetPassword.errorMismatch')); 
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      // password change request
      console.log('Enviando solicitud con el token:', token);

      setTimeout(() => {
        setLoading(false);
        navigate('/auth/login');
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(t('resetPassword.errorGeneral')); 
    }
  };

  return (
    <PageContainer title="Akila" description="Password Reset Page">
      <Grid container spacing={0} justifyContent="center" sx={{ overflowX: 'hidden' }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={8}
          xl={9}
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '0.3',
            },
          }}
        >
          <Box position="relative">
            <Box px={3}>
              <Logo />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              height={'calc(100vh - 75px)'}
              sx={{
                display: {
                  xs: 'none',
                  lg: 'flex',
                },
              }}
            >
              <img
                src={img1}
                alt="bg"
                style={{
                  width: '100%',
                  maxWidth: '500px',
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={4}>
            <Typography variant="h4" fontWeight="700">
              {t('resetPassword.title')} 
            </Typography>

            <Typography variant="subtitle1" color="textSecondary" mt={2} mb={0.5}>
              {t('resetPassword.instruction')} 
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                label={t('resetPassword.passwordLabel')} 
                type="password"
                name="password"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                sx={{ mt: 0.5 }}
                required
              />
              
              <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 3, mb: 0.5 }} >
                {t('resetPassword.confirmText')} 
              </Typography>

              <TextField
                label={t('resetPassword.confirmPasswordLabel')} 
                type="password"
                name="confirmPassword"
                fullWidth
                value={confirmPassword}
                onChange={handlePasswordChange}
                sx={{ mt: 0.5 }}
                required
              />
              
              <Box mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? t('resetPassword.buttonResetting') : t('resetPassword.buttonSubmit')} 
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ResetPassword;
