import ErrorPage from "../ui/error/error-page";
import type { IUsersData } from "../../features/administration/interfaces/users.model";
import LoadingApp from "../loading/loading";
import type { ReactNode } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useGetAppInitialDataQuery } from "../../app/redux/administration/auth/auth.api";

type AppInitializerProps = {
  children: ReactNode;
};

export interface ILoginResponse {
  user: IUsersData;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const { isAuthenticated } = useAuth();

  const { isLoading, isError } = useGetAppInitialDataQuery(undefined, {
    skip: !isAuthenticated, // ✅ don’t call if no token
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
    pollingInterval: 0,
  });

  if (isLoading) return <LoadingApp />;

  if (isError) {
    // ✅ fallback UI if app-init fails
    return (
      <ErrorPage description=" We're sorry, the page you're looking for cannot be found." />
    );
  }

  return children;
};

export default AppInitializer;
