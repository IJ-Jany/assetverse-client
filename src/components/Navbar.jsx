import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { FaHome, FaUsers, FaUserTie, FaSignInAlt, FaUserCircle } from "react-icons/fa";
import { MdWork, MdDashboardCustomize } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import Logo from "./Logo";
import useRole from "../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { role, loading } = useRole(user?.email); 

  const defaultAvatar = <FaUserCircle className="text-3xl text-gray-500" />;

  if (user && loading) return null;

  return (
    <div className="navbar bg-white shadow-sm px-4 lg:px-8 sticky top-0 z-50">

      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
            <li><NavLink to="/"><FaHome /> Home</NavLink></li>
            <li><NavLink to="/register-employee"><FaUsers /> Join Employee</NavLink></li>
            <li><NavLink to="/register-hr"><FaUserTie /> Join HR</NavLink></li>

            {user && (
              <li><NavLink to="/dashboard"><MdDashboardCustomize /> Dashboard</NavLink></li>
            )}
           <li><NavLink to="/assets"><MdWork /> Assets</NavLink></li>
          </ul>
        </div>

        <Link to="/" className="text-xl font-bold"><Logo /></Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">
          <li><NavLink to="/" className="px-3 py-2 hover:bg-blue-50"><FaHome /> Home</NavLink></li>
          <li><NavLink to="/register-employee" className="px-3 py-2 hover:bg-blue-50"><FaUsers /> Join Employee</NavLink></li>
          <li><NavLink to="/register-hr" className="px-3 py-2 hover:bg-blue-50"><FaUserTie /> Join HR</NavLink></li>

          {user && (
            <li><NavLink to="/dashboard" className="px-3 py-2 hover:bg-blue-50"><MdDashboardCustomize /> Dashboard</NavLink></li>
          )}

            <li><NavLink to="/assets" className="px-3 py-2 hover:bg-blue-50"><MdWork /> Assets</NavLink></li>
        </ul>
      </div>

      <div className="navbar-end">
        {!user && (
          <NavLink
            to="/login"
            className="btn bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none shadow-md hover:scale-105 transition-all"
          >
            <FaSignInAlt /> Login
          </NavLink>
        )}

        {user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="cursor-pointer">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
                {user.photoURL ? <img src={user.photoURL} alt="profile" /> : defaultAvatar}
              </div>
            </label>

            <ul tabIndex={0} className="dropdown-content menu p-3 shadow bg-white rounded-box w-56">
        
              {role === "employee" && (
                <>
                  <li><Link to="/my-assets"><MdWork /> My Assets</Link></li>
                  <li><Link to="/my-team"><FaUsers /> My Team</Link></li>
                  <li><Link to="/request-asset"><MdDashboardCustomize /> Request Asset</Link></li>
                </>
              )}

           
              {role === "hr" && (
                <>
                  <li><Link to="/assets"><MdWork /> Asset List</Link></li>
                  <li><Link to="/add-asset"><MdDashboardCustomize /> Add Asset</Link></li>
                  <li><Link to="/requests"><FaUsers /> All Requests</Link></li>
                  <li><Link to="/employees"><FaUsers /> Employee List</Link></li>
                  <li><Link to="/upgrade-package"><GiTakeMyMoney /> Upgrade Package</Link></li>
                </>
              )}

              <li><Link to="/profile"><FaUserTie /> Profile</Link></li>
              <li>
                <button
                  onClick={logOut}
                  className="btn mt-2 bg-gradient-to-r from-red-500 to-orange-500 text-white border-none shadow hover:scale-105"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
