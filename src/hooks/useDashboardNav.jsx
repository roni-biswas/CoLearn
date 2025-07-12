// hooks/useDashboardNav.js
import { useNavigate, useLocation } from "react-router";

const useDashboardNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1); // Go to previous page
  };

  const goHome = () => {
    navigate("/dashboard"); // Default dashboard route
  };

  const goTo = (path) => {
    navigate(path); // Custom path
  };

  const isCurrentRoute = (path) => {
    return location.pathname === path;
  };

  return {
    goBack,
    goHome,
    goTo,
    isCurrentRoute,
    currentPath: location.pathname,
  };
};

export default useDashboardNav;
