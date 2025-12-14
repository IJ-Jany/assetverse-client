import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import HRDashboardCharts from "../pages/dashboard/hr/HRDashboardCharts";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const { role } = useRole(user?.email);

  return (
    <div className="flex pt-14 lg:pt-0">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6 lg:p-8 bg-gray-100 min-h-screen flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>

        {/* HR Charts */}
        {role === "hr" && user?.email && (
          <div className="mt-8">
            <HRDashboardCharts email={user.email} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
