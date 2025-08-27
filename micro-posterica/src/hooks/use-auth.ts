import type { AppState } from "../app/store";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const { accessToken, tokenType, user } = useSelector(
    (state: AppState) => state?.core?.auth
  );

  return {
    isAuthenticated: !!accessToken,
    accessToken,
    tokenType,
    user,
  };
};
