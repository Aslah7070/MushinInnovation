import type React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hook";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../configs/axios.config.ts";
import { logOut, setUser } from "../redux/slices/authSlice";


interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children, 
  allowedRoles,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  console.log(user,"worked");
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axiosInstance.get(`/auth/verify-token`);
        console.log("protected",response)
        // return <h1>afdfsd</h1>

        if (response.data.success) {
          const {user}=response.data

          dispatch(
            setUser({user})
          );
         
        } else {
          dispatch(logOut());
     
          navigate("/"); 
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        dispatch(logOut());
       
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    verifyToken();
  }, [dispatch, navigate]);


  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        {/* <ScaleLoader color="rgb(37, 99, 235)" /> */}
     <h1>helloasdS</h1>
  
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
