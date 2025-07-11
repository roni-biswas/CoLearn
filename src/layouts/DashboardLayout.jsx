import { Link, Outlet } from "react-router";
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
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import logo from "../assets/logo1.png";

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
        <div className="flex items-center justify-between px-4 py-3 border-b shadow-sm lg:hidden">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
          <button onClick={toggleDrawer} className="text-2xl">
            <FiMenu />
          </button>
        </div>
        <div className="p-4">
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
            <Link to="/dashboard/booked-sessions">
              <FaRegCalendarAlt className="mr-2" /> View Booked Session
            </Link>
          </li>
          <li>
            <Link to="/dashboard/create-note">
              <FaEdit className="mr-2" /> Create Note
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-notes">
              <FaClipboardCheck className="mr-2" /> Manage Personal Notes
            </Link>
          </li>
          <li>
            <Link to="/dashboard/study-materials">
              <FaFolder className="mr-2" /> View All Study Materials
            </Link>
          </li>
          <li>
            <Link to="/dashboard/create-session">
              <FaPlusSquare className="mr-2" /> Create Study Session
            </Link>
          </li>
          <li>
            <Link to="/dashboard/all-sessions">
              <FaChalkboardTeacher className="mr-2" /> View All Study Sessions
            </Link>
          </li>
          <li>
            <Link to="/dashboard/upload-materials">
              <FaFileAlt className="mr-2" /> Upload Materials
            </Link>
          </li>
          <li>
            <Link to="/dashboard/all-materials">
              <FaFolder className="mr-2" /> View All Materials
            </Link>
          </li>
          <li>
            <Link to="/dashboard/all-users">
              <FaUserFriends className="mr-2" /> View All Users
            </Link>
          </li>
          <li>
            <Link to="/dashboard/admin-sessions">
              <FaUserShield className="mr-2" /> Admin Study Sessions
            </Link>
          </li>
          <li>
            <Link to="/dashboard/admin-materials">
              <FaLayerGroup className="mr-2" /> Admin Study Materials
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
