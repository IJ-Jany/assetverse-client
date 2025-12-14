import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaSignOutAlt,
  FaUserAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdWork, MdAddBox, MdRequestQuote } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import useRole from "../hooks/useRole";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const { role, loading } = useRole(user?.email);
  const [open, setOpen] = useState(false);

  if (loading) return null;

  const menuItemClasses =
    "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100";

  return (
    <>
      {/* ===== MOBILE TOP BAR ===== */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-white px-4 py-3 shadow">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Dashboard
        </h2>
        <button aria-label="Open sidebar" onClick={() => setOpen(true)}>
          <FaBars className="text-2xl text-blue-600" />
        </button>
      </div>

      {/* ===== OVERLAY ===== */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow-lg
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        <div className="flex flex-col h-full justify-between p-6 overflow-y-auto">
          {/* ===== HEADER ===== */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Dashboard
              </h2>
              <button
                className="lg:hidden"
                aria-label="Close sidebar"
                onClick={() => setOpen(false)}
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* ===== MENU ===== */}
            <ul className="space-y-2">
              {role === "employee" && (
                <>
                  <NavLink
                    onClick={() => setOpen(false)}
                    to="/dashboard/my-assets"
                    className={({ isActive }) =>
                      menuItemClasses +
                      (isActive ? " bg-blue-100 text-blue-700" : "")
                    }
                  >
                    <MdWork /> My Assets
                  </NavLink>
                  <NavLink
                    onClick={() => setOpen(false)}
                    to="/dashboard/my-team"
                    className={({ isActive }) =>
                      menuItemClasses +
                      (isActive ? " bg-blue-100 text-blue-700" : "")
                    }
                  >
                    <FaUsers /> My Team
                  </NavLink>
                  <NavLink
                    onClick={() => setOpen(false)}
                    to="/dashboard/request-asset"
                    className={({ isActive }) =>
                      menuItemClasses +
                      (isActive ? " bg-blue-100 text-blue-700" : "")
                    }
                  >
                    <MdRequestQuote /> Request Asset
                  </NavLink>
                </>
              )}

              {role === "hr" && (
                <>
                  <NavLink
                    onClick={() => setOpen(false)}
                    to="/dashboard/assets"
                    className={({ isActive }) =>
                      menuItemClasses +
                      (isActive ? " bg-blue-100 text-blue-700" : "")
                    }
                  >
                    <MdWork /> Asset List
                  </NavLink>
                  <NavLink
                    onClick={() => setOpen(false)}
                    to="/dashboard/add-asset"
                    className={({ isActive }) =>
                      menuItemClasses +
                      (isActive ? " bg-blue-100 text-blue-700" : "")
                    }
                  >
                    <MdAddBox /> Add Asset
                  </NavLink>
                  <NavLink
                    onClick={() => setOpen(false)}
                    to="/dashboard/employee-list"
                    className={({ isActive }) =>
                      menuItemClasses +
                      (isActive ? " bg-blue-100 text-blue-700" : "")
                    }
                  >
                    <FaUsers /> Employee List
                  </NavLink>
                  <NavLink
                    onClick={() => setOpen(false)}
                    to="/dashboard/requests"
                    className={({ isActive }) =>
                      menuItemClasses +
                      (isActive ? " bg-blue-100 text-blue-700" : "")
                    }
                  >
                    <MdRequestQuote /> Asset Requests
                  </NavLink>
                  <NavLink
                    onClick={() => setOpen(false)}
                    to="/dashboard/upgrade-package"
                    className={({ isActive }) =>
                      menuItemClasses +
                      (isActive ? " bg-blue-100 text-blue-700" : "")
                    }
                  >
                    <GiTakeMyMoney /> Upgrade Package
                  </NavLink>
                </>
              )}
            </ul>
          </div>

          {/* ===== FOOTER ===== */}
          <div className="border-t pt-4 space-y-3">
            <NavLink
              onClick={() => setOpen(false)}
              to="/dashboard/profile"
              className={menuItemClasses}
            >
              {user?.photoURL ? (
                <img src={user.photoURL} className="w-6 h-6 rounded-full" />
              ) : (
                <FaUserAlt />
              )}
              Profile
            </NavLink>

            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
