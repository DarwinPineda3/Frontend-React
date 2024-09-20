import { useNavigate } from 'react-router-dom';
import useAuth from './UseAuth';
import { useEffect } from 'react';
import Loader from 'src/components/shared/Loader/Loader';
import { Box } from '@mui/material';

const AuthGuard = ({ children }: any) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }
  }, [isAuthenticated, isInitialized, navigate]);

  if (!isInitialized) {
    
    return <Box display="flex" justifyContent="center" alignContent="center" mt={4} mb={4}>
      <Loader />
    </Box>; 
  }

  return children;
};

export default AuthGuard;
