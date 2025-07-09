import { Navigate, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";

const ProtectedRoute = ({ children }) => {
  const { authUser, isLoading } = useAuthUser();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!authUser.isOnboarded) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;