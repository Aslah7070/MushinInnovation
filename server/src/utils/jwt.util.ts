import jwt from "jsonwebtoken";
import { env } from "../configs/env.config";
import { IPayload } from "../interfaces";

const ACCESS_KEY = env.JWT_ACCESS_SECRET as string;
const REFRESH_KEY = env.JWT_REFRESH_SECRET as string;
console.log(ACCESS_KEY)
console.log(REFRESH_KEY)

const ACCESS_TOKEN_EXPIRY = "15m";  
const REFRESH_TOKEN_EXPIRY = "1d";

export function generateAccessToken(payload: object): string {
    const { exp, iat, ...rest } = payload as any;
  return jwt.sign(rest , ACCESS_KEY, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

export function generateRefreshToken(payload: object): string {
  return jwt.sign(payload, REFRESH_KEY, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, ACCESS_KEY)as IPayload;
  } catch (err) {
    console.error(err)
    return null;
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, REFRESH_KEY)as IPayload
  } catch (err) {
    console.error(err)
    return null;
  }
}