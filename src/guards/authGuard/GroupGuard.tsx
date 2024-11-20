import { Box } from '@mui/material';
import { useEffect } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import Loader from 'src/components/shared/Loader/Loader';
import { getUserGroups } from 'src/guards/jwt/Jwt';
import Router from 'src/routes/Router';
import useAuth from './UseAuth';

const GroupGuard = ({ children }: any) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get current location (path)

  // Assuming you have a function to get the user roles from the auth context
  const userRoles = getUserGroups();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }
  }, [isAuthenticated, isInitialized, navigate]);

  // Function to check if user has permission for the route
  const checkPermission = (routeRoles: string[] | undefined) => {
    if (!routeRoles) return true;
    return userRoles.some(role => routeRoles.includes(role));
  };

  const findRoute = (routes: any[], path: string) => {
    for (const route of routes) {
      // Check if the path matches the current route or if it matches a dynamic route pattern
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
  //console.log('route', currentRoute);
  const hasPermission = route && checkPermission(route.roles);

  // Special redirect for CyberGuard role on root path
  useEffect(() => {
    if (isInitialized && isAuthenticated && userRoles.includes('CyberGuard') && currentRoute === '/') {
      navigate('/monitoring/threats-overview', { replace: true });
    }
  }, [isInitialized, isAuthenticated, userRoles, currentRoute, navigate]);

  useEffect(() => {
    if (isInitialized && isAuthenticated && !hasPermission) {
      navigate('/404', { replace: true });
    }
  }, [isInitialized, isAuthenticated, hasPermission, navigate]);

  if (!isInitialized) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center" mt={4} mb={4}>
        <Loader />
      </Box>
    );
  }

  //console.log('hasPermission', hasPermission);
  return hasPermission ? children : null;
};

export default GroupGuard;
