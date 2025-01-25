import { Navigate, Outlet } from "react-router";
import { useLogin } from "../contexts/LoginContext";

const ProtectedRoute = () => {
  const { isLoginAutenticated } = useLogin();

  return isLoginAutenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
