




import { useFormik } from "formik";



import {Label} from "../components/ui/label"
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Spinner } from "../re-usable/spinner";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../schemas/auth.schema";
import { AuthController } from "../controllers/index.controller";
import { useDispatch } from "react-redux";
import { useState } from "react";

const SignUp = () => {
      const [loading, setLoading] = useState(false);

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const formik = useFormik({
    initialValues: {
        name:"",
      email: "",
      password: "",
      repassword:""
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {

   try {
     setLoading(true);
      await AuthController.userSignUp(values,dispatch,navigate)
   } catch (error) {
    console.log(error)
   }finally{
     setLoading(false);
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

             <Label  htmlFor="name">
            NAME <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="name"
            placeholder="your-name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
       
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}

     
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

           <Label  htmlFor="repassword">
            CO-PASSWORD <span className="text-red-500">*</span>
          </Label>
          <Input
            id="repassword"
            name="repassword"
            type="password"
            placeholder="repassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repassword}
     
          />
          {formik.touched.repassword && formik.errors.repassword && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.repassword}</p>
          )}

       
          <Button
          variant={"blue"}
          rounded={"md"}
            type="submit"
            disabled={loading}
            className="flex justify-between "
          >
             Create
           <span > {loading&&<Spinner/>}</span>
          </Button>
        </form>

 

      

        <div className=" flex flex-col items-end justify-start">

          <p className="text-center text-gray-300 text-xs mt-2 ">
           Already have an account?{" "}
            <Link to="/login"  className="text-blue-400 text-xs hover:underline">
             login
            </Link>
          </p>
        </div>
      </div>
  )
}

export default SignUp

