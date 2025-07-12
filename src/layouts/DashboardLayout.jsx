import { Link, NavLink, Outlet } from "react-router";
import {
  FaRegCalendarAlt,
  FaEdit,
  FaClipboardCheck,
  FaFolder,
  FaPlusSquare,
  FaChalkboardTeacher,
  FaFileAlt,
  FaUserFriends,
  FaUserShield,
  FaLayerGroup,
} from "react-icons/fa";
import { FiMenu, FiShield } from "react-icons/fi";
import { useState } from "react";
import logo from "../assets/logo1.png";
import DashboardTopMenu from "../pages/Dashboard/Shared/DashboardTopMenu";

const activeClass = ({ isActive }) =>
  `flex items-center px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium shadow-sm ${
    isActive
      ? "bg-gray-200 dark:bg-gray-700 text-primary"
      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
  }`;

const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input
        id="dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={toggleDrawer}
      />
      <div className="drawer-content flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-b-gray-200 shadow-sm lg:hidden">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
          <button onClick={toggleDrawer} className="text-2xl">
            <FiMenu />
          </button>
        </div>
        <div className="p-4">
          <DashboardTopMenu />
          <Outlet />
        </div>
      </div>
      <div className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content space-y-2">
          <Link to="/" className="mb-6">
            <img src={logo} alt="Logo" className="h-12 mx-auto" />
          </Link>
          <li>
            <NavLink to="/dashboard/booked-sessions" className={activeClass}>
              <FaRegCalendarAlt className="mr-2" /> View Booked Session
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/create-note" className={activeClass}>
              <FaEdit className="mr-2" /> Create Note
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-notes" className={activeClass}>
              <FaClipboardCheck className="mr-2" /> Manage Personal Notes
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/study-materials" className={activeClass}>
              <FaFolder className="mr-2" /> View All Study Materials
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/create-session" className={activeClass}>
              <FaPlusSquare className="mr-2" /> Create Study Session
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-sessions" className={activeClass}>
              <FaChalkboardTeacher className="mr-2" /> View All Study Sessions
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/upload-materials" className={activeClass}>
              <FaFileAlt className="mr-2" /> Upload Materials
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-materials" className={activeClass}>
              <FaFolder className="mr-2" /> View All Materials
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-users" className={activeClass}>
              <FaUserFriends className="mr-2" /> View All Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin-sessions" className={activeClass}>
              <FaUserShield className="mr-2" /> Admin Study Sessions
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin-materials" className={activeClass}>
              <FaLayerGroup className="mr-2" /> Admin Study Materials
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/make-admin" className={activeClass}>
              <FiShield className="inline mr-2" /> Make Admin
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
