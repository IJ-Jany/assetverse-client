import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Error from "../components/Error";
import Home from "../pages/home/Home";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    errorElement:<Error/>,
    children:[
      {
        path:'/',
        element:<Home/>
      }
    ]
  },
]);