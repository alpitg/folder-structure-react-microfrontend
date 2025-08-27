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
  if (!user?.permissions?.map((x) => x.name)?.includes(permission)) {
    return null; // or show fallback
  }
  return <>{children}</>;
};

export default PermissionGuard;

// // usage -
// <Route
//   path="/settings"
//   element={
//     <PermissionGuard permission="can_view_settings">
//       <SettingsApp />
//     </PermissionGuard>
//   }
// />
