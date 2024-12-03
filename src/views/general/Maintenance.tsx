import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import MaintenanceImg from 'src/assets/images/backgrounds/maintenance.svg';

const Maintenance = () => {
  let primaryColor = useTheme().palette.primary.main;
  <Box
    display="flex"
    flexDirection="column"
    textAlign="center"
    justifyContent="center"
  >
    <Container maxWidth="md">
      <img src={MaintenanceImg} alt="404" style={{ width: '100%', maxWidth: '500px' }} />
      <Typography align="center" variant="h1" mb={4}>
        Maintenance Mode
      </Typography>
      <Typography align="center" variant="h4" mb={4}>
        Website is Under Construction. Check back later!
      </Typography>
      <Button color="primary" variant="contained" component={Link} to="/" disableElevation>
        Go Back to Home
      </Button>
    </Container>
    <Container maxWidth="md" sx={{ paddingTop: '10px' }}>
      <Link to="/logout" style={{ color: primaryColor }}>
        Logout
      </Link>
    </Container>
  </Box>
};

export default Maintenance;
