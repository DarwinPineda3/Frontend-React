import { useContext } from 'react';
import { AuthContext } from 'src/guards/jwt/JwtContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;