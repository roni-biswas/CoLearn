import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Auth/LoginForm/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import BookedSessions from "../pages/Dashboard/Student/BookedSessions/BookedSessions";
import CreateNote from "../pages/Dashboard/Student/CreateNote/CreateNote";
import ManageNotes from "../pages/Dashboard/Student/ManageNotes/ManageNotes";
import StudyMaterials from "../pages/Dashboard/Student/StudyMaterials/StudyMaterials";
import CreateSession from "../pages/Dashboard/Tutor/CreateSession/CreateSession";
import AllSessions from "../pages/Dashboard/Tutor/AllSessions/AllSessions";
import UploadMaterials from "../pages/Dashboard/Tutor/UploadMaterials/UploadMaterials";
import AllMaterials from "../pages/Dashboard/Tutor/AllMaterials/AllMaterials";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import AdminSessions from "../pages/Dashboard/Admin/AdminSessions/AdminSessions";
import AdminMaterials from "../pages/Dashboard/Admin/AdminMaterials/AdminMaterials";
import StudySessions from "../pages/StudySessions/StudySessions";
import SessionDetails from "../pages/StudySessions/SessionDetails";
import Tutors from "../pages/Tutors/Tutors";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import PrivateRoute from "./PrivateRoute";
import Forbidden from "../pages/Error/Forbidden";
import AdminRoute from "./AdminRoute";
import TutorRoute from "./TutorRoute";
import StudentRoute from "./StudentRoute";
import DynamicDashboard from "../pages/Dashboard/Shared/DynamicDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        handle: { title: "Home" },
      },
      {
        path: "tutors",
        Component: Tutors,
        handle: { title: "Tutors" },
      },
      {
        path: "study-sessions",
        Component: StudySessions,
        handle: { title: "Study Sessions" },
      },
      {
        path: "session-details/:id",
        Component: SessionDetails,
        handle: { title: "Session details page" },
      },
      {
        path: "about",
        Component: About,
        handle: { title: "About Us" },
      },
      {
        path: "contact-us",
        Component: Contact,
        handle: { title: "Contact Us" },
      },
      {
        path: "forbidden",
        Component: Forbidden,
        handle: { title: "Forbidden" },
      },
    ],
  },
  // auth related routes
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
        handle: { title: "Login your Account" },
      },
      {
        path: "register",
        Component: Register,
        handle: { title: "Register" },
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DynamicDashboard />
          </PrivateRoute>
        ),
        handle: { title: "Dashboard" },
      },
      /* Student only */
      {
        path: "booked-sessions",
        element: (
          <StudentRoute>
            <BookedSessions />
          </StudentRoute>
        ),
        handle: { title: "View Booked Sessions" },
      },
      {
        path: "create-note",
        element: (
          <StudentRoute>
            <CreateNote />
          </StudentRoute>
        ),
        handle: { title: "Create Note" },
      },
      {
        path: "manage-notes",
        element: (
          <StudentRoute>
            <ManageNotes />
          </StudentRoute>
        ),
        handle: { title: "Manage Personal Notes" },
      },
      {
        path: "study-materials",
        element: (
          <StudentRoute>
            <StudyMaterials />
          </StudentRoute>
        ),
        handle: { title: "View all Study Materials" },
      },
      {
        path: "create-session",
        element: (
          <TutorRoute>
            <CreateSession />
          </TutorRoute>
        ),
        handle: { title: "Create Study Session" },
      },
      {
        path: "all-sessions",
        element: (
          <TutorRoute>
            <AllSessions />
          </TutorRoute>
        ),
        handle: { title: "View all Study Sessions" },
      },
      {
        path: "upload-materials",
        element: (
          <TutorRoute>
            <UploadMaterials />
          </TutorRoute>
        ),
        handle: { title: "Upload materials" },
      },
      {
        path: "all-materials",
        element: (
          <TutorRoute>
            <AllMaterials />
          </TutorRoute>
        ),
        handle: { title: "View all Materials" },
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
        handle: { title: "All User Page" },
      },
      {
        path: "admin-sessions",
        element: (
          <AdminRoute>
            <AdminSessions />
          </AdminRoute>
        ),
        handle: { title: "Admin Study Sessions" },
      },
      {
        path: "admin-materials",
        element: (
          <AdminRoute>
            <AdminMaterials />
          </AdminRoute>
        ),
        handle: { title: "Admin Study Materials" },
      },
    ],
  },
]);

export default router;
