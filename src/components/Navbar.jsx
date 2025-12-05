import { Link } from "react-router-dom";
import { useState } from "react";
import { FaHome, FaUserTie, FaUsers, FaSignInAlt } from "react-icons/fa";
import { MdWork, MdDashboardCustomize } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import Logo from "./Logo"
import Logoimg from '../assets/logo.png'
import { NavLink } from "react-router";

const Navbar = ({ user, role }) => {
  const [open, setOpen] = useState(false);

  return (
    // <div className="bg-white shadow sticky top-0 z-50">
    //   <div className="navbar max-w-7xl mx-auto px-4">

    //     {/* LEFT - LOGO */}
    //     <div className="flex-1">
    //       <Link
    //         to="/"
    //         className="text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-3 py-1 rounded-md"
    //       >
    //         AssetVerse
    //       </Link>
    //     </div>

    //     {/* MOBILE MENU BUTTON */}
    //     <div className="lg:hidden">
    //       <button className="btn btn-ghost" onClick={() => setOpen(!open)}>
    //         ☰
    //       </button>
    //     </div>

    //     {/* NAV LINKS */}
    //     <div
    //       className={`lg:flex items-center gap-6 absolute lg:static bg-white w-full left-0 px-6 py-4 lg:py-0 shadow lg:shadow-none transition-all ${
    //         open ? "top-16" : "-top-96"
    //       }`}
    //     >
    //       <Link
    //         className="flex items-center gap-2 font-medium hover:text-blue-600"
    //         to="/"
    //       >
    //         <FaHome /> Home
    //       </Link>

    //       <Link
    //         className="flex items-center gap-2 font-medium hover:text-blue-600"
    //         to="/join-employee"
    //       >
    //         <FaUsers /> Join Employee
    //       </Link>

    //       <Link
    //         className="flex items-center gap-2 font-medium hover:text-blue-600"
    //         to="/join-hr"
    //       >
    //         <FaUserTie /> Join HR Manager
    //       </Link>

    //       {/* AUTH SECTION */}
    //       {!user ? (
    //         <Link
    //           to="/login"
    //           className="btn btn-sm bg-blue-600 text-white flex items-center gap-1"
    //         >
    //           <FaSignInAlt /> Login
    //         </Link>
    //       ) : (
    //         <div className="dropdown dropdown-end">
    //           <div tabIndex={0} role="button" className="avatar">
    //             <div className="w-10 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2 cursor-pointer">
    //               <img src={user?.photoURL} alt="profile" />
    //             </div>
    //           </div>

    //           {/* DROPDOWN MENU */}
    //           <ul
    //             tabIndex={0}
    //             className="dropdown-content menu p-2 shadow bg-white rounded-md w-52"
    //           >
    //             {role === "employee" && (
    //               <>
    //                 <li>
    //                   <Link to="/my-assets">
    //                     <MdWork /> My Assets
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/my-team">
    //                     <FaUsers /> My Team
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/request-asset">
    //                     <MdDashboardCustomize /> Request Asset
    //                   </Link>
    //                 </li>
    //               </>
    //             )}

    //             {role === "hr" && (
    //               <>
    //                 <li>
    //                   <Link to="/assets">
    //                     <MdWork /> Asset List
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/add-asset">
    //                     <MdDashboardCustomize /> Add Asset
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/requests">
    //                     <FaUsers /> All Requests
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/employees">
    //                     <FaUsers /> Employee List
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/upgrade-package">
    //                     <GiTakeMyMoney /> Upgrade Package
    //                   </Link>
    //                 </li>
    //               </>
    //             )}

    //             <li>
    //               <Link to="/profile">
    //                 <FaUserTie /> Profile
    //               </Link>
    //             </li>

    //             <li>
    //               <button className="text-red-500">Logout</button>
    //             </li>
    //           </ul>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-8">
      
      {/* LEFT SIDE */}
      <div className="navbar-start">
        {/* MOBILE DROPDOWN */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink
                to="/"
                className="flex items-center gap-2 font-medium hover:text-blue-600"
              >
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/join-employee"
                className="flex items-center gap-2 font-medium hover:text-blue-600"
              >
                <FaUsers /> Join as Employee
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/join-hr"
                className="flex items-center gap-2 font-medium hover:text-blue-600"
              >
                <FaUserTie /> Join as HR Manager
              </NavLink>
            </li>
          </ul>
        </div>

        {/* LOGO */}
        <NavLink to="/" className=" normal-case text-xl">
          <Logo />
        </NavLink>
      </div>

      {/* CENTER MENU FOR DESKTOP */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <NavLink
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-all"
            >
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/join-employee"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-all"
            >
              <FaUsers /> Join as Employee
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/join-hr"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-all"
            >
              <FaUserTie /> Join as HR Manager
            </NavLink>
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end">
        <NavLink
          to="/login"
          className="
            btn 
            flex items-center gap-2
            bg-gradient-to-r from-blue-600 to-purple-600 
            text-white font-semibold 
            border-none
            shadow-md
            transition-all duration-300 
            hover:scale-105 
            hover:shadow-lg 
            hover:from-blue-700 hover:to-purple-700
            active:scale-95
          "
        >
          <FaSignInAlt className="text-lg" />
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
