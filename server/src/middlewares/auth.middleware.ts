import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.util";
import { HttpResponse } from "../constants/http.response";
import { HttpStatus } from "../constants/http.status";
import { createHttpError } from "../utils/error-catch.util";
import { IPayload } from "../interfaces";

export function authVerification(req: Request, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.TOKEN_MISSING);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.TOKEN_MISSING);
    }

    const payload = verifyAccessToken(token) as IPayload;
    if(!payload){
         res.status(HttpStatus.UNAUTHORIZED).json({success:false,message:HttpResponse.UNAUTHORIZED})
         return
    }

    // attach payload for later usage
   req.headers["x-user-payload"] = JSON.stringify(payload);

    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.TOKEN_INVALID);
    } else {
      throw createHttpError(HttpStatus.FORBIDDEN, HttpResponse.TOKEN_INVALID);
    }
  }
}
