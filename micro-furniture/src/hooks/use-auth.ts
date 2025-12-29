import { hasPermission, hasRole } from "../utils/permission.util";

import type { AppState } from "../app/store";
import { useGetAppInitialDataQuery } from "../app/redux/administration/auth/auth.api";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const { accessToken, tokenType, hydrated } = useSelector(
    (state: AppState) => state.core.auth
  );

  const { data } = useGetAppInitialDataQuery();
  const user = data?.user || null;

  const isAuthenticated = !!accessToken;

  return {
    isAuthenticated,
    accessToken,
    tokenType,
    user,
    /**
     * ➡️ Taking the persisted state (usually from localStorage, cookies, or server-rendered HTML) and rehydrating (restoring) it into your app’s in-memory state (Redux store)
     */
    hydrated,
    hasRole(role: string) {
      return hasRole(user?.grantedRoles || [], role);
    },
    hasPermission(permission: string[]) {
      return hasPermission(user?.grantedRoles || [], permission);
    },
  };
};
