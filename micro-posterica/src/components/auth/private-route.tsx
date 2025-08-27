import { Navigate, Outlet } from "react-router";

import { useAuth } from "../../hooks/use-auth";

const PrivateRoute = ({ requiredRole }: { requiredRole?: string }) => {
  const { isAuthenticated, user, hydrated } = useAuth();

  // ⏳ wait until rehydration finishes
  if (!hydrated) {
    return <div>Loading...</div>; // or your LoadingApp
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !user?.roles?.includes(requiredRole)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
