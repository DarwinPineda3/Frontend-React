// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SnackBarInfo from 'src/layouts/full/shared/SnackBar/SnackBarInfo';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const API_FORGOT_PASSWORD = '/api/forgot-password';

const AuthForgotPassword = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control the snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for the snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success'); // Snackbar

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('authForgotPassword.invalidEmail'));
      return;
    }

    try {
      setError(null);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BACKEND_BASE_URL}${API_FORGOT_PASSWORD}`,
        { email },
      );
      if (response.status === 200) {
        setEmail('');
        setSnackbarMessage(response.data.detail);
        setSnackbarSeverity('info');
        setTimeout(() => {
          setLoading(false);
          setSnackbarOpen(true);
        }, 0);
        setSnackbarOpen(false);
      }
    } catch (err: any) {
      console.error('Error en Forgot Password:', err);
      setError(err.response?.data?.message || t('authForgotPassword.errorSubmitting'));
    }
  };
  return (
    <>
      <Stack mt={4} spacing={2}>
        <CustomFormLabel htmlFor="email">{t('authForgotPassword.emailLabel')}</CustomFormLabel>
        <form onSubmit={handleSubmit}>
          <CustomTextField
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
            error={Boolean(error)}
            helperText={error}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
          >
            {t('authForgotPassword.forgotPasswordButton')}
          </Button>
        </form>
        <Button
          color="primary"
          variant="outlined"
          size="large"
          fullWidth
          component={Link}
          to="/auth/login"
        >
          {t('authForgotPassword.backToLoginButton')}
        </Button>
        {/* Snackbar */}
        {snackbarOpen && (
          <SnackBarInfo
            color={snackbarSeverity}
            title={snackbarSeverity === 'info' ? 'Info' : 'Error'}
            message={snackbarMessage}
          />
        )}
      </Stack>
    </>
  );
};

export default AuthForgotPassword;
