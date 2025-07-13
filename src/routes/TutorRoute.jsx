import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/Loading";

const TutorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isRoleLoading } = useUserRole();
  const location = useLocation();

  if (loading || isRoleLoading) return <Loading />;

  if (user && role === "tutor") {
    return children;
  }

  return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default TutorRoute;
