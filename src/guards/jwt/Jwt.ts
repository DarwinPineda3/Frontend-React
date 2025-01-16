import CryptoJS from 'crypto-js';
import { decodeToken } from 'react-jwt';
import axios from 'src/utils/axios';

// Base64Url encode
const base64UrlEncode = (input: string) => {
  return btoa(input)
    .replace(/=/g, '')  // Remove any '=' padding
    .replace(/\+/g, '-')  // Replace '+' with '-'
    .replace(/\//g, '_');  // Replace '/' with '_'
};

// Base64Url decode
const base64UrlDecode = (input: string) => {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  return atob(base64);
};

// Function to check if the token is valid
const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded: any = decodeToken(accessToken); // Frontend token decoding with react-jwt

  if (!decoded || !decoded.exp) {
    return false;
  }

  const currentTime = Date.now() / 1000;
  const response = decoded.exp > currentTime;
  return response;
};

// Function to set or clear the session
const setSession = (accessToken: string | null, refreshToken: string | null) => {
  if (accessToken) {
    window.localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }

  if (refreshToken) {
    window.localStorage.setItem('refreshToken', refreshToken);
  } else {
    window.localStorage.removeItem('refreshToken');
  }
};

const getUserGroups = (): string[] => {
  const accessToken = window.localStorage.getItem('accessToken');
  if (!accessToken) {
    return [];
  }
  const decoded: any = decodeToken(accessToken);
  if (decoded && decoded.groups) {
    // groups will be a string of comma separated values
    return decoded.groups.split(', ');
  }
  return [decoded?.groups];
};

const getTenant = (): string | null => {
  const accessToken = window.localStorage.getItem('accessToken');
  if (!accessToken) {
    return null;
  }
  const decoded: any = decodeToken(accessToken);
  if (decoded && decoded.schema_name) {
    // groups will be a string of comma separated values
    return decoded.schema_name;
  }
  return null;
};

const getBaseApiUrl = (): string => {
  const tenant = getTenant();
  return `${import.meta.env.VITE_API_BACKEND_BASE_URL_TEMPLATE.replace("{}", tenant)}/api`;
}

const getBaseBackofficeUrl = (): string => {
  return `${import.meta.env.VITE_API_BACKEND_BASE_URL}`;
}

// Function to get user information from the token
const getUserInfo = (): { user_id: string; first_name: string; last_name: string; email: string; groups: string } | null => {
  const accessToken = window.localStorage.getItem('accessToken');
  if (!accessToken) {
    return null;
  }

  const decoded: any = decodeToken(accessToken);

  if (decoded) {
    // Mapear correctamente email y user_id
    return {
      user_id: decoded.user_id || 'ID no disponible',
      first_name: decoded.first_name || 'Nombre no disponible',
      last_name: decoded.last_name || 'Apellido no disponible',
      email: decoded.email || 'Email no disponible',
      groups: decoded.groups || 'Grupo no disponible',
    };
  }

  return null;
};


// Function to sign a JWT (used for the mock API)
const sign = (payload: any, secretKey: string, options: any) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const expiresIn = options.expiresIn ? now + options.expiresIn : now + 172800; // default to 2 days

  payload.exp = expiresIn;

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  // Log what is being signed
  const signingInput = `${encodedHeader}.${encodedPayload}`;


  // Create the HMAC SHA-256 signature using crypto-js
  const signature = CryptoJS.HmacSHA256(signingInput, secretKey).toString(CryptoJS.enc.Base64)
    .replace(/=/g, '') // Remove padding
    .replace(/\+/g, '-') // Base64Url encoding
    .replace(/\//g, '_'); // Base64Url encoding

  const jwtToken = `${encodedHeader}.${encodedPayload}.${signature}`;


  return jwtToken;
};

// Function to verify a JWT (used for the mock API)
const verify = (token: string, secretKey: string) => {
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  // Log inputs used for verification
  const signingInput = `${encodedHeader}.${encodedPayload}`;


  // Recreate the signature for comparison using crypto-js
  const verifiedSignature = CryptoJS.HmacSHA256(signingInput, secretKey).toString(CryptoJS.enc.Base64)
    .replace(/=/g, '') // Remove padding
    .replace(/\+/g, '-') // Base64Url encoding
    .replace(/\//g, '_'); // Base64Url encoding




  if (verifiedSignature !== signature) {
    throw new Error('Invalid signature');
  }

  // Decode the payload
  const payload = JSON.parse(base64UrlDecode(encodedPayload));
  const now = Math.floor(Date.now() / 1000);

  // Check if the token is expired
  if (payload.exp && payload.exp < now) {
    throw new Error('Token expired');
  }

  return payload;
};

export { getBaseApiUrl, getBaseBackofficeUrl, getTenant, getUserGroups, getUserInfo, isValidToken, setSession, sign, verify };

