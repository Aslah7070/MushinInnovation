
import { Navigate, Route, Routes } from 'react-router-dom'
// import Home from '../pages/Home'

// import MainLayout from '../layout/Main'
// import { AuthHydrator } from '../redux/hooks/hydrator'
import Auth from '../pages/auth'
import HomePage from '../pages/Home'
import MainLayout from '../layout/Main'
import ProtectedRoute from './ProtuctedRoute'
import PublicRoute from '../layout/publicRoute'


const AppRoutes = () => {
//   <AuthHydrator/>
  return (
  <Routes>
    <Route element={<MainLayout/>}>
     <Route  path='/home' element={
        <ProtectedRoute allowedRoles={["user"]} >
            <HomePage/>
        </ProtectedRoute>
     }/>
     </Route>
     <Route path="/" element={<Navigate to="/login" replace />} />
    {/* <Route  path='/login' element={<Auth type="login" />}/>
    <Route  path='/signup' element={<Auth type="signup" />}/> */}

    <Route path="/login" element={
  <PublicRoute>
   <Auth type="login" />
  </PublicRoute>
}/>
<Route path="/signup" element={
  <PublicRoute>
  <Auth type="signup" />
  </PublicRoute>
}/>

   

    
  </Routes>
  )
}

export default AppRoutes
