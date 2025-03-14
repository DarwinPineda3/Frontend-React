import CryptoJS from 'crypto-js';
import { decodeToken } from 'react-jwt';
import axios from 'axios';

const base64UrlEncode = (input: string) => {
  return btoa(input)
    .replace(/=/g, '')  
    .replace(/\+/g, '-')  
    .replace(/\//g, '_');  
};

const base64UrlDecode = (input: string) => {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  return atob(base64);
};

const getUserGroups = () => {
  const accessToken = window.localStorage.getItem('accessToken'); 

  if (!accessToken) {
    return [];
  }

  const decoded: any = decodeToken(accessToken);
  console.log(decoded);

  const groups = decoded?.groups ? decoded.groups.split(',').map((group: string) => group.trim()) : [];

  return groups;
};

const getTenant = () => {
  const accessToken = window.localStorage.getItem('accessToken'); 

  if (!accessToken) {
    return null; 
  }

  const decoded: any = decodeToken(accessToken);

  return decoded?.tenant || null;
};

export const getUserInfo = () => {
  const accessToken = window.localStorage.getItem('accessToken');
  if (!accessToken) return null;
  const decoded: any = decodeToken(accessToken);
  return decoded || null;
};

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded: any = decodeToken(accessToken); 

  if (!decoded || !decoded.exp) {
    return false;
  }

  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const verify = (token: string, secretKey: string) => {
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const expectedSignature = CryptoJS.HmacSHA256(signingInput, secretKey).toString(CryptoJS.enc.Base64)
    .replace(/=/g, '') 
    .replace(/\+/g, '-') 
    .replace(/\//g, '_'); 

  return signature === expectedSignature;
};

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

const sign = (payload: any, secretKey: string, options: any) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const expiresIn = options.expiresIn ? now + options.expiresIn : now + 172800; 

  payload.exp = expiresIn;

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const signature = CryptoJS.HmacSHA256(signingInput, secretKey).toString(CryptoJS.enc.Base64)
    .replace(/=/g, '') 
    .replace(/\+/g, '-') 
    .replace(/\//g, '_'); 

  const jwtToken = `${encodedHeader}.${encodedPayload}.${signature}`;

  return jwtToken;
};

const getBaseBackofficeUrl = () => {
  return process.env.REACT_APP_BACKOFFICE_API_URL || 'https://default-backoffice.url'; 
};


const getBaseApiUrl = () => {
  return process.env.REACT_APP_API_URL || 'https://default-api.url'; 
};

export { 
  getUserGroups, 
  isValidToken, 
  setSession, 
  sign, 
  verify, 
  getBaseBackofficeUrl, 
  getBaseApiUrl,
  getTenant, 
};
