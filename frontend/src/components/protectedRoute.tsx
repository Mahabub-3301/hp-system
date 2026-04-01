import { Navigate } from "react-router-dom";
import { getUserFromToken, isTokenValid } from "../utils/auth";

export default function ProtectedRoute({ children, role }: any) {
  const user = getUserFromToken();

  if (!user || !isTokenValid()) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}