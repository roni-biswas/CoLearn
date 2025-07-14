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

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "tutors",
        Component: Tutors,
      },
      {
        path: "study-sessions",
        Component: StudySessions,
      },
      {
        path: "session-details/:id",
        Component: SessionDetails,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact-us",
        Component: Contact,
      },
      {
        path: "forbidden",
        Component: Forbidden,
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
      },
      {
        path: "register",
        Component: Register,
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
      /* Student only */
      {
        path: "booked-sessions",
        element: (
          <StudentRoute>
            <BookedSessions />
          </StudentRoute>
        ),
      },
      {
        path: "create-note",
        element: (
          <StudentRoute>
            <CreateNote />
          </StudentRoute>
        ),
      },
      {
        path: "manage-notes",
        element: (
          <StudentRoute>
            <ManageNotes />
          </StudentRoute>
        ),
      },
      {
        path: "study-materials",
        element: (
          <StudentRoute>
            <StudyMaterials />
          </StudentRoute>
        ),
      },
      {
        path: "create-session",
        element: (
          <TutorRoute>
            <CreateSession />
          </TutorRoute>
        ),
      },
      {
        path: "all-sessions",
        element: (
          <TutorRoute>
            <AllSessions />
          </TutorRoute>
        ),
      },
      {
        path: "upload-materials",
        element: (
          <TutorRoute>
            <UploadMaterials />
          </TutorRoute>
        ),
      },
      {
        path: "all-materials",
        element: (
          <TutorRoute>
            <AllMaterials />
          </TutorRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin-sessions",
        element: (
          <AdminRoute>
            <AdminSessions />
          </AdminRoute>
        ),
      },
      {
        path: "admin-materials",
        element: (
          <AdminRoute>
            <AdminMaterials />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
