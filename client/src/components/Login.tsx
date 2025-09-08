
import { useFormik } from "formik";



import {Label} from "../components/ui/label"
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
// import { Spinner } from "../re-usable/spinner";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas/auth.schema";
import { AuthController } from "../controllers/index.controller";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Spinner } from "../re-usable/spinner";

const Login = () => {
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()
  const navigate=useNavigate()

    const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
     console.log(values)
     const{email,password}=values
  try {
    setLoading(true)
       await AuthController.login(email,password,dispatch,navigate)
  } catch (error) {
    console.log(error)
  }finally{
    setLoading(false)
  }
    },
  });
  return (
 <div className=" w-full max-w-md px-6">
        <div className="flex flex-col items-center">
          <h2 className="text-white text-2xl font-semibold">Welcome Back</h2>
          <p className="text-gray-400 mt-1">Log in to continue your journey</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-6 bg-transparent">
     
          <Label  htmlFor="email">
            EMAIL <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your-email@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
       
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}

      
          <Label  htmlFor="password">
            PASSWORD <span className="text-red-500">*</span>
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
     
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}

       
          <Button
          variant={"blue"}
          rounded={"md"}
            type="submit"
            disabled={loading}
            className="flex justify-between "
          >
             Log In
           <span > {loading&&<Spinner/>}</span>
          </Button>
        </form>

 

      

        <div className=" flex flex-col items-end justify-start">

          <p className="text-center text-gray-300 text-xs mt-2 ">
            Don&apos;t have an account?{" "}
            <Link to="/signup"  className="text-blue-400 text-xs hover:underline">
             signup
            </Link>
          </p>
        </div>
      </div>
  )
}

export default Login
