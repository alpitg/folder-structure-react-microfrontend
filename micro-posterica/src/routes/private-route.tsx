import { Navigate, Outlet } from "react-router";

import LoadingApp from "../components/loading/loading";
import { ROUTE_URL } from "./constants/routes.const";
import { useAuth } from "../hooks/use-auth";

interface PrivateRouteProps {
  requiredRole?: string;
  requiredPermission?: string;
}

const PrivateRoute = ({
  requiredRole,
  requiredPermission,
}: PrivateRouteProps) => {
  const { isAuthenticated, hydrated, hasRole, hasPermission } = useAuth();

  if (!hydrated) return <LoadingApp />;

  if (!isAuthenticated) return <Navigate to={ROUTE_URL.LOGIN} replace />;

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to={ROUTE_URL.FORBIDDEN} replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to={ROUTE_URL.FORBIDDEN} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
