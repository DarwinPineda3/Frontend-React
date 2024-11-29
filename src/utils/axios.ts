import axios from 'axios';
import { getValidAccessToken } from 'src/guards/jwt/JwtContext';

const axiosServices = axios.create();

// interceptor for http
axiosServices.interceptors.request.use(
  async (config) => {
    try {
      if (config.url?.includes('/api/token/')) {
        return config;
      }
      if (!config.headers) {
        config.headers = {};
      }
      const token = await getValidAccessToken();
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    }
    catch (error) {
      console.error("Failed to set authorization header:", error);
      //redirect to login page
      window.localStorage.clear();
      window.location.href = '/'
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosServices;
