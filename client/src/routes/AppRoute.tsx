
import { Route, Routes } from 'react-router-dom'
// import Home from '../pages/Home'

// import MainLayout from '../layout/Main'
// import { AuthHydrator } from '../redux/hooks/hydrator'
import Auth from '../pages/auth'
import HomePage from '../pages/Home'
import MainLayout from '../layout/Main'
import ProtectedRoute from './ProtuctedRoute'


const AppRoutes = () => {
//   <AuthHydrator/>
  return (
  <Routes>
    <Route element={<MainLayout/>}>
     <Route  path='/home' element={
        <ProtectedRoute allowedRoles={["CLIENT"]} >
            <HomePage/>
        </ProtectedRoute>
     }/>
     </Route>
    <Route  path='/login' element={<Auth type="login" />}/>
    <Route  path='/signup' element={<Auth type="signup" />}/>

   

    
  </Routes>
  )
}

export default AppRoutes
