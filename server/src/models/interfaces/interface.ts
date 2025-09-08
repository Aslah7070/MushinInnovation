import { NextFunction } from "express";
import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";   
  createdAt: Date;
  updatedAt: Date;
}

export interface ITask extends Document {
  title: string;
  status: "pending"| "completed";
  description:string
  user: mongoose.Types.ObjectId; 
}

export type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;