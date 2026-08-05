import { hasPermission, hasRole } from "../utils/permission.util";

import type { AppState } from "../app/store";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const { accessToken, tokenType, hydrated, user } = useSelector(
    (state: AppState) => state.core.auth
  );

  const isAuthenticated = !!accessToken;

  return {
    isAuthenticated,
    accessToken,
    tokenType,
    user,
    hydrated,
    hasRole(role: string) {
      return hasRole(user?.grantedRoles || [], role);
    },
    hasPermission(permission: string[]) {
      return hasPermission(user?.grantedRoles || [], permission);
    },
  };
};
