import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import AuthProvider from './providers/AuthProvider.jsx';
import {router} from './routes/Routes.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




createRoot(document.getElementById('root')).render(
  <StrictMode>
       <ToastContainer 
        position="top-right"
        autoClose={3000}
      />
   <AuthProvider>
     <RouterProvider router={router} />,
   </AuthProvider>
  </StrictMode>,
)
