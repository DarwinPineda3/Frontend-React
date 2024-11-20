// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import CustomCheckbox from 'src/components/forms/theme-elements/CustomCheckbox';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import useAuth from 'src/guards/authGuard/UseAuth';
import useMounted from 'src/guards/authGuard/UseMounted';
import { loginType } from 'src/types/auth/auth';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const { t } = useTranslation(); 
  const mounted = useMounted();
  const { signin } = useAuth(); 
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email(String(t('auth.email_invalid'))).required(String(t('auth.email_required'))),
    password: Yup.string()
      .min(6, String(t('auth.password_min_length')))
      .required(String(t('auth.password_required'))),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        await signin(values.email, values.password);
        navigate("/home/dashboard");

        if (mounted.current) {
          setStatus({ success: true });
          setSubmitting(false);  
        }
      } catch (err: any) {
        if (mounted.current) {
          setStatus({ success: false });

          // error de autenticación
          if (err.response) {
            setErrors({ submit: err.response.data.message || String(t('auth.error_authentication')) });
          }
          // error de conexión o el servidor está caído
          else if (err.request) {
            setErrors({ submit: String(t('auth.error_connection')) });
          }
          // Cualquier otro error inesperado
          else {
            setErrors({ submit: String(t('auth.error_unexpected')) });
          }

          setSubmitting(false);
        }
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {String(t(title))} 
        </Typography>
      ) : null}

      {subtext}
      <Box mt={3}>
      </Box>

      {errors.submit && (
        <Box mt={2}>
          <Alert severity="error">{String(errors.submit)}</Alert> 
        </Box>
      )}

      <FormikProvider value={formik}>
        {/* @ts-expect-error */}
        <Form>
          <Stack>
            <Box>
              <CustomFormLabel htmlFor="email">{String(t('auth.email_label'))}</CustomFormLabel> 
              <CustomTextField
                id="email"
                variant="outlined"
                fullWidth
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box>
              <CustomFormLabel htmlFor="password">{String(t('auth.password_label'))}</CustomFormLabel> 
              <CustomTextField
                id="password"
                type="password"
                variant="outlined"
                fullWidth
                {...getFieldProps('password')}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
              <FormGroup>
                <FormControlLabel
                  control={<CustomCheckbox defaultChecked />}
                  label={String(t('auth.remember_device'))} 
                />
              </FormGroup>
              <Typography
                component={Link}
                to="/auth/forgot-password"
                fontWeight="500"
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                }}
              >
                {String(t('auth.forgot_password_link'))} 
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              onClick={async () => {
                await formik.submitForm(); 
              }}
              disabled={isSubmitting}
            >
              {String(t('auth.sign_in_button'))} 
            </Button>
          </Box>
        </Form>
      </FormikProvider>

      {subtitle}
    </>
  );
};

export default AuthLogin;
