import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaUserTie,
  FaSignOutAlt,
  FaUserAlt,
  FaUserCog,
} from "react-icons/fa";
import { MdWork, MdAddBox, MdRequestQuote } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import useRole from "../hooks/useRole";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  // 🔥 FIXED: Proper destructuring
  const { role, loading } = useRole(user?.email);

  // 🔥 Prevent sidebar from flashing before role loads
  if (loading) return null;

  const menuItemClasses =
    "flex items-center gap-3 px-4 py-3 rounded-lg font-medium cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:text-blue-700";

  return (
    <div className="flex flex-col h-screen justify-between w-64 bg-white shadow-lg p-6">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Dashboard
        </h2>
        <ul className="space-y-2">
          {role === "employee" && (
            <>
              <li>
                <NavLink to="/dashboard/my-assets" className={menuItemClasses}>
                  <MdWork className="text-xl" /> My Assets
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-team" className={menuItemClasses}>
                  <FaUsers className="text-xl" /> My Team
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/request-asset"
                  className={menuItemClasses}
                >
                  <MdRequestQuote className="text-xl" /> Request Asset
                </NavLink>
              </li>
            </>
          )}

          {role === "hr" && (
            <>
              <li>
                <NavLink to="/dashboard/assets" className={menuItemClasses}>
                  <MdWork className="text-xl" /> Asset List
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-asset" className={menuItemClasses}>
                  <MdAddBox className="text-xl" /> Add Asset
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/employee-list"
                  className={menuItemClasses}
                >
                  <FaUsers className="text-xl" /> Employee List
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/requests" className={menuItemClasses}>
                  <MdRequestQuote className="text-xl" /> Asset Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/upgrade-package"
                  className={menuItemClasses}
                >
                  <GiTakeMyMoney className="text-xl" /> Upgrade Package
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col gap-3">
        <NavLink
          to="/dashboard/profile"
          className={menuItemClasses + " hover:text-purple-600"}
        >
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="profile"
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <FaUserAlt className="text-xl" />
          )}
          Profile
        </NavLink>

        <button
          onClick={logout}
          className="
            flex items-center gap-3 px-4 py-3 w-full rounded-lg
            bg-gradient-to-r from-blue-600 to-purple-600
            text-white font-medium shadow-md
            hover:from-blue-700 hover:to-purple-700
            transition-all duration-300
          "
        >
          <FaSignOutAlt className="text-xl" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
