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
        path: "sessions",
        Component: StudySessions,
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
    Component: DashboardLayout,
    children: [
      {
        path: "booked-sessions",
        element: <BookedSessions />,
      },
      {
        path: "create-note",
        element: <CreateNote />,
      },
      {
        path: "manage-notes",
        element: <ManageNotes />,
      },
      {
        path: "study-materials",
        element: <StudyMaterials />,
      },
      {
        path: "create-session",
        element: <CreateSession />,
      },
      {
        path: "all-sessions",
        element: <AllSessions />,
      },
      {
        path: "upload-materials",
        element: <UploadMaterials />,
      },
      {
        path: "all-materials",
        element: <AllMaterials />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "admin-sessions",
        element: <AdminSessions />,
      },
      {
        path: "admin-materials",
        element: <AdminMaterials />,
      },
    ],
  },
]);

export default router;
