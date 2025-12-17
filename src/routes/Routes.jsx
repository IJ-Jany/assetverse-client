import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Error from "../components/Error";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import RegisterEmployee from "../pages/register/RegsiterEmplyee";
import RegisterHR from "../pages/register/RegisterHR";
import MyAssets from "../pages/dashboard/employee/MyAssets";
import MyTeam from "../pages/dashboard/employee/MyTeam";
import RequestAsset from "../pages/dashboard/employee/RequestAsset";
import Assets from "../pages/dashboard/hr/Assets";
import AddAsset from "../pages/dashboard/hr/AddAsset";
import EmployeeList from "../pages/dashboard/hr/EmployeeList";
import Requests from "../pages/dashboard/hr/Requests";
import UpgradePackage from "../pages/dashboard/hr/UpgradePackage";
import Profile from "../pages/dashboard/Profile";
import AssetsList from "../components/AssetsList";
import HRRequests from "../pages/dashboard/hr/Requests";
import PaySuccess from "../pages/payment/PaySuccess";
import About from "../components/About";
import FeaturesSection from "../components/Features";
import Packages from "../components/Packages";
import PrivateRoute from "./PrivateRoute";
import HrRoute from "./HrRoute";
import EmployeeRoute from "./EmployeeRoute";
import HRDashboardPage from "../pages/dashboard/hr/HRDashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/",
        element: <Home />
      },
     
       {
            path:'/about',
            element:<About/>
          },
            {
            path:'/features',
            element:<FeaturesSection/>
          },
            {
            path:'/packages',
            element:<Packages/>
          }
    ]
  },
  {
     path: "/login",
      element: <Login />
  },
  {
     path: "/register-employee",
     element: <RegisterEmployee /> 
  },
  { 
    path: "/register-hr", 
    element: <RegisterHR /> },
     { 
    path: "/pay-success", 
    element:<PrivateRoute><HrRoute><PaySuccess /></HrRoute></PrivateRoute> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [


     
      { 
        path: "my-assets", 
        element:<PrivateRoute>
          <EmployeeRoute>
            <MyAssets />
            </EmployeeRoute></PrivateRoute>
       },
      {
         path: "my-team",
         element:<PrivateRoute><EmployeeRoute><MyTeam /> </EmployeeRoute></PrivateRoute> 
      },
      {
         path: "request-asset",
          element:<PrivateRoute><EmployeeRoute><RequestAsset /> </EmployeeRoute></PrivateRoute> 
      },

      { 
        path: "assets",
         element:<PrivateRoute><HrRoute><Assets /> </HrRoute></PrivateRoute> 
      },
      {
         path: "add-asset", 
         element:<PrivateRoute><HrRoute><AddAsset /> </HrRoute></PrivateRoute> 
      },
      {
         path: "employee-list", 
         element:<PrivateRoute><HrRoute><EmployeeList></EmployeeList></HrRoute></PrivateRoute> 
      },
      {
        path:'hr-dashboard',
        element:<PrivateRoute><HrRoute><HRDashboardPage></HRDashboardPage></HrRoute></PrivateRoute>
      },
     
{ 
  path: "requests",
   element:<PrivateRoute><HrRoute><HRRequests /></HrRoute></PrivateRoute>  },
      { 
        path: "upgrade-package",
         element: <PrivateRoute><HrRoute><UpgradePackage /></HrRoute></PrivateRoute>
       },

  
      { 
        path: "profile", 
        element:<PrivateRoute><Profile /></PrivateRoute> 
       }
    ]
  }
]);
