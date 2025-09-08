import { HttpResponse } from "../constants/http.response";
import { HttpStatus } from "../constants/http.status";
import { comparePasswords, hashPassword } from "../helper/hashing.helper";
import { User } from "../models/implementation/user.mode";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/jwt.util";
import { deleteCookie, setCookie } from "../utils/cookie";
import { NextFunction, Request, Response } from "express";
import { IPayload } from "../interfaces";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password, name } = req.body;

  const isExistng = await User.findOne({ email: email });
  if (isExistng) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ success: false, message: "email is already existing" });
    return;
  }
  const hashedPassword = await hashPassword(password);
  if (!hashedPassword) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "password hashing filed" });
    return;
  }

  const user = new User({
    email,
    password: hashedPassword,
    name: name,
  });

  await user.save();

  const payload = { _id: user._id, role: user.role, name: user.name };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  await setCookie(res, refreshToken);

  res.status(HttpStatus.OK).json({
    success: true,
    message: HttpResponse.LOGIN_SUCCESS,
    accessToken: accessToken,
    user: {
      _id: user._id,
      name: user.name,
      role: user.role,
    },
  });
  return;
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ success: false, message: HttpResponse.USER_NOT_FOUND });
    return;
  }

  const isMatch = await comparePasswords(password, user.password);
  if (!isMatch) {
    res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ success: false, message: HttpResponse.INVALID_CREDENTIALS });
    return;
  }

  const payload = { _id: user._id, role: user.role, name: user.name };
  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);

  await setCookie(res, refreshToken);

  res.status(HttpStatus.OK).json({
    success: true,
    message: HttpResponse.LOGIN_SUCCESS,
    accessToken,
    user: {
      _id: user._id,
      name: user.name,
      role: user.role,
    },
  });
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await deleteCookie(res);

    res.status(HttpStatus.OK).json({
      success: true,
      message: HttpResponse.LOGOUT_SUCCESS || "Logout successful",
    });
  } catch (err) {
    next(err);
  }
};

  


export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: "No refresh token provided" });
      return;
    }

    // Verify refresh token
    let decodedToken: IPayload|null
    try {
      decodedToken = await verifyRefreshToken(refreshToken)
    } catch (err) {
      res.status(HttpStatus.FORBIDDEN).json({ message: "Invalid refresh token" });
      return;
    }
     if(!decodedToken){
      res.status(HttpStatus.UNAUTHORIZED).json({success:false,message:HttpResponse.TOKEN_INVALID})
      return
     }

    const newAccessToken = await generateAccessToken(decodedToken)

    res.status(HttpStatus.OK).json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};


export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const accessToken: string | null =
    req.headers["authorization"]?.split(" ")[1] || null;
    console.log(accessToken)
  const refreshToken = req.cookies.refreshToken;
 console.log("refreshToken",refreshToken)
  if (!accessToken && !refreshToken) {
    res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ success: false, message: HttpResponse.UNAUTHORIZED });
    return;
  }

  let decodedToken: IPayload | null = null;
  let newAccessToken: string | null = null;
  if (accessToken) {
    try {
      decodedToken = await verifyAccessToken(accessToken);
      console.log("decodedToken",decodedToken)
    } catch {
      if (!refreshToken) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ success: false, message: HttpResponse.TOKEN_INVALID });
        return;
      }
    }
  }
  if (!decodedToken && refreshToken && accessToken) {
    try {
      decodedToken = await verifyRefreshToken(accessToken);

      if (!decodedToken) {
        throw new Error("Refresh token verification failed");
      }
      newAccessToken = await generateAccessToken({
        email: decodedToken.email,
        role: decodedToken.role,
        password: decodedToken.password,
        _id: decodedToken._id,
      });
    } catch (error) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, message: HttpResponse.TOKEN_INVALID });
      return;
    }
  }

  if (!decodedToken) {
    res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ success: false, message: HttpResponse.UNAUTHORIZED });
    return;
  }

  try {
    const user = await User.findById(decodedToken._id);
    if (!user) {
      res.status(404).json({ success: false, message: "Not found" });
      return;
    }

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
     console.log(error)
  }
};




