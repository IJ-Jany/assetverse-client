import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
