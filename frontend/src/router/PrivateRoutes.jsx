import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoutes = ({ roles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (roles && !roles.includes(user.rol)) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};
