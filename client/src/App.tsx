
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoute'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
function App() {


  return (
       <>
      <BrowserRouter>

        <AppRoutes />
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        

      </BrowserRouter>
    </>
  )
}

export default App
