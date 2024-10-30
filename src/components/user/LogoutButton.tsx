import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/auth/login');
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      fullWidth
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;