import { Navigate, Outlet } from "react-router-dom";

interface ProtectedProps {
  isAuthenticated: any;
}

const ProtectedRoute: React.FC<ProtectedProps> = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Navigate to={"/login"} />;
  return <Outlet />;
};

export default ProtectedRoute;
