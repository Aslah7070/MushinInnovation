// src/layouts/MainLayout.tsx

import NavBar from "../components/navbar/NavBar";



export default function MainLayout() {

  return (
    <>
      <NavBar />
      <main>
        <Outlet /> 
      </main>
  
    </>
  );
}
