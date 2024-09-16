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
const setSession = (accessToken: string | null) => {
  if (accessToken) {
    window.localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
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
  console.log('Signing Input:', signingInput);

  // Create the HMAC SHA-256 signature using crypto-js
  const signature = CryptoJS.HmacSHA256(signingInput, secretKey).toString(CryptoJS.enc.Base64)
    .replace(/=/g, '') // Remove padding
    .replace(/\+/g, '-') // Base64Url encoding
    .replace(/\//g, '_'); // Base64Url encoding

  const jwtToken = `${encodedHeader}.${encodedPayload}.${signature}`;
  console.log('Generated JWT Token:', jwtToken);
  console.log('sign: ', secretKey);
  return jwtToken;
};

// Function to verify a JWT (used for the mock API)
const verify = (token: string, secretKey: string) => {
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  // Log inputs used for verification
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  console.log('Signing Input for Verification:', signingInput);

  // Recreate the signature for comparison using crypto-js
  const verifiedSignature = CryptoJS.HmacSHA256(signingInput, secretKey).toString(CryptoJS.enc.Base64)
    .replace(/=/g, '') // Remove padding
    .replace(/\+/g, '-') // Base64Url encoding
    .replace(/\//g, '_'); // Base64Url encoding

  console.log('Token Signature:', signature);
  console.log('Recreated Signature:', verifiedSignature);

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

export { isValidToken, setSession, sign, verify };
