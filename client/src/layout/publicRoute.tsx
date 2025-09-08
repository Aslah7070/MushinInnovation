import type React from "react";
import { useAppSelector } from "../redux/hooks/hook";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }


  return <>{children}</>;
};

export default PublicRoute;
