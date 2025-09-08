// src/layouts/MainLayout.tsx
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import { useAppSelector } from "../redux/hooks/hook";


export default function MainLayout() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
  if (isAuthenticated ) {
    return <Navigate to="/home" replace />;
  }
  return (
    <>
      <NavBar />
      <main>
        <Outlet /> 
      </main>
  
    </>
  );
}
