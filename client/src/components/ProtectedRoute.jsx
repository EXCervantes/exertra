// Use Protected Routes from React to keep app main elements from user unless they login
import { Navigate, useLocation } from "react-router-dom";
import Auth from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
