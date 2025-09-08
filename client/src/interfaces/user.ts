import type { TooltipProps } from "flowbite-react";

export interface DecodedToken {
  _id: string;
  name: string;
  role: string;
}

export  interface IAuth{
    name:string
    email:string
    password:string
}
export interface IUser{
    name: string;
  email: string;
  password: string;
  role: "user" | "admin";   
  createdAt: Date;
  updatedAt: Date;
}

export  interface ITask{
    title:string
   status?: "pending"| "completed";
    description:string
    user?:IUser
    _id:string
    createdAt:Date
    updatedAt:Date
}

export interface IToolTips{
    longText:string,
    element:React.ReactElement;
    position:TooltipProps['placement'];
    bgColor:string;
    textColor:string
}