// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Box, Grid, Typography } from '@mui/material';
import img1 from 'src/assets/images/backgrounds/login-bg.png';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from '../authForms/AuthLogin';

const Login = () => (
  <PageContainer title="Login" description="this is Login page" noPadding>
    <Grid container spacing={0} sx={{ overflowX: 'hidden'}}>
      <Grid
        item
        xs={12}
        sm={12}
        lg={7}
        xl={8}
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
                maxWidth: '300px',
              }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        lg={5}
        xl={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box p={4}>
          <AuthLogin
            title="Welcome to Akila"
            subtext={
              <Typography variant="subtitle1" color="textSecondary" mb={1}>
                Your Cybersecurity Platform
              </Typography>
            }
          />
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
);

export default Login;
