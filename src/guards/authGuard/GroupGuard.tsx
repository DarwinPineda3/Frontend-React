import { Box } from '@mui/material';
import { useEffect } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import Loader from 'src/components/shared/Loader/Loader';
import { decodeToken } from 'react-jwt';  
import Router from 'src/routes/Router';
import useAuth from './UseAuth';

const getUserRolesFromToken = () => {
  const accessToken = window.localStorage.getItem('accessToken'); 

  if (!accessToken) {
    return [];
  }

  const decoded: any = decodeToken(accessToken);

  console.log('Decoded Token:', decoded);

  const groups = decoded?.groups ? decoded.groups.split(',').map((group: string) => group.trim()) : [];

  console.log('User Roles:', groups);  
  return groups;
};

const GroupGuard = ({ children }: any) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 

  const userRoles = getUserRolesFromToken();  
  console.log('User Roles:', userRoles); 

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }
  }, [isAuthenticated, isInitialized, navigate]);

  const checkPermission = (routeRoles: string[] | undefined) => {
    if (!routeRoles) return true;
    return userRoles.some(role => routeRoles.includes(role));
  };

  const findRoute = (routes: any[], path: string) => {
    for (const route of routes) {

      if (matchPath(route.path, path)) {
        return route;
      }
      if (route.children) {
        const childRoute = findRoute(route.children, path);
        if (childRoute) {
          return childRoute;
        }
      }
    }
    return null;
  };

  const currentRoute = location.pathname;
  const route = findRoute(Router, currentRoute);
  const hasPermission = route && checkPermission(route.roles);

  useEffect(() => {
    if (isInitialized && isAuthenticated && userRoles.includes('CyberGuard') && !userRoles.includes('Scan360') && currentRoute === '/') {
      navigate('/monitoring/threats-overview', { replace: true });
    }
  }, [isInitialized, isAuthenticated, userRoles, currentRoute, navigate]);

  useEffect(() => {
    if (isInitialized && isAuthenticated && !hasPermission) {
      navigate('/404', { replace: true });
    }
  }, [isInitialized, isAuthenticated, hasPermission, navigate]);

  console.log('User has permission:', hasPermission);

  if (!isInitialized) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center" mt={4} mb={4}>
        <Loader />
      </Box>
    );
  }

  return hasPermission ? children : null;
};

export default GroupGuard;
