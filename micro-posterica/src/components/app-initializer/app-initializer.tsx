import ErrorPage from "../ui/error/error-page";
import type { IUserWithPermissions } from "../../features/administration/interfaces/users.model";
import LoadingApp from "../loading/loading";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useGetAppInitialDataQuery } from "../../app/redux/administration/auth/auth.api";
import { useDispatch } from "react-redux";
import { setAppInitialData } from "../../app/redux/administration/auth/auth.slice";

type AppInitializerProps = {
  children: ReactNode;
};

export interface IAppInitializer {
  user: IUserWithPermissions | null;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetAppInitialDataQuery(undefined, {
    skip: !isAuthenticated, // ✅ don’t call if no token
    refetchOnMountOrArgChange: true, // ✅ make api call on mount
    refetchOnReconnect: false,
    refetchOnFocus: false,
    pollingInterval: 0,
  });

  useEffect(() => {
    if (data) {
      dispatch(setAppInitialData(data));
    }
  }, [data, dispatch]);

  //#region render
  if (isLoading) return <LoadingApp />;

  if (isError) {
    // ✅ fallback UI if app-init fails
    return (
      <ErrorPage description=" We're sorry, the page you're looking for cannot be found." />
    );
  }

  return children;
  //#endregion
};

export default AppInitializer;
