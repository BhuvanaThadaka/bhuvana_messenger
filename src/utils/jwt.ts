
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  exp: number;
  iat: number;
  sub: string;
  [key: string]: any;
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

export const getTokenExpirationDate = (token: string): Date | null => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return null;
  
  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
};
