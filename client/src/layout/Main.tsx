// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
// import Footer from "../components/landingPage/Footer";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet /> 
      </main>
      {/* <Footer /> */}
    </>
  );
}
