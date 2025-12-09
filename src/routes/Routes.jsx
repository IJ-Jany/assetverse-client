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
        path:'/assets',
       element: <AssetsList/>
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
    element: <PaySuccess /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [

      // Employee Routes
      { 
        path: "my-assets", 
        element: <MyAssets />
       },
      {
         path: "my-team",
         element: <MyTeam /> 
      },
      {
         path: "request-asset",
          element: <RequestAsset /> 
      },

      // HR Routes
      { 
        path: "assets",
         element: <Assets /> 
      },
      {
         path: "add-asset", 
         element: <AddAsset /> 
      },
      {
         path: "employee-list", 
         element: <EmployeeList />
      },
     
{ path: "requests", element: <HRRequests /> },
      { 
        path: "upgrade-package",
         element: <UpgradePackage />
       },

      // Profile
      { 
        path: "profile", 
        element: <Profile />
       }
    ]
  }
]);
