export interface IPayload {
  email: string;
  role: string;
  password: string;
  _id:string
  iat?: number;
  exp?: number;
}
