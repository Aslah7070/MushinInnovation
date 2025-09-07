import { env } from "../configs/env.config";
import { Response } from "express";

export function setCookie(res: Response, refreshToken: string) {
console.log("cookie secure",env.NODE_ENV==="PRODUCTION")
console.log("cookie ",env.NODE_ENV=="PRODUCTION")
    res.cookie("refreshToken", refreshToken, {
       httpOnly: true,
            secure: env.NODE_ENV==="PRODUCTION",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite:env.NODE_ENV === "PRODUCTION" ? "none" : "lax",
    });
}

export function deleteCookie(res: Response) { 
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PRODUCTION',
        sameSite: env.NODE_ENV === 'PRODUCTION' ? 'none' : 'strict'
    })
}