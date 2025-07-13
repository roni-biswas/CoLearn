import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isRoleLoading } = useUserRole();
  const location = useLocation();

  if (loading || isRoleLoading) return <Loading />;

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/forbidden" state={{ from: location?.pathname }} />;
};

export default AdminRoute;
