import type { ReactNode } from "react";
import { useAuth } from "../../hooks/use-auth";

const PermissionGuard = ({
  permission,
  children,
}: {
  permission: string;
  children: ReactNode;
}) => {
  const { user } = useAuth();
  if (!user?.permissions?.includes(permission)) {
    return null; // or show fallback
  }
  return <>{children}</>;
};

export default PermissionGuard;
