import type { NavigateFunction } from "react-router-dom";
import type { AppDispatch } from "../redux/store";
// import { AuthService } from "../services/auth.service";
import { logOut, setUser } from "../redux/slices/authSlice";
import type { IAuth } from "../interfaces/user";
import { axiosInstance } from "../configs/axios.config";


export class AuthController {
  static async login(
    email: string,
    password: string,
    dispatch: AppDispatch,
    navigate: NavigateFunction
  ) {
    try {
      const response = await axiosInstance.post("/auth/login",{email,password})
      console.log(response,"R")
      if (response) {
           
        const { accessToken,user} = response.data;

        
        dispatch(setUser({accessToken,user}));


        navigate("/home");
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  static async userSignUp(signupData:IAuth,dispatch: AppDispatch,navigate: NavigateFunction){
      const response = await axiosInstance.post("/auth/signup",signupData)
        console.log(response,"RS")
       if(response){
         const { accessToken,user} = response.data;
        
        dispatch(setUser({accessToken,user}))
        navigate("/home");

       }
  }

  static async logout(dispatch: AppDispatch,navigate: NavigateFunction){
    
  const response=await axiosInstance.post("/auth/logout")
    if(response){
 
        
        dispatch(logOut())
        navigate("/")

       }
  }

  


  
}
