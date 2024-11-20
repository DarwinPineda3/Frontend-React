// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const mounted = useMounted();
  const { signin } = useAuth();

  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
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
        navigate("/");
        if (mounted.current) {
          setStatus({ success: true });
          setSubmitting(true);
        }
      } catch (err: any) {
        if (mounted.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
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
          {title}
        </Typography>
      ) : null}

      {subtext}
      <Box mt={3}>
      </Box>
      {errors.submit && (
        <Box mt={2}>
          <Alert severity="error">{errors.submit}</Alert>
        </Box>
      )}
      <FormikProvider value={formik}>
        {/*@ts-expect-error*/}
        <Form>
          <Stack>
            <Box>
              <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
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
              <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
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
                  label="Remeber this device"
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
                Forgot Password ?
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
              Sign In
            </Button>
          </Box>
        </Form>
      </FormikProvider>
      {subtitle}
    </>
  );
};

export default AuthLogin;
