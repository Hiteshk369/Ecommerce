import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

interface userType {
  user: string | null;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<userType> = ({ user, children }) => {
  if (!user) {
    toast.error("Login");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
