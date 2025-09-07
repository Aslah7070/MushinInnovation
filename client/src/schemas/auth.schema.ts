// lib/validations/signupSchema.js
import * as Yup from "yup";
export const signupSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  
    repassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),

  });

  export const loginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  

  });

  export const forgotPasswordSchema=Yup.object({
      newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm password is required')
    })
