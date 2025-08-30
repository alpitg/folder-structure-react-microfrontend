// hooks/use-auth.ts
import type { AppState } from "../app/store";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const { accessToken, tokenType, user, hydrated } = useSelector(
    (state: AppState) => state.core.auth
  );

  const isAuthenticated = !!accessToken;

  const hasRole = (role: string) =>
    user?.roles?.some((r: any) => r.name === role) ?? false;

  const hasPermission = (permission: string) =>
    user?.roles?.some((r: any) => r.permissions?.includes(permission)) ?? false;

  return {
    isAuthenticated,
    accessToken,
    tokenType,
    user,
    /**
     * ➡️ Taking the persisted state (usually from localStorage, cookies, or server-rendered HTML) and rehydrating (restoring) it into your app’s in-memory state (Redux store)
     */
    hydrated,
    hasRole,
    hasPermission,
  };
};
